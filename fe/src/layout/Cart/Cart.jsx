import React, { useEffect, useState } from "react";
import "./Cart.css";
import {
    Box,
    Container,
    Breadcrumbs,
    Link,
    Typography,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Button,
    IconButton,
    Tab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button as AntButton } from 'antd';
import axios from "axios";
import dayjs from "dayjs";
import { InputNumber } from 'antd';

const numberToVND = (number) => {
    //check if number is string
    if (typeof number === 'string') {
        number = parseInt(number);
    }
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

export default function Cart() {
    const [total, setTotal] = useState(0);
    const [cartList, setCartList] = useState([]);
    const [promp, setPromp] = useState(0);
    const [promotion, setPromotion] = useState([]);

    const navigate = useNavigate();

    //notify
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };

    //---------------------- useEffect ----------------------
    useEffect(() => {
        loadCart();
        loadPromotion();
    }, []);

    useEffect(() => {
        totalCart();
    }, [cartList, promp]);


    //---------------------- LOAD DATA ----------------------
    // load cart from local storage
    const loadCart = async () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) {
            cart = [];
        }
        setCartList(cart);
        console.log(cart);
    };

    const loadPromotion = async () => {
        try {
            const response = await axios.get('/promotion');
            if (response.status === 200) {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (dayjs().isBetween(dayjs(data[i].PromStartDate), dayjs(data[i].PromEndDate)) && data[i].PromPercent > promp) {
                        {
                            setPromp(data[i].PromPercent);
                            setPromotion(data[i]);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const totalCart = () => {
        let total = 0;
        cartList.map((product) => {
            // total += product.TotalPrice * product.Quantity * product.Ration / 100;
            total += product.TotalPrice * product.Quantity
        });
        //check promotion
        if (promp !== 0) {
            total = total - (total * promp / 100);
        }
        setTotal(total);
    };


    //---------------------- HAnDLE FUNCTION ----------------------
    const handleIncreaseQuantity = (product) => {
        const newCart = cartList.map((item) => {
            if (item.ProductID === product.ProductID && item.GoldTypeID === product.GoldTypeID && item.DiaPriceID === product.DiaPriceID && item.DiaSmallPriceID === product.DiaSmallPriceID) {
                if (item.Quantity === 20) {
                    // openNotificationWithIcon('error', 'Số lượng sản phẩm đã đạt giới hạn tối đa');
                    return item;
                }

                return { ...item, Quantity: item.Quantity + 1 };
            }
            return item;
        }
        );
        setCartList(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        loadCart();
    }

    const handleDecreaseQuantity = (product) => {
        const newCart = cartList.map((item) => {
            if (item.ProductID === product.ProductID && item.GoldTypeID === product.GoldTypeID && item.DiaPriceID === product.DiaPriceID && item.DiaSmallPriceID === product.DiaSmallPriceID && item.Quantity > 1) {
                return { ...item, Quantity: item.Quantity - 1 };
            }
            return item;
        });
        setCartList(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        loadCart();
    }

    const handleCheckOut = () => {
        if (localStorage.getItem('token') === null) {
            openNotificationWithIcon('error', 'Vui lòng đăng nhập để tiếp tục');
        } else if (localStorage.getItem('role') !== 'Customer') {
            openNotificationWithIcon('error', 'Bạn không có quyền thực hiện chức năng này');
        }
        else {
            navigate("/check-out");
        }
    }

    const handleDeleteOrder = (id) => {
        const newCart = cartList.filter((item) => item.ProductID !== id);
        setCartList(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        loadCart();
    }

    const handleChangeQuantity = (value, product) => {
        const newCart = cartList.map((item) => {
            if (item.ProductID === product.ProductID && item.GoldTypeID === product.GoldTypeID && item.DiaPriceID === product.DiaPriceID && item.DiaSmallPriceID === product.DiaSmallPriceID) {
                return { ...item, Quantity: value };
            }
            return item;
        })
        setCartList(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        loadCart();
    };



    return (
        <>
            <Header />
            {contextHolder}
            <Container
                sx={{ position: "relative", top: "20px", marginBottom: "150px" }}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Breadcrumbs
                        aria-label="breadcrumb" sx={{ color: "#ffffff" }}
                    >
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
                            href="/cart"
                        >
                            Giỏ hàng
                        </Link>
                    </Breadcrumbs>
                </div>
                <Box className="main-content-cart">
                    <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center' }}>
                        Giỏ hàng
                    </Typography>
                    <Box className="shoppingcart-content">
                        <TableContainer>
                            <Table className="shop_table">
                                <TableBody sx={{ border: "1px solid #f1f1f1" }}>
                                    <TableRow className="head-table">
                                        <TableCell className="product-name" colSpan={2} style={{ textAlign: 'center' }}>Sản phẩm</TableCell>
                                        <TableCell className="product-price">Giá</TableCell>
                                        <TableCell className="product-quantity">Số lượng</TableCell>
                                        {/* <TableCell className="product-quantity">Tỉ lệ áp giá</TableCell> */}
                                        <TableCell className="product-subtotal">Tạm tính</TableCell>
                                        <TableCell className="product-remove"></TableCell>
                                    </TableRow>
                                    {cartList.map((product, index) => (
                                        <TableRow key={index} className="cart_item">
                                            {/* <TableRow className="cart_item"> */}
                                            <TableCell className="product-thumbnail" sx={{ paddingLeft: '16px !important' }}>
                                                <img
                                                    src={product.ProPicture}
                                                    // alt={product.productId.productName}
                                                    className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"
                                                />
                                            </TableCell>
                                            <TableCell className="product-name" data-title="Product">
                                                <Typography variant="body1">
                                                    {product.ProName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                className="product-subtotal"
                                                data-title="Subtotal"
                                            >
                                                <span className="woocommerce-Price-currencySymbol">
                                                    {numberToVND(product.TotalPrice)}
                                                </span>
                                            </TableCell>
                                            <TableCell
                                                className="product-quantity"
                                                data-title="Quantity"
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{ width: "120px", display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <IconButton
                                                                aria-label="decrease quantity"
                                                                onClick={() => handleDecreaseQuantity(product)}
                                                                style={{ backgroundColor: "#ffffff", width: '26px', height: '24px', padding: '0', fontSize: '12px' }}
                                                            >
                                                                <RemoveIcon />
                                                            </IconButton>
                                                            {/* <input
                                                                type="number"
                                                                min="1"
                                                                max="20"
                                                                value={product.Quantity}
                                                                title="Qty"
                                                                className="input-quantity"
                                                                size="4"
                                                                style={{ height: '30px', marginLeft: '5px', marginRight: '5px' }}
                                                            // onChange={(e) => handleChangeQuantity(e, product)}
                                                            /> */}
                                                            <InputNumber min={1} max={20} value={product.Quantity} onChange={(value) => handleChangeQuantity(value, product)} />
                                                            <IconButton
                                                                aria-label="increase quantity"
                                                                onClick={() => handleIncreaseQuantity(product)}
                                                                style={{ backgroundColor: "#ffffff", width: '26px', height: '24px', padding: '0', fontSize: '12px' }}
                                                            >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </div>

                                                    </Box>
                                                </div>
                                            </TableCell>
                                            {/* <TableCell className="product-subtotal"
                                                data-title="Subtotal">
                                                <Typography variant="body1">
                                                    {product.Ration}
                                                </Typography>
                                            </TableCell> */}
                                            <TableCell
                                                className="product-subtotal"
                                                data-title="Subtotal"
                                            >
                                                <span className="woocommerce-Price-currencySymbol">
                                                    {/* {numberToVND(product.TotalPrice * product.Quantity * product.Ration / 100)} */}
                                                    {numberToVND(product.TotalPrice * product.Quantity)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="product-remove">
                                                <DeleteIcon
                                                    sx={{ color: '#ffffff' }}
                                                    fontSize="large"
                                                    onClick={(e) =>
                                                        handleDeleteOrder(product.ProductID)
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell className="actions" colSpan={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Box
                                                    className="coupon"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                </Box>

                                                <Box
                                                    className="order-total"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    <Typography variant="h3" style={{ color: '#ffffff' }}>Tổng:</Typography>
                                                    {promp !== 0 ? (
                                                        <Typography variant="h3" className="total-price" style={{ textDecoration: 'line-through', color: '#ffffff' }}>
                                                            {numberToVND(total * 100 / (100 - promp))}
                                                        </Typography>
                                                    ) : null}
                                                    <Typography variant="h3" style={{ color: '#ffa733' }}>{numberToVND(total)}</Typography>

                                                </Box>

                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Box
                                                    className="coupon"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                </Box>

                                                <Box
                                                    className="order-total"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >

                                                    <Typography variant="h3" style={{ color: '#ffa733' }}>{promotion.PromotionName} : -{promotion.PromPercent} % </Typography>

                                                </Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box className="control-cart">
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
                                <>
                                    <Button
                                        variant="outlined"
                                        className="button btn-continue-shopping"
                                        sx={{ marginRight: "20px" }}
                                        href="/"
                                        color="inherit"
                                    >
                                        Tiếp tục mua sắm
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className="button btn-cart-to-checkout"
                                        onClick={() => handleCheckOut()}
                                        sx={{ backgroundColor: "#ffa733", color: "#ffffff" }}
                                    >
                                        Thanh toán
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    );
}
