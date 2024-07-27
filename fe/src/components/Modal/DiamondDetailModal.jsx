import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import { notification } from 'antd';
import DiaImage from '../../image/kc.png';

const { Option } = Select;

const DiamondDetailModal = ({ visible, onCreate, onCancel, dataDetail }) => {
    const [DiaOriginID, setDiaOriginID] = useState(null);
    const [DiaColorID, setDiaColorID] = useState(null);
    const [DiaWeight, setDiaWeight] = useState(1);
    const [DiaClarityID, setDiaClarityID] = useState(null);
    const [DiaOriginList, setDiaOriginList] = useState([]);
    const [DiaColorList, setDiaColorList] = useState([]);
    const [DiaClarityList, setDiaClarityList] = useState([]);
    const [DiaCut, setDiaCut] = useState('Round');
    const [DiaPrice, setDiaPrice] = useState(100000);


    const loadDiaOriginList = async () => {
        try {
            const response = await axios.get(`/dia_origin`);
            setDiaOriginList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadDiaColorList = async () => {
        try {
            const response = await axios.get(`/dia_color`);
            setDiaColorList(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const loadDiaClarityList = async () => {
        try {
            const response = await axios.get(`/dia_clarity`);
            setDiaClarityList(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        loadDiaOriginList();
        loadDiaColorList();
        loadDiaClarityList();
    }, []);

    const handleCreateDiamond = async () => {
        //check if all fields are filled
        if (!DiaOriginID || !DiaColorID || !DiaClarityID || !DiaWeight || !DiaCut || !DiaPrice) {
            openNotificationWithIcon('error', 'Please fill all fields');
            return;
        }
        //check DiaID existed else continue
        let weight = DiaWeight.toString();
        if (weight.length === 1) {
            weight = '0' + weight;
        }
        const DiaID = DiaOriginID + DiaColorID + DiaClarityID + weight;
        try {
            const response = await axios.get(`/diamond`);
            const list = response.data;

            // Check if DiaID already exists in the list
            const existingDiamond = list.find(diamond => diamond.DiamondID === DiaID);

            if (existingDiamond) {
                openNotificationWithIcon('error', 'DiamondID already exists');
                return;
            }
        } catch (error) {
            console.error(error);
        }

        //create diamond
        const GIAID = "GIA" + Date.now().toString(36).slice(-4);
        try {
            axios.post(`/diamond`, {
                DiamondID: DiaID,
                DiaOriginID,
                DiaColorID,
                DiaClarityID,
                DiaWeight,
                DiaPicture: 'picture',
                DiaUnit: 'Ly',
                DiaCut: DiaCut,
                GIAID: GIAID,
                GIAPicture: 'https://caohungdiamond.com/wp-content/uploads/2023/06/bang-gia-kim-cuong-xac-nhan-GIA.jpg'
            }).then((response) => {
                openNotificationWithIcon('success', 'Create diamond successfully');
                console.log(response);
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }
        try {
            axios.post(`/dia_price`, {
                DiaPriceID: DiaID,
                DiaInputDate: moment().format('YYYY-MM-DD'),
                DiaOriginID,
                DiaWeight,
                DiaUnit: 'Ly',
                DiaColorID,
                DiaClarityID,
                DiaPrice: DiaPrice,
                Currency: 'VND'
            }).then((response) => {
                console.log(response);
            }
            );
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
            title="Tạo mới kim cương"
            okText="Tạo mới"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleCreateDiamond}
            footer={null}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Mã kim cương: {dataDetail.DiamondID}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Mã GIA: {dataDetail.GIAID}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Trọng lương kim cương: {dataDetail.DiaWeight}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Hình dáng kim cương: {dataDetail.DiaCut}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Hình ảnh:</label>

                <img
                    src={DiaImage}
                    alt="Ảnh sản phẩm"
                    style={{ maxWidth: "100%" }}
                />

            </div>
        </Modal>
    );
};

export default DiamondDetailModal;
