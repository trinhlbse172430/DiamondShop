import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
    Container,
    Typography,
    Link,
    Button,
    Box,
    Breadcrumbs,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import Grid from "@mui/material/Unstable_Grid2";
import './css/productDetail.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import ProductItem from "./Components/ProductItem";
import { Score } from "@mui/icons-material";

const { confirm } = Modal;

const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};


let theme = createTheme();
theme = responsiveFontSizes(theme);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-tabpanel-${index}`}
            aria-labelledby={`product-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [NiSize, setNiSize] = useState("");
    const [gold, setGold] = useState(null);
    const [diamond, setDiamond] = useState(null);
    const [diamondSmall, setDiamondSmall] = useState(null);
    const [goldType, setGoldType] = useState(null);
    const [proTypeName, setProTypeName] = useState(null);
    const [diamondInfo, setDiamondInfo] = useState(null);
    const [data, setData] = useState([]);


    //----------------------Handle Function----------------------
    const loadProductDetail = async () => {
        try {
            const response = await axios.get(`/product/${productId}`);
            if (response.error) {
                console.log("Error");
            } else {
                setProduct(response.data);
            }
        } catch {
            console.log("Error loadProductDetail");
        }
    }

    useEffect(() => {
        setNiSize("14.7mm")

    }, []);

    //load gold
    const loadGold = async () => {
        try {
            const goldList = await axios.get(
                `/gold_price`
            );
            if (goldList) {
                const gold = goldList.data.find((item) => item.GoldPriceID === product.GoldID);
                setGold(gold);
            }
        } catch (error) {
            console.error("Failed to fetch gold data: ", error);
        }
    };

    //load diamond
    const loadDiamond = async () => {
        try {
            const diamondList = await axios.get(
                `/dia_price`
            );
            if (diamondList) {
                //search diamond that has same diamondID with product
                const diamond = diamondList.data.find((item) => item.DiaPriceID === product.DiamondID);
                setDiamond(diamond);
            }
        } catch (error) {
            console.error("Failed to fetch diamond data: ", error);
        }
    };

    //load diamondSmall
    const loadDiamondSmall = async () => {
        try {
            const diamondSmallList = await axios.get(
                `/dia_small_price`
            );
            if (diamondSmallList) {
                //search diamondSmall that has same diamondSmallID with product
                const diamondSmall = diamondSmallList.data.find((item) => item.DiaSmallPriceID === product.DiamondSmallID);
                setDiamondSmall(diamondSmall);
            }
        } catch (error) {
            console.error("Failed to fetch diamondSmall data: ", error);
        }
    };

    const loadGoldType = async () => {
        try {
            const goldTypeList = await axios.get(
                `/gold_type`
            );
            if (goldTypeList) {
                //search goldType that has same goldTypeID with gold
                const goldType = goldTypeList.data.find((item) => item.GoldTypeID === gold.GoldTypeID);
                setGoldType(goldType);
            }
        } catch (error) {
            console.error("Failed to fetch goldType data: ", error);
        }
    };

    const loadProTypeName = async () => {
        try {
            const proTypeNameList = await axios.get(
                `/protype`
            );
            if (proTypeNameList) {
                //search proTypeName that has same proTypeID with product
                const proTypeName = proTypeNameList.data.find((item) => item.ProTypeID === product.ProTypeID);
                console.log(proTypeName);
                setProTypeName(proTypeName);
            }
        } catch (error) {
            console.error("Failed to fetch proTypeName data: ", error);
        }
    };

    const loadDiamondInfo = async () => {
        try {
            const diamondInfoList = await axios.get(
                `/diamond`
            );
            if (diamondInfoList) {
                //search diamondInfo that has same diamondID with product
                const diamondInfo = diamondInfoList.data.find((item) => item.DiamondID === product.DiamondID);
                setDiamondInfo(diamondInfo);
            }
        } catch (error) {
            console.error("Failed to fetch diamondInfo data: ", error);
        }
    };

    const loadDataProductRelated = async (product) => {
        console.log("sss" + product.ProTypeID);
        try {
            const response = await axios.get(`/product`);
            if (response.error) {
                console.log("Error");
            } else {
                if (product.ProTypeID === "NHAN") {
                    const data = response.data.filter((item) => item.ProTypeID === "NHAN");
                    setData(data);
                }
                if (product.ProTypeID === "VONGTAY") {
                    const data = response.data.filter((item) => item.ProTypeID === "VONGTAY");
                    setData(data);
                }
                if (product.ProTypeID === "CHUYEN") {
                    const data = response.data.filter((item) => item.ProTypeID === "CHUYEN");
                    setData(data);
                }
                if (product.ProTypeID === "VONHAN") {
                    const data = response.data.filter((item) => item.ProTypeID === "VONHAN");
                    setData(data);
                }
                if (product.ProTypeID === "VOCHUYEN") {
                    const data = response.data.filter((item) => item.ProTypeID === "VOCHUYEN");
                    setData(data);
                }
                if (product.ProTypeID === "BONGTAI") {
                    const data = response.data.filter((item) => item.ProTypeID === "BONGTAI");
                    setData(data);
                }
            }
        } catch {
            console.log("Error loadDataProductRelated");
        }
    }

    //handle total price
    useEffect(() => {
        if (product && gold && diamond && diamondSmall) {
            const goldPrice = gold.GoldPrice * gold.GoldWeight;
            const diamondPrice = diamond.DiaPrice * diamond.DiaWeight;
            const diamondSmallPrice = diamondSmall.DiaSmallPrice * diamondSmall.DiaSmallWeight;
            const total = (goldPrice + diamondPrice + diamondSmallPrice + parseFloat(product.WagePrice)) * product.Ration / 100;
            setTotalPrice(total);
        }
    }
        , [product, gold, diamond, diamondSmall]);


    //use effect
    useEffect(() => {
        loadProductDetail();
    }, [productId]);

    useEffect(() => {
        if (product) {
            loadGold();
            loadDiamond();
            loadDiamondSmall();
            loadProTypeName();
            loadDiamondInfo();
            loadDataProductRelated(product);
        }
    }, [product]);

    useEffect(() => {
        if (gold) {
            loadGoldType();
        }
    }, [gold]);

    useEffect(() => {
        console.log("data", data);
    }, [data]);



    //----------------------Hanlde quantity----------------------
    const handleQuantity = (type) => {
        if (type === "increase") {
            setQuantity(quantity + 1);
        } else {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        }
    }
    //handle total price



    //----------------------Handel add to cart----------------------
    const handleAddToCart = () => {
        if (localStorage.getItem('token') === null) {
            openNotificationWithIcon('error', 'Vui lòng đăng nhập để tiếp tục');
        } else if (localStorage.getItem('role') !== 'Customer') {
            openNotificationWithIcon('error', 'Bạn không có quyền thực hiện chức năng này');
        } else {
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            const productInCart = {
                ProductID: product.ProductID,
                WagePrice: product.WagePrice,
                GoldTypeID: gold.GoldTypeID,
                GoldPriceID: gold.GoldPriceID,
                DiaPriceID: diamond.DiaPriceID,
                DiaSmallPriceID: diamondSmall.DiaSmallPriceID,
                Quantity: quantity,
                TotalPrice: totalPrice,
                ProTypeID: product.ProTypeID,
                CusSize: NiSize,
                ProName: product.ProName,
                Ration: product.Ration,
                ProPicture: product.ProPicture,
            }
            //check if product in cart has same productID, goldTypeID, DiaPriceID, DiaSmallPriceID => increase quantity
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].ProductID === product.ProductID && cart[i].GoldTypeID === gold.GoldTypeID && cart[i].DiaPriceID === diamond.DiaPriceID && cart[i].DiaSmallPriceID === diamondSmall.DiaSmallPriceID && cart[i].CusSize === NiSize) {
                    cart[i].Quantity += quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    openNotificationWithIcon('success', 'Thêm vào giỏ hàng thành công');
                    return;
                }
            }
            cart.push(productInCart);
            localStorage.setItem('cart', JSON.stringify(cart));
            openNotificationWithIcon('success', 'Thêm vào giỏ hàng thành công');
        }

    }

    //-----------------ant notyfication--------------------
    //notify

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };

    const showConfirm = () => {
        confirm({
            title: 'Add this product to cart?',
            icon: <ExclamationCircleFilled />,
            content: '-------------------',
            onOk() {
                console.log('Yes');
                handleAddToCart();
            },
            onCancel() {
                console.log('No');
            },
        });
    };

    return (
        <div >
            <Header />
            {contextHolder}
            <Container className="container-product"
                sx={{ position: "relative", top: "20px", marginBottom: "150px" }}
            >
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<KeyboardDoubleArrowRightIcon fontSize="small" />}
                    sx={{ color: "#ffffff" }}
                >
                    <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="inherit"
                        href="/"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="inherit"
                        href="/product"
                    >
                        Sản phẩm
                    </Link>
                    <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        {product && product.ProductID}
                    </Typography>
                </Breadcrumbs>


                <Box className="">
                    <Typography theme={theme} variant="h3" className="product_title" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        {product ? product.ProName : "Product name"}
                    </Typography>
                    <Grid container>
                        <Grid item="true" xl={5} lg={5}>
                            <Box>
                                <img
                                    className="img_zoom"
                                    src={product && product.ProPicture}
                                    alt="img"
                                    style={{ width: "-webkit-fill-available" }}
                                />
                            </Box>
                        </Grid>
                        <Grid item="true" xl={7} lg={7} className="details-infor">
                            {/* <Typography variant="h1" className="product-title">
                                Price: {product && numberToVND(totalPrice)}
                            </Typography> */}
                            <div className="product-infor" style={{ paddingTop: '20px' }}>

                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <Typography variant="h1" className="product-title">
                                            Price:
                                        </Typography>
                                    </Grid>
                                    <Grid item="true" xs={3}>
                                        {goldType && (
                                            <p style={{ color: '#e8be6f', important: 'true' }}><strong>{product && numberToVND(totalPrice)}</strong></p>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p style={{ color: '#fff', important: 'true' }}><strong>Chất liệu:</strong></p>
                                    </Grid>
                                    <Grid item="true" xs={3}>
                                        {goldType && (
                                            <p style={{ color: '#fff', important: 'true' }}><strong>{goldType.GoldTypeName}</strong></p>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p style={{ color: '#fff', important: 'true' }}><strong>Viên chính:</strong></p>
                                    </Grid>
                                    <Grid item="true" xs={3}>
                                        <p style={{ color: '#fff', important: 'true' }}><strong>{diamond && diamond.DiaWeight} ly</strong></p>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p style={{ color: '#fff', important: 'true' }}><strong>Viên phụ:</strong></p>
                                    </Grid>
                                    <Grid item="true" xs={3}>
                                        <p style={{ color: '#fff', important: 'true' }}><strong>{diamondSmall && diamondSmall.DiaSmallWeight} ly</strong></p>
                                    </Grid>
                                </Grid>
                                <p style={{ color: '#fff', important: 'true' }}>
                                    <strong>Mã sản phẩm: {product && product.ProductID} </strong>
                                </p>


                                {product && product.ProTypeID === "NHAN" ? (
                                    <Grid container spacing={2}>
                                        <Grid item="true" xs={6}>
                                            <p style={{ color: '#fff', important: 'true' }}><strong>Chọn Ni:</strong></p>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <select value={NiSize} onChange={(e) => setNiSize(e.target.value)} >
                                                <option>14.7mm</option>
                                                <option>15.0mm</option>
                                                <option>15.5mm</option>
                                                <option>16.0mm</option>
                                                <option>16.5mm</option>
                                                <option>17.0mm</option>
                                                <option>17.5mm</option>
                                                <option>18.0mm</option>
                                                <option>18.5mm</option>
                                                <option>19.0mm</option>
                                                <option>19.5mm</option>
                                                <option>20.0mm</option>
                                            </select>
                                        </Grid>
                                    </Grid>
                                ) : null}

                                {product && product.ProTypeID === "VONGTAY" ? (
                                    <Grid container spacing={2}>
                                        <Grid item="true" xs={6}>
                                            <p><strong style={{ color: '#fff', important: 'true' }}>Chọn Ni:</strong></p>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <select value={NiSize} onChange={(e) => setNiSize(e.target.value)} >
                                                <option>36mm</option>
                                                <option>38mm</option>
                                                <option>40mm</option>
                                                <option>42mm</option>
                                                <option>52mm</option>
                                                <option>53mm</option>
                                                <option>54mm</option>
                                                <option>55mm</option>
                                                <option>56mm</option>
                                                <option>57mm</option>
                                                <option>58mm</option>
                                                <option>59mm</option>
                                            </select>
                                        </Grid>
                                    </Grid>
                                ) : null}


                                {product && product.ProTypeID === "NHAN" ? (
                                    <a href="/niSize" ><p>
                                        <strong>Hướng dẫn chọn Ni(size) </strong>
                                    </p></a>
                                ) : null}

                            </div>
                            <Box className="quantity-add-to-cart">
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p style={{ color: '#fff', important: 'true' }}>Chọn số lượng:</p>
                                    </Grid>
                                    <Grid item="true" xs={2}>
                                        <Button
                                            onClick={() => handleQuantity("decrease")}
                                        >-</Button>
                                    </Grid>
                                    <Grid item="true" xs={2}>
                                        <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                    </Grid>
                                    <Grid item="true" xs={2}>
                                        <Button
                                            onClick={() => handleQuantity("increase")}
                                        >+</Button>
                                    </Grid>
                                </Grid>

                                <Button
                                    className="single_add_to_cart_button"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart()}
                                >
                                    Thêm vào giỏ hàng
                                </Button>

                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box className="tab-details-product" sx={{ paddingTop: '100px' }}>
                    <Typography theme={theme} variant="h5" style={{ marginBottom: '20px', color: '#fff', textAlign: 'left' }}>
                        1. Thông tin chi tiết
                    </Typography>
                    <table style={{ width: '99.4944%', height: '428px' }} border="1">
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '233.762%', height: '50px' }} colspan="2">
                                    <p style={{ textAlign: 'center' }}><strong>Thông số thương hiệu sản phẩm</strong></p>
                                </td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Thương hiệu</td>
                                <td style={{ width: '188.829%', height: '21px' }}>Kim cương Diamond</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Loại sản phẩm</td>
                                <td style={{ width: '188.829%', height: '21px' }}>{proTypeName && proTypeName.ProTypeName}</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Mã sản phẩm</td>
                                <td style={{ width: '188.829%', height: '21px' }}>{product && product.ProductID}</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Độ tinh khiết</td>
                                <td style={{ width: '188.829%', height: '21px' }}>{diamondInfo && diamondInfo.DiaClarityID}</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Kiểu dáng</td>
                                <td style={{ width: '188.829%', height: '21px' }}>{diamondInfo && diamondInfo.DiaCut}</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Ni tay</td>
                                <td style={{ width: '188.829%', height: '21px' }}>Tùy chỉnh</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '233.762%', height: '21px' }} colspan="2">Thông số viên chủ sản phẩm</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Kích thước viên chủ</td>
                                <td style={{ width: '188.829%', height: '21px' }}>Tùy chọn 4ly5 – 8ly1</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Kiểu viên chủ</td>
                                <td style={{ width: '188.829%', height: '21px' }}>{diamondInfo && diamondInfo.DiaCut}</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Loại chấu</td>
                                <td style={{ width: '188.829%', height: '21px' }}>4 chấu</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '233.762%', height: '21px' }} colspan="2">Thông số đá tấm sản phẩm</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Loại đá tấm</td>
                                <td style={{ width: '188.829%', height: '21px' }}>Kim cương</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Số lượng đá tấm</td>
                                <td style={{ width: '188.829%', height: '21px' }}>Trung bình từ 50-150 viên</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Trọng lượng đá (ct)</td>
                                <td style={{ width: '188.829%', height: '21px' }}>0.5 – 2.0</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '233.762%', height: '21px' }} colspan="2">Thông số vàng sản phẩm</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Loại vàng</td>
                                <td style={{ width: '188.829%', height: '21px' }}>{goldType && goldType.GoldTypeName}</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Tuổi vàng</td>
                                <td style={{ width: '188.829%', height: '21px' }}>{gold && gold.GoldAgeID}</td>
                            </tr>
                            <tr style={{ height: '21px' }}>
                                <td style={{ width: '44.9333%', height: '21px', }}>Trọng lượng vàng</td>
                                <td style={{ width: '188.829%', height: '21px' }}>1.5 – 3 chỉ</td>
                            </tr>
                        </tbody>
                    </table>
                    <Typography theme={theme} variant="h5" style={{ marginBottom: '20px', color: '#fff', textAlign: 'left' }}>
                        2. Giấy xác nhận GIA
                    </Typography>
                    {/* image GIA */}
                    <img src={diamondInfo && diamondInfo.GIAPicture} alt="GIA" style={{ width: '60%', height: 'auto' }} />

                </Box>

                <Box className="tab-details-product" sx={{ paddingTop: '100px' }}>
                    <Typography theme={theme} variant="h5" style={{ marginBottom: '20px', color: '#fff', textAlign: 'left' }}>
                        SẢN PHẨM LIÊN QUAN
                    </Typography>
                    <Grid container spacing={2}>

                        {!data || data.length === 0 ? (
                            <Typography variant="h5" style={{ textAlign: 'center' }}></Typography>
                        ) : (
                            data.map((product) => (
                                <ProductItem key={product.ProductID} product={product} />
                            ))
                        )}
                    </Grid>
                </Box>

            </Container>

            <Footer />
        </div>
    );
}

export default ProductDetail;
