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
            title="Update employee"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleUpdateEmployee}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Name:</label>
                <Input
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Address:</label>
                <Input
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Phone:</label>
                <Input
                    placeholder="Enter phone"
                    value={empPhone}
                    onChange={(e) => setEmpPhone(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Username:</label>
                <Input
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Email:</label>
                <Input
                    placeholder="Enter email"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Note:</label>
                <Input.TextArea
                    placeholder="Enter note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Password:</label>
                <Input.Password
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Birthday:</label>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Select birthday"
                    value={dayjs(birthday)}
                    onChange={(date) => setBirthday(date ? dayjs(date) : null)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Role:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select role"
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
                <label>Status:</label>
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
