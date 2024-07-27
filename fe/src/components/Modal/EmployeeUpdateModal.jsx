import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
import axios from "axios";
import dayjs from 'dayjs';
import { notification } from 'antd';

const { Option } = Select;

const EmployeeUpdateModal = ({ visible, onCreate, onCancel, empData, roleList }) => {
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [empPhone, setEmpPhone] = useState('');
    const [username, setUsername] = useState('');
    const [gmail, setGmail] = useState('');
    const [note, setNote] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [roleId, setRoleId] = useState(null);
    const [roleName, setRoleName] = useState('');
    const [roleFunction, setRoleFunction] = useState(1);

    const handleUpdateEmployee = () => {
        let statusNumber = 1;
        if (status === "off") {
            statusNumber = 2;
        }
        else {
            statusNumber = 1;
        }
        try {
            axios.put(`/employee/${empData.EmployeeID}`, {
                EmpName: name,
                EmpAddress: address,
                EmpPhone: empPhone,
                EmpUserName: username,
                EmpGmail: gmail,
                EmpNote: note,
                EmpPassword: password,
                EmpBirthDay: birthday,
                EmpStatus: statusNumber,
            }).then((response) => {
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }

        try {
            axios.put(`/role/${roleId}`, {
                RoleName: roleName,
                FunctionID: roleFunction,
            }).then((response) => {
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }

        openNotificationWithIcon('success', 'Update employee successfully');

    };

    const loadRoleId = () => {
        try {
            axios.get(`/role`).then((response) => {
                const role = response.data.find((role) => role.EmployeeID === empData.EmployeeID);
                if (role) {
                    setRoleId(role.RoleID);
                    setRoleName(role.RoleName);
                    //if role.RoleName === "Admin" then set roleFunction = 1 else if role.RoleName === "Manager" then set roleFunction = 2 else if role.RoleName === "Sale" then set roleFunction = 3 else set roleFunction = 4
                    if (role.RoleName === "Admin") {
                        setRoleFunction(1);
                    } else if (role.RoleName === "Manager") {
                        setRoleFunction(2);
                    } else if (role.RoleName === "Sale") {
                        setRoleFunction(3);
                    } else {
                        setRoleFunction(4);
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateFunction = (roleName) => {
        setRoleName(roleName);
        switch (roleName) {
            case "Admin":
                setRoleFunction(1);
                break;
            case "Manager":
                setRoleFunction(2);
                break;
            case "Sale":
                setRoleFunction(3);
                break;
            case "Delivery":
                setRoleFunction(4);
                break;
            default:
                setRoleFunction(1);
                break;
        }
    };

    // Load data into form when empData changes
    useEffect(() => {
        loadRoleId();
        if (empData) {
            setName(empData.EmpName);
            setAddress(empData.EmpAddress);
            setEmpPhone(empData.EmpPhone);
            setUsername(empData.EmpUserName);
            setGmail(empData.EmpGmail);
            setNote(empData.EmpNote);
            setPassword(empData.EmpPassword);
            setBirthday(dayjs(empData.EmpBirthDay)); // Convert to moment object
            console.log(empData.EmpStatus);
            if (empData.EmpStatus === 2) {
                setStatus("off");
            } else {
                setStatus("working");
            }
        }
    }, [empData]);

    //ant notify
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
            title="Cập nhật thông tin nhân viên"
            okText="Cập nhật"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleUpdateEmployee}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Tên:</label>
                <Input
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Địa chỉ:</label>
                <Input
                    placeholder="Nhập địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Số điện thoại:</label>
                <Input
                    placeholder="Nhập số điện thoại"
                    value={empPhone}
                    onChange={(e) => setEmpPhone(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Tài khoản:</label>
                <Input
                    placeholder="Nhập tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Gmail:</label>
                <Input
                    placeholder="Nhập Gmail"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Ghi chú:</label>
                <Input.TextArea
                    placeholder="Nhập ghi chú"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Mật khẩu:</label>
                <Input.Password
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Ngày sinh:</label>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Nhập ngày sinh nhật"
                    value={dayjs(birthday)}
                    onChange={(date) => setBirthday(date ? dayjs(date) : null)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Chức vụ:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Chọn chức vụ"
                    onChange={(value) => handleUpdateFunction(value)}
                    value={roleName}
                >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Sale">Sale</option>
                    <option value="Delivery">Delivery</option>
                </Select>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Trạng thái:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select role"
                    value={status}
                    onChange={(value) => setStatus(value)}
                >
                    <option value="working">Working</option>
                    <option value="off">Off</option>
                </Select>
            </div>
        </Modal>
    );
};

export default EmployeeUpdateModal;
