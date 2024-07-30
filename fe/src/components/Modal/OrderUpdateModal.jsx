import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const CreateModal = ({ visible, onCreate, onCancel, deliveryEmployeeList, orderIDUpdate }) => {
    const [employeeId, setEmployeeId] = useState(null);
    const [status, setStatus] = useState(1);
    const [role, setRole] = useState(null);
    const [employeeOrderCounts, setEmployeeOrderCounts] = useState({});

    const handleEmployeeChange = (value) => {
        setEmployeeId(value);
    };

    const handleStatusChange = (value) => {
        setStatus(parseInt(value));
    };

    const handleUpdate = () => {
        try {
            axios.put(`/order/${orderIDUpdate}`, {
                EmployeeIDShip: employeeId,
                OrdStatus: status
            }).then((response) => {
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEmployeeOrderCounts = async () => {
        const counts = {};
        for (const employee of deliveryEmployeeList) {
            try {
                const response = await axios.get(`/order`);
                const data = response.data.filter((order) => order.EmployeeIDShip === employee.EmployeeID);
                const numberOrderDelivery = data.length;
                counts[employee.EmployeeID] = numberOrderDelivery;
            } catch (error) {
                console.log(`Error fetching order count for employee ${employee.EmployeeID}:`, error);
                counts[employee.EmployeeID] = 0; // Set default count to 0 on error
            }
        }
        setEmployeeOrderCounts(counts);
    };

    useEffect(() => {
        setRole(localStorage.getItem('role'));
        // fetchEmployeeOrderCounts();
    }, []);

    useEffect(() => {
        if (visible) {
            fetchEmployeeOrderCounts();
        }
    }, [visible, deliveryEmployeeList]);

    useEffect(() => {
        // fetchEmployeeOrderCounts();
        if (deliveryEmployeeList.length > 0) {
            setEmployeeId(deliveryEmployeeList[0].EmployeeID); // Setting first employeeId as default
        }
    }, [deliveryEmployeeList]);

    return (
        <Modal
            visible={visible}
            title="Cập nhật đơn hàng"
            okText="Cập nhật"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleUpdate}
        >
            <div style={{ marginBottom: 16 }}>
                <label>Nhân viên giao hàng:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Chọn nhân viên giao hàng"
                    onChange={handleEmployeeChange}
                    value={employeeId}
                >
                    {deliveryEmployeeList.map((employee) => (
                        <Option key={employee.EmployeeID} value={employee.EmployeeID}>
                            {employee.EmpName} ({employeeOrderCounts[employee.EmployeeID]})
                        </Option>
                    ))}
                </Select>
            </div>
            <div>
                <label>Trạng thái đơn hàng:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Chọn trạng thái đơn hàng"
                    onChange={handleStatusChange}
                >
                    {role === 'Admin' ? (
                        <>
                            <Option value="2">Xác nhận</Option>
                            <Option value="3">Đang vận chuyển</Option>
                            <Option value="4">Huỷ</Option>
                            <Option value="5">Hoàn thành</Option>
                            <Option value="7">Shipper đã giao hàng</Option>
                        </>
                    ) : role === 'Sale' ? (
                        <>
                            <Option value="2">Xác nhận</Option>
                            <Option value="3">Đang vận chuyển</Option>
                        </>
                    ) : (
                        <>
                            <Option value="1">Pending</Option>
                        </>
                    )}
                </Select>
            </div>
        </Modal>
    );
};

export default CreateModal;
