import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
    Breadcrumbs,
    Link,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import "../../components/Header/styles.css";
import axios from "axios";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Co2Sharp } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

export default function Checkout() {
    const context = useAuth();
    const navigate = useNavigate();

    const { auth } = context;

    const [total, setTotal] = useState(0);
    const [totalDetail, setTotalDetail] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [cartList, setCartList] = useState([]);
    const [promp, setPromp] = useState(0);
    const [order, setOrder] = useState({
        CusName: auth.fullname,
        CusPhone: auth.phone,
        CusAddress: "",
        SaleDate: new Date(),
        Currency: "VND",
        ShipPrice: "50000.00",
        EmployeeIDShip: "EMP001",
        OrdStatus: 6,
    });

    const [BonusPointList, setBonusPointList] = useState([]);
    const [BonusPointId, setBonusPointId] = useState("");
    const [OrderPoint, setOrderPoint] = useState(0);
    const [OrderId, setOrderId] = useState("");
    const [promotionId, setPromotionId] = useState("");

    //ant noti
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: "Notification Title",
            description: des,
        });
    };

    //---------------------- useEffect ----------------------
    useEffect(() => {
        loadCart();
        loadPromotion();
        loadBonusPoint();
        loadOrderId();
    }, []);

    useEffect(() => {
        totalCart();
    }, [cartList, promp]);

    useEffect(() => {
        loadBonusPointId();
    }, [totalDetail, BonusPointList]);

    // useEffect(() => {
    //     console.log(order);
    // }, [order]);

    //---------------------- LOAD DATA ----------------------
    // load cart from local storage
    const loadCart = async () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) {
            cart = [];
        }
        setCartList(cart);
    };

    const loadPromotion = async () => {
        try {
            const response = await axios.get("/promotion");
            if (response.status === 200) {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (
                        dayjs().isBetween(
                            dayjs(data[i].PromStartDate),
                            dayjs(data[i].PromEndDate)
                        ) &&
                        data[i].PromPercent > promp
                    ) {
                        {
                            setPromp(data[i].PromPercent);
                            setPromotionId(data[i].PromotionID);
                            console.log(data[i].PromPercent);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(promotionId);
        console.log(BonusPointId);
    }, [promotionId, BonusPointId]);


    const totalCart = () => {
        let total = 0;
        let totalDetail = 0;
        cartList.forEach((product) => {
            // total += product.TotalPrice * product.Quantity * product.Ration / 100 * (100 - promp) / 100;
            total += product.TotalPrice * product.Quantity * (100 - promp) / 100;
        });
        setTotalDetail(total);
        totalDetail = total;

        // Check promotion
        let discountPricePara = 0;
        if (promp) {
            discountPricePara = (total * promp) / 100;
            // total -= discountPricePara;
        }
        // Update states
        setDiscountPrice(discountPricePara);
        setTotal(total + 50000);
    };

    const loadOrderId = async () => {
        // get last order id
        try {
            const response = await axios.get("/order");
            if (response.status === 200) {
                //check if the first order
                if (response.data.length === 0) {
                    setOrderId("ORD001");
                    return;
                }
                const data = response.data;
                let orderId = data[data.length - 1].OrderID;
                orderId = orderId.slice(3);
                orderId = parseInt(orderId) + 1;
                if (orderId < 10) orderId = "ORD" + "00" + orderId;
                else if (orderId < 100) orderId = "ORD" + "0" + orderId;
                else orderId = "ORD" + "00" + orderId;
                setOrderId(orderId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loadBonusPoint = async () => {
        try {
            const response = await axios.get("/bonus_point");
            if (response.status === 200) {
                const data = response.data;
                setBonusPointList(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loadBonusPointId = async () => {
        let maxPrice = 0;
        BonusPointList.map((bonusPoint) => {
            if (parseFloat(bonusPoint.MaxPrice) > maxPrice) {
                maxPrice = parseFloat(bonusPoint.MaxPrice);
            }
        });
        if (totalDetail > maxPrice) {
            setOrderPoint(30);
            setBonusPointId(4);
            setOrder({ ...order, OrderPoint: 30 });
            return;
        }

        //check totalDetail in range of bonuspoint.MinPrice and bonuspoint.MaxPrice
        let bonusPoint = BonusPointList.find((bonusPoint) => {
            const minPrice = parseFloat(bonusPoint.MinPrice);
            const maxPrice = parseFloat(bonusPoint.MaxPrice);
            return totalDetail >= minPrice && totalDetail <= maxPrice;
        });
        if (bonusPoint !== undefined) {
            setBonusPointId(bonusPoint.BonusPointID);
            setOrderPoint(bonusPoint.Point);
            setOrder({ ...order, OrderPoint: bonusPoint.Point });
        } else {
            setBonusPointId("");
            setOrderPoint(0);
            setOrder({ ...order, OrderPoint: 0 });
        }
    };

    //----------------------HANDLE FUNCTION----------------------\
    const handleCheckout = async () => {
        const orderID = "ORD" + Date.now().toString(36).slice(-4);
        const orderDetailID = "OD" + Date.now().toString(36).slice(-4);
        if (
            order.CusName === "" ||
            order.CusPhone === "" ||
            order.CusAddress === ""
        ) {
            openNotificationWithIcon("error", "Vui lòng nhập đầy đủ thông tin");
            return;
        }
        try {
            const response = await axios.post("/order", {
                ...order,
                CustomerID: context.auth.id,
                OrderID: orderID,
                TotalPrice: total.toString(),
                TotalDetailPrice: totalDetail.toString(),
                DiscountPrice: discountPrice.toString(),
                BonusPointID: BonusPointId,
                PromotionID: promotionId,
            });
            if (response.status === 201) {
                const data = response.data;
                // Create order detail
                let orderDetailIdNumber = 1;
                for (const product of cartList) {
                    try {
                        const OrderDetailIDString = orderDetailID + orderDetailIdNumber++;
                        const orderDetailResponse = await axios.post("/order_detail", {
                            OrderDetailID: OrderDetailIDString,
                            OrderID: orderID,
                            ProductID: product.ProductID,
                            Quantity: product.Quantity,
                            GoldPriceID: product.GoldPriceID,
                            DiaPriceID: product.DiaPriceID,
                            DiaSmallPriceID: product.DiaSmallPriceID,
                            SalePrice: product.TotalPrice,
                            Currency: "VND",
                            CusSize: product.CusSize,
                        });

                        if (orderDetailResponse.status === 201) {
                            // Create warranty
                            await axios.post("/warrantie", {
                                WarrantieID: "WARR" + Date.now().toString(36).slice(-4),
                                OrderDetailID: OrderDetailIDString,
                                OrderID: orderID,
                                BeginWarrDate: dayjs().format("YYYY-MM-DD"),
                                EndWarrDate: dayjs().add(1, "year").format("YYYY-MM-DD"),
                                WarrNote: "Bảo hành 1 năm",
                            });
                        }
                    } catch (error) {
                        console.error("Error creating order detail or warranty:", error);
                    }
                }

                const urlPayment = await axios.post("/create-payment", {
                    OrderID: orderID,
                    TotalPrice: total,
                });

                if (urlPayment.status === 200 && urlPayment.data) {
                    window.location.href = urlPayment.data?.link_payment;
                    console.log(urlPayment.data?.link_payment);
                }
                


                localStorage.removeItem("cart");
                handleAddPoint();

            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleAddPoint = async () => {
        //get customer point
        try {
            const response = await axios.get(`/customer/${auth.id}`);
            if (response.status === 200) {
                const data = response.data;
                const cusPoint = data.CusPoint;
                const newCusPoint = cusPoint + OrderPoint;
                //update customer point
                try {
                    await axios.put(`/customer/${auth.id}`, {
                        CusPoint: newCusPoint,
                    });
                    openNotificationWithIcon("success", "Đặt hàng thành công");
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Header />
            {contextHolder}
            <div
                style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
            >
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#ffffff" }}>
                    <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="#ffffff"
                        href="/"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="#ffffff"
                        href="/check-out"
                    >
                        Thanh toán
                    </Link>
                </Breadcrumbs>
            </div>
            <Typography
                variant="h3"
                className="custom_blog_title"
                style={{ textAlign: "center", marginTop: "20px" }}
            >
                Thanh toán
            </Typography>
            <main id="main" className="dark dark-page-wrapper">
                <div id="content" className="content-area page-wrapper" role="main">
                    <div className="row row-main">
                        <div className="col-inner">
                            <div className="woocommerce">
                                <div className="woocommerce-notices-wrapper"></div>
                                <div className="woocommerce-notices-wrapper"></div>
                                <form
                                    name="checkout"
                                    method="post"
                                    className="checkout woocommerce-checkout "
                                >
                                    <div className="row pt-0 ">
                                        <div className="large-7 col  ">
                                            <div id="customer_details">
                                                <div className="clear">
                                                    <div className="woocommerce-billing-fields">
                                                        <h3>Thông tin thanh toán</h3>
                                                        <div className="woocommerce-billing-fields__field-wrapper">
                                                            <p
                                                                className="form-row form-row-first thwcfd-field-wrapper thwcfd-field-text validate-required"
                                                                id="billing_first_name_field"
                                                                data-priority="10"
                                                            >
                                                                <label
                                                                    htmlFor="billing_first_name"
                                                                    className=""
                                                                >
                                                                    Tên Quý Khách
                                                                </label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input
                                                                        type="text"
                                                                        className="input-text"
                                                                        name="billing_first_name"
                                                                        id="billing_first_name"
                                                                        placeholder="Nhập họ và tên"
                                                                        value={auth.fullname}
                                                                        autoComplete="given-name"
                                                                        onChange={(e) => {
                                                                            setOrder({
                                                                                ...order,
                                                                                CusName: e.target.value,
                                                                            });
                                                                        }}
                                                                    />
                                                                </span>
                                                            </p>
                                                            <p
                                                                className="form-row form-row-last thwcfd-field-wrapper thwcfd-field-tel validate-required validate-phone"
                                                                id="billing_phone_field"
                                                                data-priority="20"
                                                            >
                                                                <label htmlFor="billing_phone" className="">
                                                                    Số điện thoại
                                                                </label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input
                                                                        type="tel"
                                                                        name="billing_phone"
                                                                        id="billing_phone"
                                                                        placeholder="Nhập điện thoại"
                                                                        autoComplete="tel"
                                                                        value={auth.phone}
                                                                        onChange={(e) =>
                                                                            setOrder({
                                                                                ...order,
                                                                                CusPhone: e.target.value,
                                                                            })
                                                                        }
                                                                    />
                                                                </span>
                                                            </p>
                                                            <p
                                                                className="form-row form-row-wide address-field thwcfd-field-wrapper thwcfd-field-text"
                                                                id="billing_address_1_field"
                                                                data-priority="30"
                                                            >
                                                                <label htmlFor="billing_address_1" className="">
                                                                    Địa chỉ
                                                                </label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input
                                                                        type="text"
                                                                        className="input-text "
                                                                        name="billing_address_1"
                                                                        id="billing_address_1"
                                                                        placeholder="Nhập địa chỉ"
                                                                        autoComplete="address-line1"
                                                                        onChange={(e) =>
                                                                            setOrder({
                                                                                ...order,
                                                                                CusAddress: e.target.value,
                                                                            })
                                                                        }
                                                                    />
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="clear">
                                                    <div className="woocommerce-shipping-fields"></div>
                                                    <div className="woocommerce-additional-fields">
                                                        <h3>Thông tin bổ sung</h3>
                                                        <div className="woocommerce-additional-fields__field-wrapper">
                                                            <p
                                                                className="form-row notes thwcfd-field-wrapper thwcfd-field-textarea"
                                                                id="order_comments_field"
                                                                data-priority=""
                                                            >
                                                                <label htmlFor="order_comments" className="">
                                                                    Ghi chú đơn hàng
                                                                    <span className="optional">(tuỳ chọn)</span>
                                                                </label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <textarea
                                                                        onChange={(e) =>
                                                                            setOrder({
                                                                                ...order,
                                                                                OrdNote: e.target.value,
                                                                            })
                                                                        }
                                                                        name="order_comments"
                                                                        className="input-text "
                                                                        id="order_comments"
                                                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                                                        rows="2"
                                                                        cols="5"
                                                                    ></textarea>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="large-5 col">
                                            <div className="col-inner has-border">
                                                <div className="checkout-sidebar sm-touch-scroll">
                                                    <h3 id="order_review_heading">Đơn hàng của bạn</h3>
                                                    <div
                                                        id="order_review"
                                                        className="woocommerce-checkout-review-order"
                                                    >
                                                        <table className="shop_table woocommerce-checkout-review-order-table">
                                                            <thead>
                                                                <tr>
                                                                    <th className="product-name">product</th>
                                                                    <th className="product-total">Tạm tính</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {cartList.map((product, index) => (
                                                                    <tr key={index} className="cart_item">
                                                                        <td className="product-name">
                                                                            {product.ProName}
                                                                            <strong className="product-quantity">
                                                                                ×{product.Quantity}
                                                                            </strong>
                                                                        </td>
                                                                        <td className="product-total">
                                                                            <span className="woocommerce-Price-amount amount">
                                                                                {numberToVND(
                                                                                    // product.TotalPrice * product.Quantity * product.Ration / 100
                                                                                    product.TotalPrice * product.Quantity
                                                                                )}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr className="cart-subtotal" style={{ color: '#ffa733' }}>
                                                                    <th>Giảm giá: </th>
                                                                    <td>
                                                                        <span className="woocommerce-Price-amount amount" style={{ color: '#ffa733' }}>
                                                                            {promp ? promp + "%" : "không có"}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr className="cart-subtotal">
                                                                    <th>Tạm tính</th>
                                                                    <td>
                                                                        <span className="woocommerce-Price-amount amount">
                                                                            {numberToVND(totalDetail)}
                                                                        </span>
                                                                    </td>
                                                                </tr>

                                                                <tr className="cart-subtotal">
                                                                    <th>Giá ship</th>
                                                                    <td>
                                                                        <strong>
                                                                            <span className="woocommerce-Price-amount amount">
                                                                                {numberToVND(50000)}
                                                                            </span>
                                                                        </strong>
                                                                    </td>
                                                                </tr>

                                                                <tr className="cart-subtotal">
                                                                    <th>Tổng</th>
                                                                    <td>
                                                                        <strong>
                                                                            <span className="woocommerce-Price-amount amount">
                                                                                {numberToVND(total)}
                                                                            </span>
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>

                                                        <div
                                                            id="payment"
                                                            className="woocommerce-checkout-payment"
                                                        >
                                                            <ul className="wc_payment_methods payment_methods methods">
                                                                <li className="wc_payment_method payment_method_bacs">
                                                                    <input
                                                                        id="payment_method_bacs"
                                                                        type="radio"
                                                                        className="input-radio"
                                                                        name="payment_method"
                                                                        value="bacs"
                                                                        checked="checked"
                                                                        data-order_button_text=""
                                                                        onChange={(e) => { }}
                                                                    />

                                                                    <label htmlFor="payment_method_bacs">
                                                                        Chuyển khoản ngân hàng{" "}
                                                                    </label>
                                                                    <div className="payment_box payment_method_bacs">
                                                                        <p>
                                                                            Thực hiện thanh toán vào ngay tài khoản
                                                                            ngân hàng của chúng tôi. Vui lòng sử dụng
                                                                            Mã đơn hàng của bạn trong phần Nội dung
                                                                            thanh toán. Đơn hàng sẽ đươc giao sau khi
                                                                            tiền đã chuyển.
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                                {/* <li className="wc_payment_method payment_method_cod">
                                                                    <input
                                                                        id="payment_method_cod"
                                                                        type="radio"
                                                                        className="input-radio"
                                                                        name="payment_method"
                                                                        value="cod"
                                                                        data-order_button_text=""
                                                                    />

                                                                    <label htmlFor="payment_method_cod">
                                                                        Trả tiền mặt khi nhận hàng{" "}
                                                                    </label>
                                                                    <div
                                                                        className="payment_box payment_method_cod"
                                                                        style={{ display: "none" }}
                                                                    >
                                                                        <p>Trả tiền mặt khi giao hàng</p>
                                                                    </div>
                                                                </li> */}
                                                                {cartList.length === 0 ? (
                                                                    <Button
                                                                        variant="outlined"
                                                                        className="button btn-continue-shopping"
                                                                        sx={{
                                                                            marginRight: "20px",
                                                                            backgroundColor: "#ffa733",
                                                                            color: "#ffffff",
                                                                        }}
                                                                    >
                                                                        Không có sản phẩm trong giỏ hàng
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        variant="outlined"
                                                                        className="button btn-cart-to-checkout"
                                                                        onClick={handleCheckout}
                                                                        sx={{
                                                                            backgroundColor: "#ffa733",
                                                                            color: "#ffffff",
                                                                            width: "100%",
                                                                            marginTop: "20px",
                                                                        }}
                                                                    >
                                                                        Thanh toán
                                                                    </Button>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}