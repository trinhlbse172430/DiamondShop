import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
import axios from "axios";
import dayjs from 'dayjs';
import { notification } from 'antd';
import { Typography } from "antd";


const { Option } = Select;

const numberToVND = (number) => {
    if (typeof number === 'string') {
        number = parseInt(number);
    }
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

const DeliveryModal = ({ visible, onCreate, onCancel, data }) => {
    const [status, setStatus] = useState(1);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [cancelText, setCancelText] = useState('');
    const [shipPrice, setShipPrice] = useState('');


    // Load data into form when empData changes
    useEffect(() => {
        if (data) {
            setName(data.CusName);
            setAddress(data.CusAddress);
            setTotalPrice(data.TotalPrice);
            setPhone(data.CusPhone);
            setNote(data.OrdNote);
            setShipPrice(data.ShipPrice);
        }
    }, [data]);

    const handleStatusChange = (value) => {
        setStatus(parseInt(value));
    };

    const handleUpdate = () => {
        try {
            axios.put(`/order/${data.OrderID}`, {
                OrdStatus: status,
                OrdNote: note + ' - ' + cancelText,
            }).then((response) => {
                console.log(response);
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }
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
            title="Update employee"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleUpdate}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Name:</label>
                <Typography>{name}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Address:</label>
                <Typography>{address}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Total Price:</label>
                <Typography>{totalPrice && numberToVND(totalPrice)}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Phone:</label>
                <Typography>{phone}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Note:</label>
                <Typography>{note}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Ship Price:</label>
                <Typography>{shipPrice && numberToVND(shipPrice)}</Typography>
            </div>
            <div>
                <label>Status:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select status"
                    onChange={handleStatusChange}
                >
                    <Option value="4">Cancelled</Option>
                    <Option value="5">Complete</Option>
                </Select>
            </div>

            {status === 4 && (
                <div style={{ marginTop: 16 }}>
                    <label>Reason:</label>
                    <Input.TextArea
                        placeholder="Input reason"
                        onChange={(e) => setCancelText(e.target.value)}
                    />
                </div>
            )}

        </Modal>
    );
};

export default DeliveryModal;
