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
import { Link as RouterLink } from "react-router-dom";
import './css/product.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from 'antd';
import ProductItem from "./Components/ProductItem";


export default function ProductListNKC() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    //-----------------useEffect-----------------

    useEffect(() => {
        loadAllProduct();
    }, []);

    //-----------------handle--------------------
    const loadAllProduct = async () => {
        try {
            const loadData = await axios.get('/product');
            if (loadData.error) {
                console.log('erroe' + loadData.error);
            } else {
                //get data that have ProTypeID = BONGTAI
                loadData.data = loadData.data.filter(item => item.ProTypeID === "NHAN")
                setData(loadData.data);
            }
        } catch (error) {
            console.log(error);
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
                        Nhẫn kim cương
                    </Link>
                </Breadcrumbs>
                <Box className="main-content-cart" >

                    <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center' }}>
                        Nhẫn Kim Cương
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