import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import dayjs from 'dayjs';
import { notification } from 'antd';

const { Option } = Select;

const PromotionCreateModal = ({ visible, onCreate, onCancel }) => {
    const [promName, setPromName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [PromPercent, setPromPercent] = useState(1);

    useEffect(() => {
        if (visible) {
            setPromName('');
            setStartDate(null);
            setEndDate(null);
            setPromPercent(1);
        }
    }, [visible]);

    //handle create promotion
    const handleCreatePromotion = async () => {
        //check all field
        if (!promName || !startDate || !endDate || !PromPercent) {
            openNotificationWithIcon('error', 'Please fill all fields');
            return;
        }
        //check enddate > startdate
        if (endDate < startDate) {
            openNotificationWithIcon('error', 'End date must be greater than start date');
            return;
        }
        //check percent
        if (PromPercent >= 49) {
            openNotificationWithIcon('error', 'Promotion percent must be smaller than 50%');
            return;
        }
        const promotionID = "PRO" + Date.now().toString(36).slice(-4);
        try {
            const response = await axios.post(`/promotion`, {
                PromotionID: promotionID,
                PromotionName: promName,
                PromStartDate: startDate,
                PromEndDate: endDate,
                PromPercent: PromPercent,
            });
            if (response) {
                openNotificationWithIcon('success', 'Create promotion successfully');
                onCreate();
            }
        } catch (error) {
            openNotificationWithIcon('error', 'Create promotion failed');
            console.error(error);
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
            title="Tạo mới chương trình khuyến mãi"
            okText="Tạo mới"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleCreatePromotion}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Tên chương trình khuyến mãi:</label>
                <Input
                    placeholder="Enter promotion name"
                    value={promName}
                    onChange={(e) => setPromName(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Ngày bắt đầu chương trình khuyến mãi:</label>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày bắt đầu chương trình khuyến mãi"
                    value={startDate}
                    onChange={(date) => setStartDate(date ? dayjs(date) : null)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Ngày kết thức chương trình khuyến mãi:</label>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày kết thức chương trình khuyến mãi"
                    value={endDate}
                    onChange={(date) => setEndDate(date ? dayjs(date) : null)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Phần trăm khuyến mãi:</label>
                <InputNumber placeholder="Nhập phần trăm khuyến mãi" style={{ width: '100%' }} min={1} max={100} onChange={(value) => setPromPercent(value)} />
            </div>
        </Modal>
    );
};

export default PromotionCreateModal;
