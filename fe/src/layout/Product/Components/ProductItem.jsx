
import {

    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link as RouterLink, useParams, useLocation } from "react-router-dom";
import '../css/product.css'
import axios from "axios";
import { useEffect, useState } from "react";

const numberToVND = (number) => {
    //convert string to number
    number = Number(number);

    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};


export default function ProductItem({ product }) {
    const [gold, setGold] = useState(null);
    const [diamond, setDiamond] = useState(null);
    const [diamondSmall, setDiamondSmall] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const { ProductID } = product;

    //load gold
    const loadGold = async () => {
        try {
            const goldList = await axios.get(
                `/gold_price`
            );
            if (goldList) {
                const gold = goldList.data.find((item) => item.GoldPriceID === product.GoldID);
                setGold(gold);
            }
        } catch (error) {
            console.error("Failed to fetch gold data: ", error);
        }
    };

    //load diamond
    const loadDiamond = async () => {
        try {
            const diamondList = await axios.get(
                `/dia_price`
            );
            if (diamondList) {
                //search diamond that has same diamondID with product
                const diamond = diamondList.data.find((item) => item.DiaPriceID === product.DiamondID);
                setDiamond(diamond);
            }
        } catch (error) {
            console.error("Failed to fetch diamond data: ", error);
        }
    };

    //load diamondSmall
    const loadDiamondSmall = async () => {
        try {
            const diamondSmallList = await axios.get(
                `/dia_small_price`
            );
            if (diamondSmallList) {
                //search diamondSmall that has same diamondSmallID with product
                const diamondSmall = diamondSmallList.data.find((item) => item.DiaSmallPriceID === product.DiamondSmallID);
                setDiamondSmall(diamondSmall);
            }
        } catch (error) {
            console.error("Failed to fetch diamondSmall data: ", error);
        }
    };

    useEffect(() => {
        if (product) {
            loadGold();
            loadDiamond();
            loadDiamondSmall();
        }
    }, [product]);

    //handle total price
    useEffect(() => {
        if (product && gold && diamond && diamondSmall) {
            const goldPrice = gold.GoldPrice * gold.GoldWeight;
            const diamondPrice = diamond.DiaPrice * diamond.DiaWeight;
            const diamondSmallPrice = diamondSmall.DiaSmallPrice * diamondSmall.DiaSmallWeight;
            const total = goldPrice + diamondPrice + diamondSmallPrice + parseFloat(product.WagePrice);
            console.log(diamondSmallPrice, diamondPrice, goldPrice, parseFloat(product.WagePrice));
            setTotalPrice(total);
        }
    }
        , [product, gold, diamond, diamondSmall]);

    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
    };


    return (
        <Grid item="true" xs={4} sm={4} md={3} lg={2.4}>
            <Card className="product-card">
                <CardActionArea component={RouterLink} to={`/product/${ProductID}`} onClick={handleLinkClick}>
                    <CardContent sx={{ textAlign: "center", padding: '0 0 0 0', backgroundColor: '#2a2a2a' }}>
                        <CardMedia
                            component="img"
                            image={product ? product.ProPicture : "https://via.placeholder.com/150"}
                            //alt={}
                            style={{ padding: '9px 9px' }}
                        />
                        <Typography gutterBottom variant="h6" component="div" className="product-title">
                            {product.ProName ? product.ProName : "Product name"}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" className="product-code">
                            {product.ProductID ? product.ProductID : "Product code"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="product-price">
                            {totalPrice ? (
                                <Typography gutterBottom variant="h6" component="div" style={{ color: "#ebbc6c" }}>
                                    {numberToVND(totalPrice)}
                                </Typography>
                            ) : (
                                "Price VND"
                            )}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
};
