import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
import axios from "axios";
import dayjs from 'dayjs';
import { notification } from 'antd';

const { Option } = Select;

const EmployeeCreateModal = ({ visible, onCreate, onCancel, empData, roleList }) => {
    const [status, setStatus] = useState(1);
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

    useEffect(() => {
        if (visible) {
            setName('');
            setAddress('');
            setEmpPhone('');
            setUsername('');
            setGmail('');
            setNote('');
            setPassword('');
            setBirthday(null);
            setRoleName('');
        }
    }, [visible]);

    const handleCreateRole = (employeeId) => {
        let RoleIdNumber = 0;
        let RoleID = "";
        console.log("employeeid: " + employeeId);
        try {
            axios.get(`/role`).then((response) => {
                if (response.data.length === 0) {
                    RoleID = "ROL001";
                    RoleIdNumber = 1;
                } else {
                    RoleIdNumber = parseInt(response.data[response.data.length - 1].RoleID.slice(3)) + 1;
                    if (RoleIdNumber < 10) {
                        RoleID = "ROL00" + RoleIdNumber;
                    } else if (RoleIdNumber < 100) {
                        RoleID = "ROL0" + RoleIdNumber;
                    } else {
                        RoleID = "ROL" + RoleIdNumber;
                    }
                }
                setRoleId(RoleID);
                let functionID = 1;
                switch (roleName) {
                    case "Admin":
                        functionID = 1;
                        break;
                    case "Manager":
                        functionID = 2;
                        break;
                    case "Sale":
                        functionID = 3;
                        break;
                    case "Delivery":
                        functionID = 4;
                        break;
                    default:
                        functionID = 1;
                        break;
                }
                axios.post(`/role`, {
                    RoleID: RoleID,
                    RoleName: roleName,
                    FunctionID: functionID,
                    EmployeeID: employeeId
                }).then((response) => {
                    console.log(response);
                    onCreate();
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateEmployee = () => {
        let EmployeeIdNumber = 0;
        let EmployeeID = "";
        try {
            axios.get(`/employee`).then((response) => {
                if (response.data.length === 0) {
                    EmployeeID = "EMP001";
                    EmployeeIdNumber = 1;
                } else {
                    EmployeeIdNumber = parseInt(response.data[response.data.length - 1].EmployeeID.slice(3)) + 1;
                    if (EmployeeIdNumber < 10) {
                        EmployeeID = "EMP00" + EmployeeIdNumber;
                    } else if (EmployeeIdNumber < 100) {
                        EmployeeID = "EMP0" + EmployeeIdNumber;
                    } else {
                        EmployeeID = "EMP" + EmployeeIdNumber;
                    }
                }
                axios.post(`/employee`, {
                    EmployeeID: EmployeeID,
                    EmpName: name,
                    EmpAddress: address,
                    EmpPhone: empPhone,
                    EmpUserName: username,
                    EmpGmail: gmail,
                    EmpNote: note,
                    EmpPassword: password,
                    EmpBirthDay: birthday,
                    EmpStatus: 1
                }).then((response) => {
                    console.log(response);
                });
                handleCreateRole(EmployeeID);
            });
        } catch (error) {
            console.log(error);
        }
    };


    // Load data into form when empData changes
    useEffect(() => {
        // loadRoleId();
        if (empData) {
            setName(empData.EmpName);
            setAddress(empData.EmpAddress);
            setEmpPhone(empData.EmpPhone);
            setUsername(empData.EmpUserName);
            setGmail(empData.EmpGmail);
            setNote(empData.EmpNote);
            setPassword(empData.EmpPassword);
            setBirthday(dayjs(empData.EmpBirthDay)); // Convert to moment object
        }
    }, [empData]);

    const disabledDate = (current) => {
        // Disable dates after today (future dates)
        return current && current > dayjs().endOf('day');
    };

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
            title="Create Employee"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleCreateEmployee}
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
                    value={birthday}
                    onChange={(date) => setBirthday(date ? dayjs(date) : null)}
                    disabledDate={disabledDate} // Disable future dates
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Role:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select role"
                    onChange={(value) => setRoleName(value)}
                    value={roleName}
                >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Sale">Sale</option>
                    <option value="Delivery">Delivery</option>
                </Select>
            </div>
        </Modal>
    );
};

export default EmployeeCreateModal;
