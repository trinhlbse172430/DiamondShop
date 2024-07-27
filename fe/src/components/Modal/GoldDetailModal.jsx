import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import { notification } from 'antd';

const { Option } = Select;

const GoldDetailModal = ({ visible, onCreate, onCancel, dataDetail }) => {
    const [GoldTypeID, setGoldTypeID] = useState(null);
    const [GoldAgeID, setGoldAgeID] = useState(null);
    const [GoldWeight, setGoldWeight] = useState(1);
    const [GoldTypeList, setGoldTypeList] = useState([]);
    const [GoldAgeList, setGoldAgeList] = useState([]);

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
    const handleCreate = async () => {
        //check if all fields are filled
        if (!GoldTypeID || !GoldAgeID || !GoldWeight) {
            openNotificationWithIcon('error', 'Please fill all fields');
            return;
        }
        //check GoldID existed else continue
        const GoldID = GoldTypeID + GoldAgeID;
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

        //create gold
        let weight = GoldWeight.toString();
        //if number 1 -> 01
        if (weight.length === 1) {
            weight = '0' + weight;
        }
        try {
            axios.post(`/gold`, {
                GoldID: GoldTypeID + GoldAgeID + weight,
                GoldTypeID,
                GoldAgeID,
                GoldWeight,
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
            title="Thông tin chi tiết"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleCreate}
            footer={null}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Mã vàng: {dataDetail.GoldID}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Loại vàng: {dataDetail.GoldTypeID}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Mã tuổi vàng: {dataDetail.GoldAgeID}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Trọng lượng vàng: {dataDetail.GoldWeight}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Hình ảnh:</label>

                <img
                    src={dataDetail.GoldPicture}
                    alt="Ảnh sản phẩm"
                    style={{ maxWidth: "100%" }}
                />

            </div>
        </Modal>
    );
};

export default GoldDetailModal;
