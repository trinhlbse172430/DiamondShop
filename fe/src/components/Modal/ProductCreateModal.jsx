import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import { notification } from 'antd';
import { Rating } from '@mui/material';
import { Input as MuiInput } from "@mui/material";



const { Option } = Select;

const ProductCreateModal = ({ visible, onCreate, onCancel }) => {
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
    const [productName, setProductName] = useState("");
    const [image, setImage] = useState(null);
    const [ration, setRation] = useState(100);

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

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log("Kiểm tra image: ", e.target.files);
    };

    useEffect(() => {
        console.log('img: ', image)
    }, [image])

    useEffect(() => {
        if (visible) {
            setProTypeId(null);
            setGoldId(null);
            setDiamondId(null);
            setSmallDiamondId(null);
            setProductName("");
            setSmallDiamondQuantity(1);
            setWagePrice(1);
            setRation(100);
            setImage(null);
        }
    }, [visible]);

    useEffect(() => {
        loadGoldList();
        loadDiamondList();
        loadSmallDiamondList();
        loadProTypeList();
    }, []);

    

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
                        handleCreateProduct(imagePath);
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

    const handleCreateProduct = (productImage) => {
        //check all input
        if (!proTypeId || !goldId || !diamondId || !smallDiamondId || !smallDiamondQuantity || !wagePrice) {
            alert("Please fill all fields");
            return;
        }
        let ProductIdNumber = 0;
        let ProductID = "";
        try {
            axios.get(`/product`).then((response) => {
                if (response.data.length === 0) {
                    ProductID = "PT001";
                    ProductIdNumber = 1;
                } else {
                    ProductIdNumber = parseInt(response.data[response.data.length - 1].ProductID.slice(3)) + 1;
                    if (ProductIdNumber < 10) {
                        ProductID = "PT00" + ProductIdNumber;
                    } else if (ProductIdNumber < 100) {
                        ProductID = "PT0" + ProductIdNumber;
                    } else {
                        ProductID = "PT" + ProductIdNumber;
                    }
                }
                axios.post(`/product`, {
                    ProductID: ProductID,
                    ProTypeID: proTypeId,
                    GoldID: goldId,
                    DiamondID: diamondId,
                    DiamondSmallID: smallDiamondId,
                    DiaSmallQuantity: smallDiamondQuantity,
                    WagePrice: wagePrice.toString(),
                    Currency: "VND",
                    ProName: productName,
                    Ration: ration,
                    ProPicture: productImage,
                }).then((response) => {
                    console.log(response);
                    openNotificationWithIcon('success', 'Create product successfully');
                    onCreate();
                });
            });
        } catch (error) {
            console.log(error);
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
            title="Create Product"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleUpLoadImage}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>ProType:</label>
                {proTypeList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select proType"
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
                <label>Product Name:</label>
                <Input placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Gold:</label>
                {goldList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select gold"
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
                <label>Diamond:</label>
                {diamondList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select diamond"
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
                <label>Small Diamond:</label>
                {smallDiamondList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select diamond"
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
                <label>Small Diamond Quantity:</label>
                <InputNumber style={{ width: '100%' }} min={1} max={100} defaultValue={1} onChange={(value) => setSmallDiamondQuantity(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Wage Price:</label>
                <InputNumber style={{ width: '100%' }} min={1} defaultValue={1} onChange={(value) => setWagePrice(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Ration:</label>
                <InputNumber style={{ width: '100%' }} min={1} max={100} defaultValue={100} onChange={(value) => setRation(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Product Image:</label>
                <MuiInput
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    onChange={handleImageChange}
                    style={{ marginBottom: "1rem" }}
                />
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Ảnh sản phẩm"
                        style={{ maxWidth: "100%" }}
                    />
                )}
            </div>
        </Modal>
    );
};

export default ProductCreateModal;
