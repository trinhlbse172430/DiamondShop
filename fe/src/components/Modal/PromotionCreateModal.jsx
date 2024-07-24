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
            title="Create Promotion"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleCreatePromotion}
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

export default PromotionCreateModal;
