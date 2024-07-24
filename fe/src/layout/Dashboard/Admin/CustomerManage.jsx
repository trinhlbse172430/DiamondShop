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
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;


    const context = useAuth();

    const [data, setData] = useState([]);

    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllUser(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/customer`
            )
                .then((data) => {
                    setData(data.data);
                    console.log(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllUser();
    }, []);
    // ----------------------------------------------------------------

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
            title: 'CustomerID',
            dataIndex: 'CustomerID',
            width: '10%'
        },
        {
            title: 'Họ và tên',
            dataIndex: 'CusName',
            ...getColumnSearchProps('CusName'),
            key: 'CusName',
            sorter: (a, b) => a.CusName.length - b.CusName.length,
            sortOrder: sortedInfo.columnKey === 'CusName' ? sortedInfo.order : null,
        },
        {
            title: 'Email',
            dataIndex: 'CusEmail',
            ...getColumnSearchProps('CusEmail'),
        },
        {
            title: 'SĐT',
            dataIndex: 'age',
            dataIndex: 'CusPhone',
            ...getColumnSearchProps('CusPhone'),
        },
        {
            title: 'Điểm',
            dataIndex: 'CusPoint',
            key: 'CusPoint',
            sorter: (a, b) => a.CusPoint - b.CusPoint,
            sortOrder: sortedInfo.columnKey === 'CusPoint' ? sortedInfo.order : null,
        },
        //button edit
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <Button onClick={(e) => handleLoadUserbId(record._id, record.password)}>Chỉnh sửa</Button>
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

                        <Table columns={columns} dataSource={data} onChange={onChange} />
                    </>
            }
        </div>
    );
}

export default BasicTable;
