import * as React from "react";

import { useRef, useState, useEffect, useCallback } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words'
import moment from 'moment';
import './OrderManage.css';
import CreateModal from "../../../components/Modal/OrderUpdateModal";
import OrderDetailModal from "../../../components/Modal/OrderDetailModal";
import { notification } from 'antd';
import DateTimeFormat from "../../../components/Typography/DateTimeFormat";
import dayjs from "dayjs";


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

// -------------------------------STYLE MODAL----------------------
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const BasicTable = () => {
    const context = useAuth();

    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalOrderDetailVisible, setModalOrderDetailVisible] = useState(false);
    const [deliveryEmployeeList, setDeliveryEmployeeList] = useState([]);
    const [orderIDUpdate, setOrderIDUpdate] = useState("");
    const [orderDetailList, setOrderDetailList] = useState([]);
    const [roleList, setRoleList] = useState([]);


    // --------------------- HANDLE OPEN MODAL UPDATE -----------------------------
    const handleLoadOrder = async (id) => {
        try {
            setOrderIDUpdate(id);
            const data = await axios.get(`/order/${id}`);
            if (data.error) {
                openNotificationWithIcon('error', data.error);
            } else {
                console.log(data.data);
            }
        } catch (err) {
            console.log(err);
        }

        handleOpenModal();

    };

    //--------------------- HANDLE OPEN ORDER DETAIL MODAL ----------------------------=

    const handleOpenOrderDetailModal = async (orderDetailId) => {
        try {
            const data = await axios.get(`/order_detail/order/${orderDetailId}`);
            if (data.error) {
                openNotificationWithIcon('error', data.error);
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

    //--------------------- HANDLE OPEN MODAL ----------------------------=
    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCreate = (values) => {
        console.log('Creating with:', values);
        // Perform your create action here
        setModalVisible(false); // Close the modal after creating
        loadAllOrder();
    };

    const handleCancel = () => {
        setModalVisible(false);
        loadAllOrder();
    };

    // --------------------- HANDLE OPEN DEtail----------------------------
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

    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllOrder(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/order`
            )
                .then((data) => {
                    setData(data.data);
                    // console.log(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllRole = async () => {
        try {
            const data = await axios.get(`/role`);
            if (data.error) {
                console.log(data.error);
            } else {
                setRoleList(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadAllOrder();
        loadAllRole();
    }, []);

    useEffect(() => {
        loadAllDeliveryEmployee();
    }, [roleList]);

    // --------------------------API GET ALL DELEVERY EMPLOYEE--------------------------------------
    const loadAllDeliveryEmployee = async () => {
        //employee have EmpNote = "Nhân viên vận chuyển"
        try {
            const data = await axios.get(`/employee`);
            if (data.error) {
                openNotificationWithIcon('error', data.error);
            } else {
                //get list employee that have RoleName = "Delivery" in RoleList
                const listEmployeeID = roleList.filter((role) => role.RoleName === "Delivery").map((role) => role.EmployeeID);
                const deliveryEmployee = data.data.filter((employee) => listEmployeeID.includes(employee.EmployeeID));
                setDeliveryEmployeeList(deliveryEmployee);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //----------noti ------------------------
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };

    //cútom modal


    // --------------------- ANT TABLE -----------------------------
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [sortedInfo, setSortedInfo] = useState({});
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
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
            title: 'Họ tên',
            dataIndex: 'CusName',
            ...getColumnSearchProps('CusName'),
            key: 'CusName',
            sorter: (a, b) => a.CusName.localeCompare(b.CusName),
            sortOrder: sortedInfo.columnKey === 'CusName' ? sortedInfo.order : null,
            width: '7%'
        },
        {
            title: 'Ngày bán',
            dataIndex: 'SaleDate',
            key: 'SaleDate',
            sorter: (a, b) => moment(a.SaleDate).unix() - moment(b.SaleDate).unix(),
            sortOrder: sortedInfo.columnKey === 'SaleDate' ? sortedInfo.order : null,
            render: (date) => new DateTimeFormat({ date: date }),
            width: '7%'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'CusAddress',
            key: 'CusAddress',
            ...getColumnSearchProps('CusAddress'),
            sorter: (a, b) => a.CusAddress.length - b.CusAddress.length,
            sortOrder: sortedInfo.columnKey === 'CusAddress' ? sortedInfo.order : null,
            width: '7%'
        },
        {
            title: 'SDT',
            dataIndex: 'CusPhone',
            ...getColumnSearchProps('CusPhone'),
            key: 'CusPhone',
            sorter: (a, b) => a.CusPhone.length - b.CusPhone.length,
            sortOrder: sortedInfo.columnKey === 'CusPhone' ? sortedInfo.order : null,
            width: '7%'
        },

        {
            title: 'Tạm tính',
            dataIndex: 'TotalDetailPrice',
            key: 'TotalDetailPrice',
            sorter: (a, b) => a.TotalDetailPrice.length - b.TotalDetailPrice.length,
            sortOrder: sortedInfo.columnKey === 'TotalDetailPrice' ? sortedInfo.order : null,
            width: '7%',
            render: (TotalDetailPrice) => numberToVND(TotalDetailPrice)
        },
        {
            title: 'Giảm giá',
            dataIndex: 'DiscountPrice',
            key: 'DiscountPrice',
            sorter: (a, b) => a.DiscountPrice.length - b.DiscountPrice.length,
            sortOrder: sortedInfo.columnKey === 'DiscountPrice' ? sortedInfo.order : null,
            width: '7%',
            render: (DiscountPrice) => numberToVND(DiscountPrice)
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
            sorter: (a, b) => a.TotalPrice.length - b.TotalPrice.length,
            sortOrder: sortedInfo.columnKey === 'TotalPrice' ? sortedInfo.order : null,
            width: '7%',
            render: (TotalPrice) => numberToVND(TotalPrice)
        },
        {
            title: 'Điểm',
            dataIndex: 'OrderPoint',
            key: 'OrderPoint',
            width: '7%'
        },
        // {
        //     title: 'ShipPrice',
        //     dataIndex: 'ShipPrice',
        //     key: 'ShipPrice',
        //     sorter: (a, b) => a.ShipPrice.length - b.ShipPrice.length,
        //     sortOrder: sortedInfo.columnKey === 'ShipPrice' ? sortedInfo.order : null,
        //     width: '7%',
        //     render: (ShipPrice) => numberToVND(ShipPrice)
        // },
        {
            title: 'Nhân viên giao hàng',
            dataIndex: 'EmployeeIDShip',
            key: 'EmployeeIDShip',
            sorter: (a, b) => a.EmployeeIDShip.localeCompare(b.EmployeeIDShip),
            sortOrder: sortedInfo.columnKey === 'EmployeeIDShip' ? sortedInfo.order : null,
            width: '7%',
            render: (text, record) => {
                const employee = deliveryEmployeeList.find((employee) => employee.EmployeeID === record.EmployeeIDShip);
                if (employee) {
                    return employee.EmpName;
                }
                else {
                    return (
                        <Tag color="orange">Not Assigned</Tag>
                    );
                }
            }
        },
        {
            title: 'Ghi chú',
            dataIndex: 'OrdNote',
            key: 'OrdNote',
            width: '7%'
        },
        {
            title: 'Tình trạng',
            dataIndex: 'OrdStatus',
            width: '7%',
            render: (OrdStatus) => (
                <span>
                    {
                        OrdStatus === 5
                            ? <Tag color="green">Hoàn thành</Tag>
                            : OrdStatus === 2
                                ? <Tag color="cyan">Xác nhận</Tag>
                                : OrdStatus === 3
                                    ? <Tag color="orange">Đang vận chuyển</Tag>
                                    : OrdStatus === 4
                                        ? <Tag color="red">Huỷ</Tag>
                                        : OrdStatus === 7
                                            ? <Tag color="purple">Shipper đã giao hàng</Tag>
                                        : <Tag color="blue">Chờ xác nhận</Tag>
                    }
                </span>
            ),
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: 6,
                },
                {
                    text: 'Xác nhận',
                    value: 2,
                },
                {
                    text: 'Đang vận chuyển',
                    value: 3,
                },
                {
                    text: 'Huỷ',
                    value: 4,
                },
                {
                    text: 'Hoàn thành',
                    value: 5,
                },
                {
                    text: 'Shipper đã giao hàng',
                    value: 7,
                },
            ],
            onFilter: (value, record) => record.OrdStatus === value,
        },
        // {
        //     title: 'Tình trạng',
        //     dataIndex: 'OrdStatus',
        //     width: '7%',
        //     sorter: (a, b) => a.OrdStatus - b.OrdStatus,
        //     sortOrder: sortedInfo.columnKey === 'OrdStatus' ? sortedInfo.order : null,
        // },
        //button edit
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => {
                        e.stopPropagation(); // Prevents event from bubbling to the row
                        handleLoadOrder(record.OrderID);
                    }}>Chỉnh sửa</Button>
                </Space>
            ),
            width: '7%'
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setSortedInfo(sorter);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh', overflowX: 'auto' }}>
            {
                context.auth.role === 'staff'
                    ?
                    <>
                        <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
                    </>
                    :
                    <>
                        {contextHolder}
                        <div className="table-container">
                            <Table columns={columns} dataSource={data} onChange={onChange}
                                onRow={(record) => {
                                    return {
                                        onClick: () => handleOpenOrderDetailModal(record.OrderID)
                                    }

                                }}
                                pagination={{ pageSize: 10 }}
                            />
                        </div>

                        <CreateModal
                            visible={modalVisible}
                            onCreate={handleCreate}
                            onCancel={handleCancel}
                            deliveryEmployeeList={deliveryEmployeeList}
                            orderIDUpdate={orderIDUpdate}
                        />

                        <OrderDetailModal
                            visible={modalOrderDetailVisible}
                            onCreate={handleOrderDetailModal}
                            onCancel={handleCancelOrderDetailModal}
                            orderDetailList={orderDetailList}
                            width={1000}
                            footer={null}
                        />

                    </>
            }
        </div>
    );

}

export default BasicTable;
