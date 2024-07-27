import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import { notification } from 'antd';
import DiaImage from '../../image/kc.png';

const { Option } = Select;

const SmallDiamondDetailModal = ({ visible, onCreate, onCancel, dataDetail }) => {
    const [DiaOriginID, setDiaOriginID] = useState(null);
    const [DiaColorID, setDiaColorID] = useState(null);
    const [DiaWeight, setDiaWeight] = useState(1);
    const [DiaOriginList, setDiaOriginList] = useState([]);
    const [DiaColorList, setDiaColorList] = useState([]);
    const [DiaPrice, setDiaPrice] = useState(100000);

    useEffect(() => {
        if (visible) {
            setDiaOriginID(null);
            setDiaColorID(null);
            setDiaWeight(1);
        }
    }, [visible]);

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

    useEffect(() => {
        loadDiaOriginList();
        loadDiaColorList();
    }, []);

    const handleCreateDiamond = async () => {
        //check if all fields are filled
        if (!DiaOriginID || !DiaColorID || !DiaWeight) {
            openNotificationWithIcon('error', 'Please fill all fields');
            return;
        }
        //check DiaID existed else continue

        let weight = DiaWeight.toString();
        if (DiaWeight < 10) {
            weight = '0' + DiaWeight;
        }
        let DiaID = DiaOriginID + DiaColorID + weight; //+'LY'
        try {
            const response = await axios.get(`/diamond_small`);
            const list = response.data;

            // Check if DiaID already exists in the list
            const existingDiamond = list.find(diamond_small => diamond_small.DiaSmallID === DiaID);

            if (existingDiamond) {
                openNotificationWithIcon('error', 'DiaSmall already exists');
                return;
            }
        } catch (error) {
            console.error(error);
        }

        //create diamond
        try {
            axios.post(`/diamond_small`, {
                DiaSmallID: DiaID,
                DiaSmallOriginID: DiaOriginID,
                DiaSmallColorID: DiaColorID,
                DiaSmallWeight: DiaWeight,
                DiaSmallPicture: 'picture',
                DiaSmallUnit: 'Ly',
            }).then((response) => {
                openNotificationWithIcon('success', 'Create diamond successfully');
                console.log(response);
                onCreate();
            });

            axios.post(`/dia_small_price`, {
                DiaSmallPriceID: DiaID,
                DiaSmallPrice: DiaPrice,
                DiaSmallInputDate: moment().format('YYYY-MM-DD'),
                DiaSmallOriginID: DiaOriginID,
                DiaSmallColorID: DiaColorID,
                DiaSmallWeight: DiaWeight,
                DiaSmallUnit: 'Ly',
                Currency: 'VND'

            }).then((response) => {
                console.log(response);
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
            title="Thông tin chi tiết kim cương tấm"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleCreateDiamond}
            footer={null}
        //disable 2 button 
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Mã kim cương tấm: {dataDetail.DiaSmallID}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Trọng lượng kim cương: {dataDetail.DiaSmallWeight}</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Mã nguồn gốc kim cương: {dataDetail.DiaSmallOriginID}</label>
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

export default SmallDiamondDetailModal;
