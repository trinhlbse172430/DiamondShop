import * as React from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonCustomize from "../../../components/Button/Button";
import { useRef, useState, useEffect, useCallback } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words'
import ProductCreateMOdal from "../../../components/Modal/ProductCreateModal";
import ProductUpdateModal from "../../../components/Modal/ProductUpdateModal";
import '../Order/OrderManage.css'

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
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [updateData, setUpdateData] = useState({});


    // ----------------------------------- API GET ALL PRODUCT --------------------------------
    async function loadAllProduct(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/product`
            )
                .then((data) => {
                    setData(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllProduct();
    }, []);

    //--------------------- HANDLE GET PRODUCT BY ID ----------------------------
    const handleGetProductById = async (id) => {
        try {
            const res = await axios.get(`/product/${id}`);
            setUpdateData(res.data);
        } catch (error) {
            console.log(error);
        }
        handleOpenModal();
    };

    //--------------------- HANDLE OPEN MODAL ----------------------------=
    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCreate = (values) => {
        setModalVisible(false);
        loadAllProduct()
    };

    const handleCancel = () => {
        setModalVisible(false);
        loadAllProduct()
    };


    // --------------------- HANDLE OPEN CREATE PRODUCT----------------------------
    const handleOpenCreateModal = () => {
        setModalCreateVisible(true);
    };

    const handleCreateModal = (values) => {
        setModalCreateVisible(false);
        loadAllProduct()
    }

    const handleCancelCreateModal = () => {
        setModalCreateVisible(false);
    }

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
            title: 'Mã sản phẩm',
            dataIndex: 'ProductID',
            ...getColumnSearchProps('ProductID'),
            key: 'ProductID',
            sorter: (a, b) => a.ProductID.length - b.ProductID.length,
            sortOrder: sortedInfo.columnKey === 'ProductID' ? sortedInfo.order : null,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'ProName',
            ...getColumnSearchProps('ProName'),
            key: 'ProName',
            sorter: (a, b) => a.ProName.length - b.ProName.length,
            sortOrder: sortedInfo.columnKey === 'ProName' ? sortedInfo.order : null,
        },
        {
            title: 'Mã loại sản phẩm',
            dataIndex: 'ProTypeID',
            filters: [
                {
                    text: 'Nhẫn',
                    value: 'NHAN',
                },
                {
                    text: 'Dây chuyền',
                    value: 'CHUYEN',
                },
                {
                    text: 'Vòng tay',
                    value: 'VONGTAY',
                },
                {
                    text: 'Bông tai',
                    value: 'BONGTAI',
                },
            ],
            onFilter: (value, record) => record.ProTypeID.indexOf(value) === 0,
        },
        {
            title: 'Mã vàng',
            dataIndex: 'GoldID',
            ...getColumnSearchProps('GoldID'),
        },
        {
            title: 'Mã kim cương',
            dataIndex: 'DiamondID',

        },
        {
            title: 'Mã kim cương tấm',
            dataIndex: 'DiamondSmallID',
        },
        {
            title: 'Số lượng viên nhỏ',
            dataIndex: 'DiaSmallQuantity',
        },
        {
            title: 'Giá gia công',
            dataIndex: 'WagePrice',
        },
        {
            title: 'Mệnh giá',
            dataIndex: 'Currency',
        },
        {
            title: 'Tỉ lệ áp giá',
            dataIndex: 'Ration',
        },
        //button edit
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <Button onClick={(e) => handleGetProductById(record.ProductID)} >EDIT</Button>
        //         </Space>
        //     ),
        // },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        setSortedInfo(sorter);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            {
                context.auth.role === 'staff'
                    ?
                    <>
                        <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
                    </>
                    :
                    <>
                        <ButtonCustomize
                            onClick={handleOpenCreateModal}
                            variant="contained"
                            nameButton="Tạo mới sản phẩm"
                            width="15%"
                            startIcon={<AddCircleOutlineIcon />}
                        />


                        <div className="table-container">
                            <Table columns={columns} dataSource={data} onChange={onChange}
                                onRow={(record) => {
                                    return {
                                        onClick: (e) => handleGetProductById(record.ProductID)
                                    }

                                }}
                            />
                        </div>



                        <ProductCreateMOdal
                            visible={modalCreateVisible}
                            onCreate={handleCreateModal}
                            onCancel={handleCancelCreateModal}
                        />

                        <ProductUpdateModal
                            visible={modalVisible}
                            onCreate={handleCreate}
                            onCancel={handleCancel}
                            data={updateData}
                        />
                    </>
            }
        </div>
    );
}

export default BasicTable;
