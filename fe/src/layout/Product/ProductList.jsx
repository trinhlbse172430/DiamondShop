import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
    Container,
    Link,
    Breadcrumbs,
    Box,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link as RouterLink, useParams, useLocation } from "react-router-dom";
import './css/product.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from 'antd';
import ProductItem from "./Components/ProductItem";

const numberToVND = (number) => {
    //convert string to number
    number = Number(number);

    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

// Example of correct usage in ProductItem component

// function ProductItem({ product }) {
//     const { ProductID } = product;


//     return (
//         <Grid item="true" xs={12} sm={6} md={4} lg={3}>
//             <Card className="product-card">
//                 <CardActionArea component={RouterLink} to={`/product/${ProductID}`}>
//                     <CardContent sx={{ textAlign: "center", padding: '0 0 0 0', backgroundColor: '#2a2a2a' }}>
//                         <CardMedia
//                             component="img"
//                             image={'https://caohungdiamond.com/wp-content/uploads/2023/11/vt0159-3-510x510.jpg'}
//                             //alt={}
//                             style={{ padding: '9px 9px' }}
//                         />
//                         <Typography gutterBottom variant="h6" component="div" className="product-title">
//                             {product.ProName ? product.ProName : "Product name"}
//                         </Typography>
//                         <Typography gutterBottom variant="body2" component="div" className="product-code">
//                             {product.ProductID ? product.ProductID : "Product code"}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" className="product-price">
//                             {product.WagePrice ? (
//                                 <Typography gutterBottom variant="h6" component="div" style={{ color: "#ebbc6c" }}>
//                                     Giá gia công: {numberToVND(product.WagePrice)}
//                                 </Typography>
//                             ) : (
//                                 "Price VND"
//                             )}
//                         </Typography>
//                     </CardContent>
//                 </CardActionArea>
//             </Card>
//         </Grid>
//     );
// }


export default function ProductList() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('search');

    //-----------------useEffect-----------------

    useEffect(() => {
        loadAllProduct();
    }, [searchValue]);

    //-----------------handle--------------------
    const loadAllProduct = async () => {
        console.log('search', searchValue);
        if (searchValue) {
            try {
                const loadData = await axios.get(`/product/search/${searchValue}`);
                if (loadData.error) {
                    console.log('erroe' + loadData.error);
                } else {
                    setData(loadData.data)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const loadData = await axios.get('/product');
                if (loadData.error) {
                    console.log('erroe' + loadData.error);
                } else {
                    setData(loadData.data)
                    console.log('data', loadData.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const displayProducts = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <Header />
            <Container className="container-product"
            >
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
                        href="/product"
                    >
                        Sản phẩm
                    </Link>
                </Breadcrumbs>
                <Box className="main-content-cart" >

                    <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center' }}>
                        Sản phẩm
                    </Typography>
                    <Box className="site-main">
                        <Grid container spacing={2}>
                            {!data || data.length === 0 ? (
                                <Typography variant="h5" style={{ textAlign: 'center' }}>Không có sản phẩm</Typography>
                            ) : (
                                displayProducts.map((product) => (
                                    <ProductItem key={product.ProductID} product={product} />
                                ))

                            )}
                        </Grid>
                    </Box>

                </Box>

                <Pagination
                    current={currentPage}
                    total={data.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    style={{ marginTop: '20px', textAlign: 'center' }}
                    className="custom-pagination"
                />
            </Container>
            <Footer />
        </>
    )
}