import * as React from "react";

import { useRef, useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words'
import moment from 'moment';
import CreateModal from "../../../components/Modal/OrderUpdateModal";
import DeliveryModal from "../../../components/Modal/DeliveryModal";
import { notification } from 'antd';
import './Delivery.css'


const numberToVND = (number) => {
    if (typeof number === 'string') {
        number = parseInt(number);
    }
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

const BasicTable = () => {
    const context = useAuth();
    const { auth } = context;

    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalOrderDetailVisible, setModalOrderDetailVisible] = useState(false);
    const [deliveryEmployeeList, setDeliveryEmployeeList] = useState([]);
    const [orderIDUpdate, setOrderIDUpdate] = useState("");
    const [orderDetailList, setOrderDetailList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [EmployeeID, setEmployeeID] = useState('');



    useEffect(() => {
        if (auth) {
            setEmployeeID(auth.empId);
        }
    }, [auth]);

    const handleOpenOrderDetailModal = async (orderDetailId) => {
        try {
            const response = await axios.get(`/order/${orderDetailId}`);
            const data = response.data;
            if (data.error) {
                openNotificationWithIcon('error', data.error);
            } else {
                setOrderDetailList(data);
                console.log('orderdetail: ' + data);
            }
            handleOpenModalOrderDetail();
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCreate = (values) => {
        console.log('Creating with:', values);
        setModalVisible(false);
        loadAllOrder();
    };

    const handleCancel = () => {
        setModalVisible(false);
        loadAllOrder();
    };

    const handleOpenModalOrderDetail = () => {
        setModalOrderDetailVisible(true);
    };

    const handleOrderDetailModal = (values) => {
        setModalOrderDetailVisible(false);
        loadAllOrder();
    }

    const handleCancelOrderDetailModal = () => {
        setModalOrderDetailVisible(false);
    }

    async function loadAllOrder(id) {
        try {
            const response = await axios.get(`/order`);
            //get data that has EmployeeID = id
            const data = response.data.filter((order) => order.EmployeeIDShip === id);
            setData(data);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (EmployeeID) {
            loadAllOrder(EmployeeID);
        }
    }, [EmployeeID]);

    useEffect(() => {
        if (roleList.length > 0) {
            loadAllDeliveryEmployee();
        }
    }, [roleList]);

    const loadAllDeliveryEmployee = async () => {
        try {
            const response = await axios.get(`/employee`);
            const data = response.data;
            if (data.error) {
                openNotificationWithIcon('error', data.error);
            } else {
                const listEmployeeID = roleList.filter((role) => role.RoleName === "Delivery").map((role) => role.EmployeeID);
                const deliveryEmployee = data.filter((employee) => listEmployeeID.includes(employee.EmployeeID));
                setDeliveryEmployeeList(deliveryEmployee);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };

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
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button type="link" size="small" onClick={close}>
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            if (field === 'name') {
                return record.userId.fullname.toLowerCase().includes(value.toLowerCase());
            } else if (field === 'phone') {
                return record.userId.phone.toLowerCase().includes(value.toLowerCase());
            } else {
                return record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
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
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleLoadPage = () => {
        //reload page
        window.location.reload();
    }

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'CusName',
            ...getColumnSearchProps('CusName'),
            key: 'CusName',
            sorter: (a, b) => a.CusName.length - b.CusName.length,
            sortOrder: sortedInfo.columnKey === 'CusName' ? sortedInfo.order : null,
            width: '8%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'CusAddress',
            key: 'CusAddress',
            ...getColumnSearchProps('CusAddress'),
            sorter: (a, b) => a.CusAddress.length - b.CusAddress.length,
            sortOrder: sortedInfo.columnKey === 'CusAddress' ? sortedInfo.order : null,
            width: '3%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'CusPhone',
            ...getColumnSearchProps('CusPhone'),
            key: 'CusPhone',
            sorter: (a, b) => a.CusPhone.length - b.CusPhone.length,
            sortOrder: sortedInfo.columnKey === 'CusPhone' ? sortedInfo.order : null,
            width: '3%'
        },
        // {
        //     title: 'TotalPrice',
        //     dataIndex: 'TotalPrice',
        //     key: 'TotalPrice',
        //     sorter: (a, b) => a.TotalPrice.length - b.TotalPrice.length,
        //     sortOrder: sortedInfo.columnKey === 'TotalPrice' ? sortedInfo.order : null,
        //     width: '8%',
        //     render: (TotalPrice) => numberToVND(TotalPrice)
        // },
        // {
        //     title: 'ShipPrice',
        //     dataIndex: 'ShipPrice',
        //     key: 'ShipPrice',
        //     sorter: (a, b) => a.ShipPrice.length - b.ShipPrice.length,
        //     sortOrder: sortedInfo.columnKey === 'ShipPrice' ? sortedInfo.order : null,
        //     width: '3%',
        //     render: (ShipPrice) => numberToVND(ShipPrice)
        // },
        // {
        //     title: 'OrdNote',
        //     dataIndex: 'OrdNote',
        //     key: 'OrdNote',
        //     sorter: (a, b) => a.OrdNote.length - b.OrdNote.length,
        //     sortOrder: sortedInfo.columnKey === 'OrdNote' ? sortedInfo.order : null,
        //     width: '8%'
        // },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'OrdStatus',
            width: '3%',
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
                                            ? <Tag color="purple">Shipper đã giao thành công</Tag>
                                        : <Tag color="blue">Chờ xác nhận</Tag>
                    }
                </span>
            ),
            filters: [
                { text: 'Chờ xác nhận', value: 6 },
                { text: 'Xác nhận', value: 2 },
                { text: 'Đang giao hàng', value: 3 },
                { text: 'Huỷ', value: 4 },
                { text: 'Hoàn thành', value: 5 },
                { text: 'Shipper đã giao hàng', value: 7 },
            ],
            onFilter: (value, record) => record.OrdStatus === value,
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <Button onClick={(e) => {
        //                 e.stopPropagation(); // Prevents event from bubbling to the row
        //                 handleLoadOrder(record.OrderID);
        //             }}>Chỉnh sửa</Button>
        //         </Space>
        //     ),
        //     width: '8%'
        // },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setSortedInfo(sorter);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', overflowX: 'auto' }}>
            {context.auth.role === 'staff' ? (
                <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
            ) : (
                <>
                    <Button type="primary" onClick={handleLoadPage} style={{ marginBottom: 16 }}>Load Order</Button>
                    {contextHolder}
                    <div className="table-container">
                        <Table
                            columns={columns}
                            dataSource={data}
                            onChange={onChange}
                            onRow={(record) => ({
                                onClick: () => handleOpenOrderDetailModal(record.OrderID)
                            })}
                            scroll={{
                                x: 200,
                            }}
                        />
                    </div>

                    <CreateModal
                        visible={modalVisible}
                        onCreate={handleCreate}
                        onCancel={handleCancel}
                        deliveryEmployeeList={deliveryEmployeeList}
                        orderIDUpdate={orderIDUpdate}
                    />

                    <DeliveryModal
                        visible={modalOrderDetailVisible}
                        onCreate={handleOrderDetailModal}
                        onCancel={handleCancelOrderDetailModal}
                        data={orderDetailList}
                        width={1000}
                    />
                </>
            )}
        </div>
    );
}

export default BasicTable;
