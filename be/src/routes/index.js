const goldTypeRoutes = require("./gold_type");
const goldAgeRoutes = require("./gold_age");
const goldPriceRoutes = require("./gold_price");
const goldRoutes = require("./gold");
const diaPriceRoutes = require("./dia_price");
const diamondRoutes = require("./diamond");
const diaSmallPriceRoutes = require("./dia_small_price");
const diamondSmallRoutes = require("./diamond_small");
const proTypeRoutes = require("./protype");
const productRoutes = require("./product");
const customerRoutes = require("./customer");
const bonusPointRoutes = require("./bonus_point");
const promotionRoutes = require("./promotion");
const employeeRoutes = require("./employee");
const roleRoutes = require("./role");
const orderRoutes = require("./order");
const paymentRoutes = require("./payment");
const orderDetailRoutes = require("./order_detail");
const diaOriginRoutes = require("./dia_origin");
const diaColorRoutes = require("./dia_color");
const diaClaritiesRoutes = require("./dia_clarity");
const functionRoutes = require("./function")
const vnPayRoutes = require("./vn_pay");
const warrantie = require("./warrantie");

module.exports = [
	goldTypeRoutes,
	goldAgeRoutes,
	goldPriceRoutes,
	diamondSmallRoutes,
	goldRoutes,
	diamondRoutes,
	proTypeRoutes,
	diaPriceRoutes,
	diaSmallPriceRoutes,
	productRoutes,
	customerRoutes,
	bonusPointRoutes,
	promotionRoutes,
	employeeRoutes,
	roleRoutes,
	orderRoutes,
	paymentRoutes,
	orderDetailRoutes,
	diaColorRoutes,
	diaOriginRoutes,
	diaClaritiesRoutes,
	functionRoutes,
	vnPayRoutes,
	warrantie
];
