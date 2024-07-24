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
import './common.css';
import b1 from '../../image/bangGia/image.png';
import b2 from '../../image/bangGia/b2.png';
import b3 from '../../image/bangGia/b3.png';
import { Table, Tag } from 'antd';
import axios from "axios";
import './common.css';
import styled from 'styled-components';

const CustomTableContainer = styled.div`
    .ant-table-cell {
        background-color: black !important;
        color: aliceblue !important;
    }

    .ant-empty-description {
        color: aliceblue !important;
    }

    .ant-table-thead .ant-table-cell {
        background-color: #e9bc70 !important;
        color: aliceblue !important;
    }

    .ant-pagination-item{
        background-color: #fff !important;
        color: aliceblue !important;}

    .ant-pagination-item-active
    {
        background-color: #e9bc70 !important;
        color: aliceblue !important;
    }

    .ant-pagination-item-ellipsis{
     color: aliceblue !important;
    }
`;

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

export default function PricePage() {
    const [diamondData, setDiamondData] = useState([]);
    const [goldData, setGoldData] = useState([]);
    const [smallDiamondData, setSmallDiamondData] = useState([]);

    const handleLoadDiamondData = async () => {
        try {
            const response = await axios.get(`/dia_price`);
            setDiamondData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLoadGoldData = async () => {
        try {
            const response = await axios.get(`/gold_price`);
            setGoldData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLoadSmallDiamondData = async () => {
        try {
            const response = await axios.get(`/dia_small_price`);
            setSmallDiamondData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleLoadDiamondData();
        handleLoadGoldData();
        handleLoadSmallDiamondData();
    }, []);

    const columnsDiamond = [
        {
            title: 'Mã số',
            dataIndex: 'DiaPriceID',
            key: 'id',
        },
        {
            title: 'Nguồn gốc',
            dataIndex: 'DiaOriginID',
            key: 'type',
        },
        {
            title: 'Độ nặng',
            dataIndex: 'DiaWeight',
            key: 'color',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'DiaColorID',
            key: 'clean',
        },
        {
            title: 'Độ trong suốt',
            dataIndex: 'DiaClarityID',
            key: 'price',
        },
        {
            title: 'Giá',
            dataIndex: 'DiaPrice',
            key: 'price',
            render: (GoldPrice) => numberToVND(GoldPrice)
        },
    ];

    const columnsGold = [
        {
            title: 'Mã số',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Màu',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Trọng lượng',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
    ];

    const columnsSmallDiamond = [
        {
            title: 'Mã số',
            dataIndex: 'DiaSmallPriceID',
            key: 'id',
        },
        {
            title: 'Nguồn gốc',
            dataIndex: 'DiaSmallOriginID',
            key: 'type',
        },
        {
            title: 'Độ nặng',
            dataIndex: 'DiaSmallWeight',
            key: 'color',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'DiaSmallColorID',
            key: 'clean',
        },
        {
            title: 'Giá',
            dataIndex: 'DiaSmallPrice',
            key: 'price',
            render: (DiaSmallPrice) => numberToVND(DiaSmallPrice)
        },
    ];


    return (
        <>
            <Header />
            <Container
                sx={{ position: "relative", paddingTop: "20px", margin: "0px", backgroundColor: "#000000", maxWidth: "100% !important" }}
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
                            href="/price-list"
                        >
                            price list
                        </Link>
                    </Breadcrumbs>
                </div>
                <Box className="main-content-cart">
                    <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center' }}>
                        BẢNG GIA KIM CƯƠNG MỚI NHẤT HÔM NAY
                    </Typography>
                    <Box className="shoppingcart-content" sx={{ marginX: '0px' }}>
                        <TableContainer>
                            <Typography variant="body1" gutterBottom className="content">
                                Bảng giá hột xoàn tham khảo theo ly (mm), nước màu (color) & độ sạch. Nếu quý khách đang muốn mua trang sức nhẫn, dây chuyền, hoa tai… bằng kim cương nhưng chưa biết giá kim cương mua vào bán ra hiện nay như thế nào, hãy tham khảo nhanh báo giá mới nhất mới cập nhật ngay dưới đây.                            </Typography>

                            <Typography variant="body1" gutterBottom className="content">
                                Nguồn gốc: NAT - tự nhiên, PEO - nhân tạo
                            </Typography>
                            <Typography variant="body1" gutterBottom className="content">
                                Màu sắc: D - không màu (đẹp nhất), E, F - màu trắng (đẹp), J - gần như trong suốt
                            </Typography>
                            <Typography variant="body1" gutterBottom className="content">
                                Độ trong suốt: IF - hoàn hảo, VS1 - VS2 - it tạp chất, VVS1 - VVS2 - rất ít tạp chât
                            </Typography>

                            <Typography className="content" variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                                Giá kim cương <span style={{ color: '#d9be6f' }}></span>
                            </Typography>
                            <Typography className="content" variant="body2" gutterBottom sx={{ fontStyle: 'italic', marginLeft: '20px', marginRight: '20px', textAlign: 'center' }}>
                                (Đơn vị tiền tệ: VNĐ)
                            </Typography>
                            <CustomTableContainer style={{ paddingRight: '300px', paddingLeft: '300px' }}>
                                <Table
                                    columns={columnsDiamond}
                                    dataSource={diamondData}
                                    pagination={{ pageSize: 4 }}
                                />
                            </CustomTableContainer>
                            <br />

                            <Typography className="content" variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                                Giá kim cương nhỏ  <span style={{ color: '#d9be6f' }}></span>
                            </Typography>
                            <Typography className="content" variant="body2" gutterBottom sx={{ fontStyle: 'italic', marginLeft: '20px', marginRight: '20px', textAlign: 'center' }}>
                                (Đơn vị tiền tệ: VNĐ)
                            </Typography>

                            <CustomTableContainer style={{ paddingRight: '300px', paddingLeft: '300px' }}>
                                <Table
                                    columns={columnsSmallDiamond}
                                    dataSource={smallDiamondData}
                                    pagination={{ pageSize: 4 }}
                                />
                            </CustomTableContainer>
                            <br />

                            {/* <Typography className="content" variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                                Bảng Giá Vàng <span style={{ color: '#d9be6f' }}></span>
                            </Typography>

                            <CustomTableContainer style={{ paddingRight: '300px', paddingLeft: '300px' }}>
                                <Table
                                    columns={columnsSmallDiamond}
                                    dataSource={smallDiamondData}
                                    pagination={{ pageSize: 4 }}
                                />
                            </CustomTableContainer>
                            <br /> */}


                            <Typography className="content" variant="body1" gutterBottom>
                                Kim cương rời ❤️ hay hột xoàn thiên nhiên ❤️ có giấy kiểm định quốc tế hôm nay có giá giao động từ 5 triệu ✓ cho đến hàng trăm triệu, ✓ riêng những viên kim cương kích thước lớn đến siêu to có giá lên đến hàng tỷ đồng. Theo chia sẻ một số chuyên gia nghiên cứu thị trường nhận định: Chúng phụ thuộc chủ yếu dựa trên tiêu chuẩn 4C, và còn có một số tiêu chuẩn khác như độ cân xứng, độ phát quang, độ sạch, giấy chứng nhận…
                            </Typography>



                        </TableContainer>
                    </Box>
                </Box>
            </Container >
            <Footer />
        </>
    );
}
