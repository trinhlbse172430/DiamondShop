import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import dayjs from 'dayjs';
import { notification } from 'antd';

const { Option } = Select;

const PromotionUpdateModal = ({ visible, onCreate, onCancel, data }) => {
    const [promName, setPromName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [PromPercent, setPromPercent] = useState(1);

    useEffect(() => {
        if (visible) {
            setPromName(data.PromotionName);
            setStartDate(data.PromStartDate ? dayjs(data.PromStartDate) : null);
            setEndDate(data.PromEndDate ? dayjs(data.PromEndDate) : null);
            setPromPercent(data.PromPercent);
        }
    }, [visible]);

    //handle update promotion
    const handleUpdatePromotion = () => {
        if (!promName || !startDate || !endDate || !PromPercent) {
            openNotificationWithIcon('error', 'Please fill all fields');
            return;
        }
        if (startDate >= endDate) {
            openNotificationWithIcon('error', 'Start date must be before end date');
            return;
        }
        //check percent
        if (PromPercent >= 49) {
            openNotificationWithIcon('error', 'Promotion percent must be smaller than 50%');
            return;
        }
        axios.put(`/promotion/${data.PromotionID}`, {
            PromotionName: promName,
            PromStartDate: startDate.format('YYYY-MM-DD'),
            PromEndDate: endDate.format('YYYY-MM-DD'),
            PromPercent: PromPercent
        })
            .then((res) => {
                openNotificationWithIcon('success', 'Update promotion successfully');
                onCreate();
            })
            .catch((err) => {
                openNotificationWithIcon('error', 'Update promotion failed');
            });
    }



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
            title="Cập nhật chương trình khuyến mãi"
            okText="Cập nhật"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleUpdatePromotion}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Tên chương trình khuyến mãi:</label>
                <Input
                    placeholder="Nhập tên chương trình khuyến mãi"
                    value={promName}
                    onChange={(e) => setPromName(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Chọn ngày bất đầu chương trình:</label>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày bắt đầu khuến mãi"
                    value={startDate}
                    onChange={(date) => setStartDate(date ? dayjs(date) : null)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Chọn ngày kết thúc khuyến mãi:</label>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày kết thúc khuyến mãi"
                    value={endDate}
                    onChange={(date) => setEndDate(date ? dayjs(date) : null)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Phần trăm khuyến mãi:</label>
                <InputNumber style={{ width: '100%' }} min={1} max={100} value={PromPercent} onChange={(value) => setPromPercent(value)} />
            </div>
        </Modal>
    );
};

export default PromotionUpdateModal;
