import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import { notification } from 'antd';

const { Option } = Select;

const GoldCreateModal = ({ visible, onCreate, onCancel }) => {
    const [GoldTypeID, setGoldTypeID] = useState(null);
    const [GoldAgeID, setGoldAgeID] = useState(null);
    const [GoldWeight, setGoldWeight] = useState(1);
    const [GoldTypeList, setGoldTypeList] = useState([]);
    const [GoldAgeList, setGoldAgeList] = useState([]);
    const [GoldPrice, setGoldPrice] = useState(100000);

    useEffect(() => {
        if (visible) {
            setGoldTypeID(null);
            setGoldAgeID(null);
            setGoldWeight(1);
        }
    }, [visible]);

    const loadGoldTypeList = async () => {
        try {
            const response = await axios.get(`/gold_type`);
            setGoldTypeList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadGoldAgeList = async () => {
        try {
            const response = await axios.get(`/gold_age`);
            setGoldAgeList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadGoldTypeList();
        loadGoldAgeList();
    }, []);

    //--------------------- HANDLE CREATE GOLD ----------------------------
    const handleCreateGold = async () => {
        //check if all fields are filled
        if (!GoldTypeID || !GoldAgeID || !GoldWeight || !GoldPrice) {
            openNotificationWithIcon('error', 'Please fill all fields');
            return;
        }
        //create gold
        let weight = GoldWeight.toString();
        //if number 1 -> 01
        if (weight.length === 1) {
            weight = '0' + weight;
        }
        //check GoldID existed else continue
        const GoldID = GoldTypeID + GoldAgeID + weight;
        try {
            const response = await axios.get(`/gold`);
            const list = response.data; // Assuming response.data is an array of gold objects

            // Check if GoldID already exists in the list
            const existingGold = list.find(gold => gold.GoldID === GoldID);
            if (existingGold) {
                openNotificationWithIcon('error', 'GoldID already exists');
                return;
            }
        } catch (error) {
            console.error(error);
        }
        try {
            axios.post(`/gold`, {
                GoldID: GoldID,
                GoldTypeID,
                GoldAgeID,
                GoldWeight,
                GoldPrice,
                GoldPicture: 'picture',
                GoldUnit: 'chỉ'
            }).then((response) => {
                openNotificationWithIcon('success', 'Create gold successfully');
                console.log(response);
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }

        try {
            axios.post(`/gold_price`, {
                GoldPriceID: GoldID,
                GoldTypeID,
                GoldAgeID,
                GoldWeight,
                GoldPrice,
                GoldInputDate : moment().format('YYYY-MM-DD'),
                GoldPicture: 'picture',
                GoldUnit: 'chỉ',
                Currency: 'VND'
            }).then((response) => {
                openNotificationWithIcon('success', 'Create gold successfully');
                console.log(response);
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }
    }

    //ant noti
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
            title="Tạo vàng mới"
            okText="Tạo mới"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleCreateGold}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Loại vàng:</label>
                {GoldTypeList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn loại vàng"
                        onChange={(value) => setGoldTypeID(value)}
                        value={GoldTypeID}
                    >
                        {GoldTypeList.map((goldType) => (
                            <Option key={goldType.GoldTypeID} value={goldType.GoldTypeID}>
                                {goldType.GoldTypeName}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Tuổi vàng:</label>
                {GoldAgeList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn tuổi vàng"
                        onChange={(value) => setGoldAgeID(value)}
                        value={GoldAgeID}
                    >
                        {GoldAgeList.map((goldAge) => (
                            <Option key={goldAge.GoldAgeID} value={goldAge.GoldAgeID}>
                                {goldAge.GoldAgeID}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Trọng lượng vàng:</label>
                <InputNumber  placeholder="Nhập trọng lượng vàng" style={{ width: '100%' }} min={1} max={99} onChange={(value) => setGoldWeight(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Giá vàng:</label>
                <InputNumber  placeholder="Nhập trọng giá vàng" style={{ width: '100%' }} min={1} max={1000000000} onChange={(value) => setGoldPrice(value)} />
            </div>
        </Modal>
    );
};

export default GoldCreateModal;
