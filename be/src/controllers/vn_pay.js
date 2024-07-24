require("dotenv").config();
let crypto = require("crypto");
let querystring = require("qs");

const moment = require("moment");

const secretKey = process.env.VNPAY_HASH_SECRET;
const { Orders, OrderDetails, Warranties } = require("../../models");

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key));
		}
	}
	str.sort();
	for (key = 0; key < str.length; key++) {
		sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
	}
	return sorted;
}

module.exports = {
	async createPayment(req, res) {
		const params = req.body;
		try {
			process.env.TZ = "Asia/Ho_Chi_Minh";

			let date = new Date();
			let createDate = moment(date).format("YYYYMMDDHHmmss");
			let ipAddr =
				req.headers["x-forwarded-for"] ||
				req.connection.remoteAddress ||
				req.socket.remoteAddress ||
				req.connection.socket.remoteAddress;

			let tmnCode = process.env.VNPAY_TMNCODE;
			let secretKey = process.env.VNPAY_HASH_SECRET;
			let vnpUrl = process.env.VNPAY_URL;
			let returnUrl = process.env.VNPAY_RETURN_URL;
			let orderId = moment(date).format("DDHHmmss");
			let amount = parseFloat(params.TotalPrice);
			let bankCode = "";
			let locale = params.language;
			if (locale === null || locale === "") {
				locale = "vn";
			}

			let currCode = "VND";
			let vnp_Params = {};
			vnp_Params["vnp_Version"] = "2.1.0";
			vnp_Params["vnp_Command"] = "pay";
			vnp_Params["vnp_TmnCode"] = tmnCode;
			vnp_Params["vnp_Locale"] = "vn";
			vnp_Params["vnp_CurrCode"] = currCode;
			vnp_Params["vnp_TxnRef"] = orderId;
			vnp_Params["vnp_OrderInfo"] = JSON.stringify({
				orderId: params.OrderID,
				orderDetailId: params.OrderDetailID,
			});
			vnp_Params["vnp_OrderType"] = "other";
			vnp_Params["vnp_Amount"] = amount * 100;
			vnp_Params["vnp_ReturnUrl"] = returnUrl;
			vnp_Params["vnp_IpAddr"] = ipAddr;
			vnp_Params["vnp_CreateDate"] = createDate;

			if (bankCode !== null && bankCode !== "") {
				vnp_Params["vnp_BankCode"] = bankCode;
			}
			vnp_Params = sortObject(vnp_Params);

			let querystring = require("qs");
			let signData = querystring.stringify(vnp_Params, { encode: false });
			let crypto = require("crypto");
			let hmac = crypto.createHmac("sha512", secretKey);
			let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
			vnp_Params["vnp_SecureHash"] = signed;
			vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
			console.log(vnpUrl);
			res.json({ link_payment: vnpUrl });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	async returnPaymentResult(req, res) {
		try {

			let vnp_Params = req.query;

			let secureHash = vnp_Params["vnp_SecureHash"];

			delete vnp_Params["vnp_SecureHash"];
			delete vnp_Params["vnp_SecureHashType"];

			const data = JSON.parse(vnp_Params["vnp_OrderInfo"])
			vnp_Params = sortObject(vnp_Params);

			let signData = querystring.stringify(vnp_Params, { encode: false });
			let hmac = crypto.createHmac("sha512", secretKey);
			let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

			if (secureHash === signed) {
				if (vnp_Params["vnp_ResponseCode"] == "00") {
					return res.redirect(`${process.env.FE_ENDPOINT}/success`);
				} else {
					await Warranties.destroy({ where: { OrderID: data.orderId } });
					await OrderDetails.destroy({ where: { OrderID: data.orderId } });
					await Orders.destroy({ where: { OrderID: data.orderId } });
					return res.redirect(`${process.env.FE_ENDPOINT}/fail`);
				}
			} else {
				await Warranties.destroy({ where: { OrderID: data.orderId } });
				await OrderDetails.destroy({ where: { OrderID: data.orderId } });
				await Orders.destroy({ where: { OrderID: data.orderId } });
				return res.redirect(`${process.env.FE_ENDPOINT}/fail`);
			}
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},
};
