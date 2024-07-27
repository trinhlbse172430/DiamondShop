import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import { notification } from 'antd';

const { Option } = Select;

const DiamondCreateModal = ({ visible, onCreate, onCancel }) => {
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
        if (!DiaOriginID || !DiaColorID || !DiaWeight || !DiaPrice) {
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
            title="Tạo mới kim cương tấm"
            okText="Tạo mới"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleCreateDiamond}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Nguồn gốc kim cương tấm:</label>
                {DiaOriginList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn nguồn gốc kim cương"
                        onChange={(value) => setDiaOriginID(value)}
                        value={DiaOriginID}
                    >
                        {DiaOriginList.map((diaOrigin) => (
                            <Option key={diaOrigin.DiaOriginID} value={diaOrigin.DiaOriginID}>
                                {diaOrigin.DiaOriginName} : {diaOrigin.DiaOriginID}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Màu sắc kim cương tấm:</label>
                {DiaColorList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn màu sắc kim cương"
                        onChange={(value) => setDiaColorID(value)}
                        value={DiaColorID}
                    >
                        {DiaColorList.map((diaColor) => (
                            <Option key={diaColor.DiaColorID} value={diaColor.DiaColorID}>
                                {diaColor.DiaColorName} : {diaColor.DiaColorID}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Trọng lượng kim cương tấm:</label>
                <InputNumber placeholder="Nhập trọng lượng kim cương tấm" style={{ width: '100%' }} min={1} max={20} onChange={(value) => setDiaWeight(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Giá kim cương tấm:</label>
                <InputNumber placeholder="Nhập giá kim cương tấm" style={{ width: '100%' }} min={1} max={1000000000} onChange={(value) => setDiaPrice(value)} />
            </div>
        </Modal>
    );
};

export default DiamondCreateModal;
