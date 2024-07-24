import * as React from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonCustomize from "../../../components/Button/Button";
import { useRef, useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words'
import { Modal } from 'antd';
import { notification } from 'antd';
import DateTimeFormat from "../../../components/Typography/DateTimeFormat";
import moment from 'moment';
import PromotionCreateModal from "../../../components/Modal/PromotionCreateModal";
import PromotionUpdateModal from "../../../components/Modal/PromotionUpdateModal";



const { confirm } = Modal;
const Promotion = () => {
    const context = useAuth();

    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [product, setProduct] = useState();
    const [dataEdit, setDataEdit] = useState({});
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);

    // ----------------------------------- API GET ALL GOLD --------------------------------

    const loadAllPromotion = async () => {
        try {
            const loadData = await axios.get(
                `/promotion`)
                .then((data) => {
                    setData(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllPromotion();
    }, []);

    // --------------------- HANDLE OPEN CREATE GOLD ----------------------------
    const handleOpenCreateModal = () => {
        setModalCreateVisible(true);

    };

    const handleCreateModal = (values) => {
        setModalCreateVisible(false);
        loadAllPromotion();
    }

    const handleCancelCreateModal = () => {
        setModalCreateVisible(false);
    }

    // --------------------- HANDLE OPEN UPDATE PROMOTION ----------------------------
    const handleOpenUpdateModal = () => {
        setModalUpdateVisible(true);
    };

    const handleCreateUpdateModal = (values) => {
        setModalUpdateVisible(false);
        loadAllPromotion();
    }

    const handleCancelUpdateModal = () => {
        setModalUpdateVisible(false);
    }


    // --------------------- HANDLE LOAD DATA EDIT ----------------------------
    const loadDataEdit = (PromotionID) => {
        axios.get(`/promotion/${PromotionID}`)
            .then((data) => {
                setDataEdit(data.data);
                handleOpenUpdateModal();
            })
            .catch((err) => {
                console.log(err);
            });
    };



    // --- noti ---
    // const showConfirm = (GoldID) => {
    //     confirm({
    //         title: 'Delete diamond ' + GoldID + '?',
    //         icon: <ExclamationCircleFilled />,
    //         content: 'WARNING: This will delete all products that contain this diamond. Are you sure?',
    //         onOk() {
    //             console.log('Yes');
    //             handleDeleteProduct(GoldID).then(() => {
    //                 handleDelete(GoldID);
    //             }
    //             );
    //         },
    //         onCancel() {
    //             console.log('No');
    //         },
    //     });
    // };

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
            title: 'PromotionID',
            dataIndex: 'PromotionID',
            key: 'PromotionID',
            sorter: (a, b) => a.PromotionID.length - b.PromotionID.length,
            sortOrder: sortedInfo.columnKey === 'PromotionID' ? sortedInfo.order : null,
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'PromotionName',
            sorter: (a, b) => a.PromotionName.length - b.PromotionName.length,
            sortOrder: sortedInfo.columnKey === 'PromotionName' ? sortedInfo.order : null,
            ...getColumnSearchProps('PromotionName'),
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'PromStartDate',
            key: 'PromStartDate',
            sorter: (a, b) => moment(a.PromStartDate).unix() - moment(b.PromStartDate).unix(),
            sortOrder: sortedInfo.columnKey === 'PromStartDate' ? sortedInfo.order : null,
            render: (date) => new DateTimeFormat({ date: date }),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'PromEndDate',
            key: 'PromEndDate',
            sorter: (a, b) => moment(a.PromEndDate).unix() - moment(b.PromEndDate).unix(),
            sortOrder: sortedInfo.columnKey === 'PromEndDate' ? sortedInfo.order : null,
            render: (date) => new DateTimeFormat({ date: date }),
        },
        {
            title: 'Phần trăm giảm',
            dataIndex: 'PromPercent',
        },
        //button edit
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => loadDataEdit(record.PromotionID)}>EDIT</Button>
                </Space>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        setSortedInfo(sorter);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            {contextHolder}
            {
                context.auth.role === 'staff'
                    ?
                    <>
                        <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
                    </>
                    :
                    <>
                        <ButtonCustomize
                            variant="contained"
                            // component={RouterLink}
                            nameButton="Add Promotion"
                            width="15%"
                            onClick={handleOpenCreateModal}
                            startIcon={<AddCircleOutlineIcon />}
                        />


                        <div className="table-container"><Table columns={columns} dataSource={data} onChange={onChange} /></div>

                        <PromotionCreateModal
                            visible={modalCreateVisible}
                            onCreate={handleCreateModal}
                            onCancel={handleCancelCreateModal}
                        />

                        <PromotionUpdateModal
                            visible={modalUpdateVisible}
                            data={dataEdit}
                            onCreate={handleCreateUpdateModal}
                            onCancel={handleCancelUpdateModal}
                        />
                    </>
            }
        </div>
    );
}

export default Promotion;
