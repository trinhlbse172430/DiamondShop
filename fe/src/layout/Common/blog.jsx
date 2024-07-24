import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Breadcrumbs,
    Link,
    Typography,
    TableContainer,
} from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Margin } from "@mui/icons-material";
import './common.css';
import { Card } from 'antd';
import Grid from "@mui/material/Unstable_Grid2";

const { Meta } = Card;

function BlogItem({ }) {

    return (
        <Grid item="true" xs={4} sm={4} md={4} lg={4}>
            <Card
                hoverable
                style={{
                    width: 350,
                }}
                cover={<img alt="example" src="https://caohungdiamond.com/wp-content/uploads/2023/06/dat-nuoc-co-nhieu-kim-cuong-nhat-1-900x600.jpg" style={{ height: 230 }} />}
                bodyStyle={{ backgroundColor: '#2a2a2a' }}
            >
                <Meta
                    title={<span style={{ color: 'white' }}>5 quốc gia có nhiều kim cương nhất thế giới hiện nay</span>}
                    description={<span style={{ color: 'white' }}>Đất nước có nhiều kim cương nhất là nước nào? Quốc gia có trữ lượng</span>}
                />
            </Card>
        </Grid >
    );
}

export default function BlogPage() {

    return (
        <>
            <Header />
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
                            href="/blog"
                        >
                            Kiến thức kim cương
                        </Link>
                    </Breadcrumbs>
                </div>
                <Box className="main-content-cart">
                    <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center' }}>
                        Kiến thức kim cương
                    </Typography>
                    <Box className="" sx={{ marginX: '0px' }}>

                        <Typography variant="body1" gutterBottom className="content" style={{ textAlign: 'center' }}>
                            Tổng hợp những bài viết mới nhất về kim cương, hột xoàn | từ .... Diamond
                        </Typography>

                        <Box className="site-main">
                            <Grid container spacing={2}>
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                            </Grid>
                        </Box>



                    </Box>
                </Box>
            </Container >
            <Footer />
        </>
    );
}
