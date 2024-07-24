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
import './Dasboard.css'
import moment from 'moment';
import EmployeeUpdateModal from "../../../components/Modal/EmployeeUpdateModal";
import EmployeeCreateModal from "../../../components/Modal/EmployeeCreateModal";
import dayjs from "dayjs";

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
    const [roleList, setRoleList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [employeeIDUpdate, setEmployeeIdUpdate] = useState("");
    const [updateData, setUpdateData] = useState({});


    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllUser(page, limit) {
        try {
            const loadData = await axios.get(
                `/employee`
            )
                .then((data) => {
                    const id = context.auth.id;
                    //get data except current user
                    const filterData = data.data.filter((item) => item.EmployeeID !== id);
                    setData(filterData);
                })
        } catch (err) {
            console.log(err);
        }
    }

    async function loadRoleList() {

        try {
            const res = await axios.get("/role");
            setRoleList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadAllUser();
        loadRoleList();

    }, []);

    //--------------------- HANDLE GET EMPLOYEE BY ID ----------------------------
    const handleGetEmployeeById = async (id) => {
        try {
            setEmployeeIdUpdate(id);
            const res = await axios.get(`/employee/${id}`);
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
        loadRoleList()
        loadAllUser();
    };

    const handleCancel = () => {
        setModalVisible(false);
        loadAllUser();
    };

    // --------------------- HANDLE OPEN CREATE EMPLOYEE ----------------------------
    const handleOpenCreateModal = () => {
        setModalCreateVisible(true);
    };

    const handleCreateModal = (values) => {
        setModalCreateVisible(false);
        loadRoleList()
        loadAllUser();
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
            title: 'EmployeeID',
            dataIndex: 'EmployeeID',
            width: '10%'
        },
        {
            title: 'Họ và tên',
            dataIndex: 'EmpName',
            ...getColumnSearchProps('EmpName'),
            key: 'EmpName',
            sorter: (a, b) => a.EmpName.length - b.EmpName.length,
            sortOrder: sortedInfo.columnKey === 'EmpName' ? sortedInfo.order : null,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'EmpAddress',
            ...getColumnSearchProps('EmpAddress'),
        },
        {
            title: 'SĐT',
            dataIndex: 'age',
            dataIndex: 'EmpPhone',
            ...getColumnSearchProps('EmpPhone'),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'EmpBirthDay',
            render: text => dayjs(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Email',
            dataIndex: 'EmpGmail',
            ...getColumnSearchProps('EmpGmail'),
            key: 'EmpGmail',
            sorter: (a, b) => a.EmpGmail.length - b.EmpGmail.length,
            sortOrder: sortedInfo.columnKey === 'EmpGmail' ? sortedInfo.order : null,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'EmpNote',
            render: (EmpNote, record) => {
                const role = roleList.find(role => role.EmployeeID === record.EmployeeID);
                if (role) {
                    if (role.RoleName === 'Admin') {
                        return <Tag color="yellow">{role.RoleName}</Tag>;
                    } else if (role.RoleName === 'Manager') {
                        return <Tag color="purple">{role.RoleName}</Tag>;
                    } else if (role.RoleName === 'Sale') {
                        return <Tag color="blue">{role.RoleName}</Tag>;
                    } else if (role.RoleName === 'Delivery') {
                        return <Tag color="green">{role.RoleName}</Tag>;
                    }
                } else {
                    return EmpNote; // Fallback to original value if role not found
                }
            },
            key: 'EmpNote',
            filters: [
                {
                    text: 'Admin',
                    value: 'Admin',
                },
                {
                    text: 'Sale',
                    value: 'Sale',
                },
                {
                    text: 'Manager',
                    value: 'Manager',
                },
                {
                    text: 'Delivery',
                    value: 'Delivery',
                },
            ],
            onFilter: (value, record) => {
                const role = roleList.find(role => role.EmployeeID === record.EmployeeID);
                return role ? role.RoleName.indexOf(value) === 0 : false;
            },
        },
        {
            title: 'Tình trạng',
            dataIndex: 'EmpStatus',
            render: (EmpStatus) => {
                if (EmpStatus === 2) {
                    return <Tag color="red">Off</Tag>;
                } else {
                    return <Tag color="green">Working</Tag>;
                }
            }
        },
        //button edit
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => handleGetEmployeeById(record.EmployeeID)}>EDIT</Button>
                </Space>
            ),
        },
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

                            variant="contained"
                            // component={RouterLink}
                            nameButton="Add new employee"
                            onClick={handleOpenCreateModal}
                            width="20%"
                            startIcon={<AddCircleOutlineIcon />}
                        />
                        <Table columns={columns} dataSource={data} onChange={onChange} />

                        <EmployeeUpdateModal
                            visible={modalVisible}
                            onCreate={handleCreate}
                            onCancel={handleCancel}
                            roleList={roleList}
                            empData={updateData}
                        />

                        <EmployeeCreateModal
                            visible={modalCreateVisible}
                            onCreate={handleCreateModal}
                            onCancel={handleCancelCreateModal}
                            roleList={roleList}
                        />

                    </>
            }
        </div>
    );
}

export default BasicTable;
