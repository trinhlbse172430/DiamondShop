import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import { Input as MuiInput } from "@mui/material";
import { notification } from 'antd';

const { Option } = Select;

const EmployeeUpdateModal = ({ visible, onCreate, onCancel, data }) => {
    const [goldList, setGoldList] = useState([]);
    const [diamondList, setDiamondList] = useState([]);
    const [smallDiamondList, setSmallDiamondList] = useState([]);
    const [proTypeList, setProTypeList] = useState([]);
    const [proTypeId, setProTypeId] = useState(null);
    const [goldId, setGoldId] = useState(null);
    const [diamondId, setDiamondId] = useState(null);
    const [smallDiamondId, setSmallDiamondId] = useState(null);
    const [smallDiamondQuantity, setSmallDiamondQuantity] = useState(0);
    const [wagePrice, setWagePrice] = useState(0);
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState(null);
    const [Ration, setRation] = useState(null);

    const loadGoldList = async () => {
        try {
            const response = await axios.get(`/gold`);
            setGoldList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadDiamondList = async () => {
        try {
            const response = await axios.get(`/diamond`);
            setDiamondList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadSmallDiamondList = async () => {
        try {
            const response = await axios.get(`/diamond_small`);
            setSmallDiamondList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadProTypeList = async () => {
        try {
            const response = await axios.get(`/proType`);
            setProTypeList(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (data) {
            setProTypeId(data.ProTypeID);
            setGoldId(data.GoldID);
            setDiamondId(data.DiamondID);
            setSmallDiamondId(data.DiamondSmallID);
            setSmallDiamondQuantity(data.DiaSmallQuantity);
            setWagePrice(data.WagePrice);
            setImage(data.ProPicture);
            setProductName(data.ProName);
            setRation(data.Ration);
        }
    }, [data]);

    useEffect(() => {
        loadGoldList();
        loadDiamondList();
        loadSmallDiamondList();
        loadProTypeList();
    }, []);

    const handleUpdateProduct = (imagePath) => {
        try {
            axios.put(`/product/${data.ProductID}`, {
                ProTypeID: proTypeId,
                GoldID: goldId,
                DiamondID: diamondId,
                DiaSmallID: smallDiamondId,
                DiaSmallQuantity: smallDiamondQuantity,
                WagePrice: wagePrice,
                ProPicture: imagePath,
                ProName: productName,
                Ration: Ration
            }).then((response) => {
                console.log(response);
                openNotificationWithIcon('success', 'Update product successfully');
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log("Kiểm tra image: ", e.target.files);
    };

    const handleUpLoadImage = async () => {
        try {
            if (image) {
                const formData = new FormData();
                formData.append("image", image);
                const response = await axios.post(
                    `/product/upload`,
                    formData
                );
                const maxSize = 1024 * 1024;
                if (image.size > maxSize) {
                    openNotificationWithIcon('error', 'Error: Image size must be less than 1MB');
                } else {
                    // console.log("Response data:", response.data.image);
                    const imagePath = response.data.image;

                    if (imagePath) {
                        // console.log("Đã tải ảnh lên:", imagePath);
                        handleUpdateProduct(imagePath);
                    } else {
                        // console.log("Lỗi: Không có đường dẫn ảnh sau khi tải lên.");
                        openNotificationWithIcon('error', 'Error: No image path after upload');
                    }
                }
            } else {
                // console.log("Vui lòng chọn ảnh trước khi tải lên.");
                openNotificationWithIcon('error', 'Error: Please select an image before uploading');
            }
        } catch (error) {
            console.error("Lỗi khi tải ảnh lên:", error);
        }
    };

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
            title="Cập nhật sản phẩm"
            okText="Cập nhật"
            cancelText="Huỷ"
            onCancel={onCancel}
            onOk={handleUpLoadImage}
        >
            {contextHolder}

            <div style={{ marginBottom: 16 }}>
                <label>Loại sản phẩm:</label>
                {proTypeList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn loại sản phẩm"
                        onChange={(value) => setProTypeId(value)}
                        value={proTypeId}
                    >
                        {proTypeList.map((proType) => (
                            <Option key={proType.ProTypeID} value={proType.ProTypeID}>
                                {proType.ProTypeName}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Tên sản phẩm:</label>
                <Input placeholder="Tên sản phẩm" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Mã vàng:</label>
                {goldList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn mã vàng"
                        onChange={(value) => setGoldId(value)}
                        value={goldId}
                    >
                        {goldList.map((gold) => (
                            <Option key={gold.GoldID} value={gold.GoldID}>
                                {gold.GoldName}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Mã kim cương:</label>
                {diamondList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn mã kim cương"
                        onChange={(value) => setDiamondId(value)}
                        value={diamondId}
                    >
                        {diamondList.map((diamond) => (
                            <Option key={diamond.DiamondID} value={diamond.DiamondID}>
                                {diamond.DiamondName}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Mã kim cương tấm:</label>
                {smallDiamondList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn mã kim cương tấm"
                        onChange={(value) => setSmallDiamondId(value)}
                        value={smallDiamondId}
                    >
                        {smallDiamondList.map((diamond) => (
                            <Option key={diamond.DiaSmallID} value={diamond.DiaSmallID}>
                                {diamond.DiaSmallID}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Số lượng kim cương tấm:</label>
                <InputNumber style={{ width: '100%' }} min={1} max={100} value={smallDiamondQuantity} onChange={(value) => setSmallDiamondQuantity(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Tiền công:</label>
                <InputNumber style={{ width: '100%' }} min={1} value={parseFloat(wagePrice)} onChange={(value) => setWagePrice(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Tỉ lệ áp giá:</label>
                <InputNumber style={{ width: '100%' }} min={1} max={100} value={Ration} onChange={(value) => setRation(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Hình sản phẩm:</label>
                <MuiInput
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    onChange={handleImageChange}
                    style={{ marginBottom: "1rem" }}
                />
                {image && (
                    <img
                        src={image instanceof File ? URL.createObjectURL(image) : image}
                        alt="Ảnh sản phẩm"
                        style={{ maxWidth: "100%" }}
                    />
                )}
            </div>
        </Modal>
    );
};

export default EmployeeUpdateModal;
