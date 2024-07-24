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
            title="Promotion"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleUpdatePromotion}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Promotion name:</label>
                <Input
                    placeholder="Enter promotion name"
                    value={promName}
                    onChange={(e) => setPromName(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Start Date:</label>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Select start date"
                    value={startDate}
                    onChange={(date) => setStartDate(date ? dayjs(date) : null)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>End Date:</label>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Select end date"
                    value={endDate}
                    onChange={(date) => setEndDate(date ? dayjs(date) : null)}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Promotion Percent:</label>
                <InputNumber style={{ width: '100%' }} min={1} max={100} defaultValue={1} onChange={(value) => setPromPercent(value)} />
            </div>
        </Modal>
    );
};

export default PromotionUpdateModal;
