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
            title="Cập nhật trạng thái đơn hàng"
            okText="Cập nhật"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleUpdate}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Tên khách hàng:</label>
                <Typography>{name}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Địa chỉ:</label>
                <Typography>{address}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Tổng giá tiền:</label>
                <Typography>{totalPrice && numberToVND(totalPrice)}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Số điện thoại:</label>
                <Typography>{phone}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Ghi chú:</label>
                <Typography>{note}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Phí giao hàng:</label>
                <Typography>{shipPrice && numberToVND(shipPrice)}</Typography>
            </div>
            <div>
                <label>Trạng thái:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select status"
                    onChange={handleStatusChange}
                >
                    <Option value="4">Huỷ</Option>
                    <Option value="7">Shipper đã giao hàng</Option>
                </Select>
            </div>

            {status === 4 && (
                <div style={{ marginTop: 16 }}>
                    <label>Lí do:</label>
                    <Input.TextArea
                        placeholder="Nhập lí do huỷ đơn hàng"
                        onChange={(e) => setCancelText(e.target.value)}
                    />
                </div>
            )}

        </Modal>
    );
};

export default DeliveryModal;
