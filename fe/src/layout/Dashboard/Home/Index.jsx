// material-ui

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from './MainCard';
import AnalyticEcommerce from './AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import UniqueVisitorCard from './UniqueVisitorCard';

import axios from 'axios';
import { useEffect, useState } from 'react';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const numberToVND = (number) => {
    //check if number is string
    if (typeof number === 'string') {
        number = parseInt(number);
    }
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

export default function DashboardDefault() {
    const [countCustomer, setCountCustomer] = useState(0);
    const [countOrder, setCountOrder] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [countOrderCancel, setCountOrderCancel] = useState(0);
    const [orderData, setOrderData] = useState([]);
    const [incomeByMonth, setIncomeByMonth] = useState([]);

    //load customer
    const loadCustomer = async () => {
        try {
            const response = await axios.get(`/customer`);
            setCountCustomer(response.data.length);

        } catch (error) {
            console.error(error);
        }
    }

    const loadIncomeByMonth = () => {
        const incomeByMonth = Array(12).fill(0);
        orderData.forEach((order) => {
            const month = new Date(order.SaleDate).getMonth();
            incomeByMonth[month] += Number(order.TotalPrice);
        });
        console.log(incomeByMonth);
        // get recent month by number like 1 2 3 4 
        let monthString = new Date().getMonth();
        setIncomeByMonth(incomeByMonth[monthString]);
        console.log(incomeByMonth[monthString]);

    }

    const loadOrder = async () => {
        try {
            const order = await axios.get(`/order`);
            setOrderData(order.data);
            const response = await axios.get(`/orderByMonth`);
            //get recent month
            let monthString = new Date().toLocaleString('default', { month: 'long' });
            switch (monthString) {
                case 'January':
                    monthString = 'month 1';
                    break;
                case 'February':
                    monthString = 'month 2';
                    break;
                case 'March':
                    monthString = 'month 3';
                    break;
                case 'April':
                    monthString = 'month 4';
                    break;
                case 'May':
                    monthString = 'month 5';
                    break;
                case 'June':
                    monthString = 'month 6';
                    break;
                case 'July':
                    monthString = 'month 7';
                    break;
                case 'August':
                    monthString = 'month 8';
                    break;
                case 'September':
                    monthString = 'month 9';
                    break;
                case 'October':
                    monthString = 'month 10';
                    break;
                case 'November':
                    monthString = 'month 11';
                    break;
                case 'December':
                    monthString = 'month 12';
                    break;
                default:
                    break;
            }

            //get response that month == monthString
            const countOrder = response.data.find((order) => order.month === monthString);
            setCountOrder(countOrder.count);


            //count order status = 4
            let count = 0;
            response.data.forEach((order) => {
                if (order.OrdStatus === 4) {
                    count++;
                }
            });
            setCountOrderCancel(count);
            //total TotalPrice
            let total = 0;
            response.data.forEach((order) => {
                total += Number(order.TotalPrice);
            });
            setTotalIncome(total);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadCustomer();
        loadOrder();
    }, []);

    useEffect(() => {
        loadIncomeByMonth();
    }, [orderData]);


    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <Grid container rowSpacing={6} columnSpacing={4.5} sx={{}}>
                {/* row 1 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Số lượng khách hàng" count={countCustomer} extra="8,900" unit="khách hàng" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Tổng doanh thu tháng này" count={numberToVND(incomeByMonth)} isLoss color="warning" extra="$20,395" unit="VND" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Số lượng đơn hàng tháng này" count={countOrder} extra="356" unit="order" />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Lượng đơn hàng hủy" count={countOrderCancel} isLoss color="warning" extra="1,943" unit="order" />
                </Grid>


                <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                {/* row 2 */}
                <Grid item xs={12} md={12} lg={12}>
                    <UniqueVisitorCard />
                </Grid>

                {/* <Grid item xs={12} md={5} lg={4}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Income Overview</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <Box sx={{ p: 3, pb: 0 }}>
                            <Stack spacing={2}>
                                <Typography variant="h6" color="text.secondary">
                                    This Week Statistics
                                </Typography>
                                <Typography variant="h3">7,000,650 VND</Typography>
                            </Stack>
                        </Box>
                        <MonthlyBarChart />
                    </MainCard>
                </Grid> */}

            </Grid>
        </div>
    );
}