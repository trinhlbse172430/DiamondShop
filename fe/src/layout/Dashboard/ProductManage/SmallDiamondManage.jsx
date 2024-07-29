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
import DiamondCreateModal from "../../../components/Modal/DiamondCreateModal";
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { notification } from 'antd';
import SmallDiamondCreateModal from "../../../components/Modal/SmallDiamondCreateModal";
import SmallDiamondDetailModal from "../../../components/Modal/SmallDiamondDetailModal";



const { confirm } = Modal;

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

const EditModal = ({ visible, onCreate, onCancel, dataEdit }) => {
    const [DiaSmallPrice, setDiaPrice] = useState(0);

    useEffect(() => {
        if (visible && dataEdit) {
            setDiaPrice(dataEdit.DiaSmallPrice);
        }
    }, [visible]);

    const handleUpdateDiaPrice = async () => {
        try {
            const response = await axios.put(`/dia_small_price/${dataEdit.DiaSmallPriceID}`, { DiaSmallPrice: DiaSmallPrice });
            if (response.status === 200) {
                openNotificationWithIcon('success', 'Update price success');
                onCreate();
            }
        } catch (error) {
            console.error(error);
            openNotificationWithIcon('error', 'Update price failed');
        }
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };

    return (
        <Modal
            visible={visible}
            title="Cập nhật giá"
            okText="Cập nhật"
            cancelText="Chỉnh sửa"
            onCancel={onCancel}
            onOk={handleUpdateDiaPrice}
        >
            {contextHolder}
            <label>Giá kim cương tấm:</label>
            <Input
                type="number"
                placeholder="Price"
                value={DiaSmallPrice}
                onChange={(e) => setDiaPrice(e.target.value)}
            />
        </Modal>
    );
};


