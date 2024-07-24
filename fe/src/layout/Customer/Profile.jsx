import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { AccountInfo } from '../../components/Account/Account';
import { Table, Tag } from 'antd';
import { Input, Space } from 'antd';
import Highlighter from 'react-highlight-words'
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import DateTimeFormat from "../../components/Typography/DateTimeFormat";
import {
    Breadcrumbs,
    Link,
    Button,
    IconButton,
} from "@mui/material";
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import OrderDetailModal from '../../components/Modal/OrderDetailModal';

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

export default function Page() {
    const context = useAuth();

    const { auth } = context;

    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [sortedInfo, setSortedInfo] = useState({});
    const [data, setData] = useState([]);
    const [modalOrderDetailVisible, setModalOrderDetailVisible] = useState(false);
    const [orderDetailList, setOrderDetailList] = useState([]);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    // load order
    async function loadAllOrder(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/order`
            )
            // order that have CustomerId = auth.userId
            loadData.data.forEach((order) => {
                if (order.CustomerID === auth.id) {
                    row.push(order);
                }
            })
            setData(row);
        } catch (err) {
            console.log(err);
        }
    }

    //--------------------- HANDLE OPEN ORDER DETAIL MODAL ----------------------------=

    const handleOpenOrderDetailModal = async (orderDetailId) => {
        try {
            const data = await axios.get(`/order_detail/order/${orderDetailId}`);
            if (data.error) {
                console.log(data.error);
            } else {
                setOrderDetailList(data.data);
                console.log('orderdetail: ' + data.data);
            }
            handleOpenModalOrderDetail();
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleOpenModalOrderDetail = () => {
        setModalOrderDetailVisible(true);
    };

    const handleOrderDetailModal = (values) => {
        setModalOrderDetailVisible(false);
        loadAllOrder()
    }

    const handleCancelOrderDetailModal = () => {
        setModalOrderDetailVisible(false);
    }

    useEffect(() => {
        console.log('auth', auth.id);
        loadAllOrder();
    }, [auth]);

    const getColumnSearchProps = (dataIndex, field) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => {
            if (field == 'name') {
                return record.userId.fullname.toLowerCase().includes(value.toLowerCase());
            } else if (field == 'phone') {
                return record.userId.phone.toLowerCase().includes(value.toLowerCase());
            } else {
                if (record[dataIndex]) return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            }

        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [

        {
            title: 'Ngày đặt hàng',
            dataIndex: 'SaleDate',
            key: 'SaleDate',
            sorter: (a, b) => moment(a.SaleDate).unix() - moment(b.SaleDate).unix(),
            sortOrder: sortedInfo.columnKey === 'SaleDate' ? sortedInfo.order : null,
            render: (date) => new DateTimeFormat({ date: date }),
            width: '8%'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'CusAddress',
            key: 'CusAddress',
            ...getColumnSearchProps('CusAddress'),
            sorter: (a, b) => a.CusAddress.length - b.CusAddress.length,
            sortOrder: sortedInfo.columnKey === 'CusAddress' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'SDT',
            dataIndex: 'CusPhone',
            ...getColumnSearchProps('CusPhone'),
            key: 'CusPhone',
            sorter: (a, b) => a.CusPhone.length - b.CusPhone.length,
            sortOrder: sortedInfo.columnKey === 'CusPhone' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
            sorter: (a, b) => a.TotalPrice.length - b.TotalPrice.length,
            sortOrder: sortedInfo.columnKey === 'TotalPrice' ? sortedInfo.order : null,
            width: '8%',
            render: (TotalPrice) => numberToVND(TotalPrice)
        },
        {
            title: 'Điểm tích lũy',
            dataIndex: 'OrderPoint',
            key: 'OrderPoint',
            sorter: (a, b) => a.OrderPoint.length - b.OrderPoint.length,
            sortOrder: sortedInfo.columnKey === 'OrderPoint' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'Tiền ship',
            dataIndex: 'ShipPrice',
            key: 'ShipPrice',
            sorter: (a, b) => a.ShipPrice.length - b.ShipPrice.length,
            sortOrder: sortedInfo.columnKey === 'ShipPrice' ? sortedInfo.order : null,
            width: '8%',
            render: (ShipPrice) => numberToVND(ShipPrice)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'OrdStatus',
            width: '8%',
            render: (OrdStatus) => (
                <span>
                    {
                        OrdStatus === 5
                            ? <Tag color="green">Hoàn thành</Tag>
                            : OrdStatus === 2
                                ? <Tag color="cyan">Đã xác nhận</Tag>
                                : OrdStatus === 3
                                    ? <Tag color="orange">Đang giao</Tag>
                                    : OrdStatus === 4
                                        ? <Tag color="red">Hủy</Tag>
                                        : <Tag color="blue">Chờ xác nhận</Tag>
                    }
                </span>
            ),
            filters: [
                {
                    text: 'Waiting',
                    value: 6,
                },
                {
                    text: 'Confirm',
                    value: 2,
                },
                {
                    text: 'Shipping',
                    value: 3,
                },
                {
                    text: 'Cancelled',
                    value: 4,
                },
                {
                    text: 'Complete',
                    value: 5,
                },
            ],
            onFilter: (value, record) => record.OrdStatus === value,
        },
    ];

    return (
        <div>
            <Header />
            <Stack spacing={3}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
                            href="/Profile"
                        >
                            Profile
                        </Link>
                    </Breadcrumbs>
                </div>
                <Typography variant="h3" className="custom_blog_title" sx={{ textAlign: 'center', marginBottom: '0px !important', marginTop: '50px !important' }}>
                    Điểm tích lũy
                </Typography>
                <Grid container justifyContent="center" spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
                        <AccountInfo />
                    </Grid>
                </Grid>

                <Typography variant="h3" className="custom_blog_title" sx={{ textAlign: 'center', marginBottom: '0px !important', marginTop: '50px !important' }}>
                    Đơn đã đặt
                </Typography>
                <div className="table-container" style={{ marginRight: "100px", marginLeft: "100px" }}>
                    <Table columns={columns} dataSource={data}
                        onRow={(record) => {
                            return {
                                onClick: () => handleOpenOrderDetailModal(record.OrderID)
                            }

                        }}
                    />
                </div>
            </Stack>
            <Footer />

            <OrderDetailModal
                visible={modalOrderDetailVisible}
                onCreate={handleOrderDetailModal}
                onCancel={handleCancelOrderDetailModal}
                orderDetailList={orderDetailList}
                width={1000}
                footer={null}
            />
        </div>

    );
}