const BasicTable = () => {
    const context = useAuth();

    const [data, setData] = useState([]);
    const [diaOrigin, setDiaOrigin] = useState([]);
    const [diaColor, setDiaColor] = useState([]);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [diaClarity, setDiaClarity] = useState([]);
    const [product, setProduct] = useState([]);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [modalDetailVisible, setModalDetailVisible] = useState(false);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const [tableData, setTableData] = useState([]);

    // ----------------------------------- API GET ALL DIAMOND --------------------------------
    async function loadAllDiamond(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/diamond_small`
            )
                .then((data) => {
                    setData(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllDiamondPrice = async (data) => {
        try {
            const loadData = await axios.get('/dia_small_price')
            if (loadData) {
                data.map((item) => {
                    const price = loadData.data.find((price) => price.DiaSmallPriceID === item.DiaSmallID);
                    if (price) {
                        item.DiaSmallPrice = price.DiaSmallPrice;
                    }
                })
            }
            console.log('data' + data);
            setTableData(data);
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllDiamondOrigin = async () => {
        try {
            const loadData = await axios.get(
                `/dia_origin`)
                .then((data) => {
                    setDiaOrigin(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllDiaColor = async () => {
        try {
            const loadData = await axios.get(
                `/dia_color`)
                .then((data) => {
                    setDiaColor(data.data);

                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllDiaClarity = async () => {
        try {
            const loadData = await axios.get(
                `/dia_clarity`)
                .then((data) => {
                    setDiaClarity(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllProduct = async () => {
        try {
            const loadData = await axios.get(
                `/product`)
                .then((data) => {
                    setProduct(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        loadAllDiamond();
        loadAllDiamondOrigin();
        loadAllDiaColor();
        loadAllDiaClarity();
        loadAllProduct();
    }, []);

    useEffect(() => {
        loadAllDiamondPrice(data);
    }, [data]);

    // --------------------- HANDLE OPEN CREATE GOLD ----------------------------
    const handleOpenCreateModal = () => {
        setModalCreateVisible(true);
    };

    const handleCreateModal = (values) => {
        setModalCreateVisible(false);
        loadAllDiamond();
    }

    const handleCancelCreateModal = () => {
        setModalCreateVisible(false);
    }

    // --------------------- HANDLE OPEN EDIT PRICE ----------------------------
    const handleOpenEditModal = () => {
        setModalEditVisible(true);
    };

    const handleEditModal = (values) => {
        setModalEditVisible(false);
        loadAllDiamond();
    }

    const handleCancelEditModal = () => {
        setModalEditVisible(false);
    }

    // --------------------- HANDLE OPEN DETAIL DIAMOND ----------------------------
    const handleGetDiamondDetailById = (DiaID) => {
        const dataDetail = data.find((item) => item.DiaSmallID === DiaID);
        setDataDetail(dataDetail);
        handleDetailModal();
    }

    const handleDetailModal = () => {
        setModalDetailVisible(true);
    }

    const handleCancelDetailModal = () => {
        setModalDetailVisible(false);
    }

    // --------------------- HANDLE DELETE DIAMOND ----------------------------
    const handleDelete = async (DiaID) => {
        try {
            const response = await axios.delete(`/diamond_small/${DiaID}`);
            if (response.status === 204) {
                openNotificationWithIcon('success', 'Delete success');
                loadAllDiamond();
            }
        } catch (error) {
            console.error(error);
            openNotificationWithIcon('error', 'Delete failed');
        }
    }

    const handleDeleteSmallDiamondPrice = async (DiaID) => {
        try {
            const response = await axios.delete(`/dia_small_price/${DiaID}`);
            if (response.status === 204) {
                loadAllDiamond();
            }
        } catch (error) {
            console.error(error);
            openNotificationWithIcon('error', 'Delete failed');
        }
    }

    const handleDeleteProduct = async (DiaID) => {
        product.map((item) => {
            if (item.DiamondSmallID === DiaID) {
                try {
                    const response = axios.delete(`/product/${item.ProductID}`);
                    if (response.status === 204) {
                        loadAllProduct();
                    }
                } catch (error) {
                    console.error(error);
                    openNotificationWithIcon('error', 'Delete product failed');
                }
            }
        }
        )
    }

    const handleGetDiamondById = async (DiaID) => {
        try {
            const response = await axios.get(`/dia_small_price/${DiaID}`);
            setDataEdit(response.data);
        } catch (error) {
            console.error(error);
        }
        handleOpenEditModal();
    }


    // --- noti ---
    const showConfirm = (DiaID) => {
        confirm({
            title: 'Delete small diamond ' + DiaID + '?',
            icon: <ExclamationCircleFilled />,
            content: 'WARNING: This will delete all products that contain this diamond. Are you sure?',
            onOk() {
                console.log('Yes');
                handleDeleteProduct(DiaID).then(() => {
                    handleDeleteSmallDiamondPrice(DiaID).then(() => {
                        handleDelete(DiaID);
                    });
                }
                );
            },
            onCancel() {
                console.log('No');
            },
        });
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };


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
            title: 'Mã kim cương tấm',
            dataIndex: 'DiaSmallID',
            ...getColumnSearchProps('DiaSmallID'),
            key: 'DiaSmallID',
            sorter: (a, b) => a.DiaSmallID.length - b.DiaSmallID.length,
            sortOrder: sortedInfo.columnKey === 'DiaSmallID' ? sortedInfo.order : null,
        },
        {
            title: 'Nguồn gốc',
            dataIndex: 'DiaSmallOriginID',
            render: (text, record) => {
                const origin = diaOrigin.find(item => item.DiaOriginID === record.DiaSmallOriginID);
                if (origin) {
                    return (
                        origin.DiaOriginName
                    );
                } else {
                    console.warn(`No origin found for DiaOriginID ${record.DiaOriginID}`);
                    return (
                        <Tag color="red">Unknown Origin</Tag>
                    );
                }
            },
            ...getColumnSearchProps('DiaSmallOriginID'),
        },
        {
            title: 'Trọng lượng',
            dataIndex: 'DiaSmallWeight',

        },
        {
            title: 'Đơn vị',
            dataIndex: 'DiaSmallUnit',
        },
        {
            title: 'Độ trong suốt',
            dataIndex: 'DiaSmallColorID',
            render: (text, record) => {
                const color = diaColor.find(item => item.DiaColorID === record.DiaSmallColorID);
                if (color) {
                    return (color.DiaColorName + '(' + color.DiaColorID + ')');
                } else {
                    console.warn(`No color found for DiaColorID ${record.DiaColorID}`);
                    return (
                        <Tag color="red">Unknown Color</Tag>
                    );
                }
            },
        },
        {
            title: 'Giá',
            dataIndex: 'DiaSmallPrice',
            render: (DiaSmallPrice) => numberToVND(DiaSmallPrice),
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        handleGetDiamondById(record.DiaSmallID)
                    }}>Cập nhật giá</Button>
                </Space>
            ),
        },
        //button edit
        // {
        //     title: '',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <Button onClick={(e) => showConfirm(record.DiaSmallID)}>DELETE</Button>
        //         </Space>
        //     ),
        // },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
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
                        {contextHolder}
                        <ButtonCustomize
                            variant="contained"
                            // component={RouterLink}
                            nameButton="Thêm mới kim cương tấm"
                            onClick={handleOpenCreateModal}
                            width="20%"
                            startIcon={<AddCircleOutlineIcon />}
                        />

                        <Table columns={columns} dataSource={tableData} onChange={onChange}
                        
                            onRow={(record) => {
                                return {
                                    onClick: (e) => handleGetDiamondDetailById(record.DiaSmallID),
                                }

                            }}
                        />

                        <SmallDiamondCreateModal
                            visible={modalCreateVisible}
                            onCreate={handleCreateModal}
                            onCancel={handleCancelCreateModal}
                        />

                        <SmallDiamondDetailModal
                            visible={modalDetailVisible}
                            onCreate={handleDetailModal}
                            onCancel={handleCancelDetailModal}
                            dataDetail={dataDetail}
                        />

                        <EditModal
                            visible={modalEditVisible}
                            onCreate={handleEditModal}
                            onCancel={handleCancelEditModal}
                            dataEdit={dataEdit}
                        />
                    </>
            }
        </div>
    );
}

export default BasicTable;
