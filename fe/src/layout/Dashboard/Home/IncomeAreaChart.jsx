import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import axios from 'axios';

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart({ slot }) {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    const [orderData, setOrderData] = useState([]);
    const [incomeByMonth, setIncomeByMonth] = useState([]);
    const [incomeByWeek, setIncomeByWeek] = useState([]);
    const [numberOrderByMonth, setNumberOrderByMonth] = useState([]);
    const [numberOrderByWeek, setNumberOrderByWeek] = useState([]);

    const loadOrder = async () => {
        try {
            const response = await axios.get(`/order`);
            setOrderData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadOrder();
    }, []);

    const loadIncomeByMonth = () => {
        const incomeByMonth = Array(12).fill(0);
        orderData.forEach((order) => {
            const month = new Date(order.SaleDate).getMonth();
            incomeByMonth[month] += Number(order.TotalPrice);
            setIncomeByMonth(incomeByMonth);
        });
    }

    const loadIncomeByWeek = () => {
        const incomeByWeek = Array(7).fill(0);
        orderData.forEach((order) => {
            const day = new Date(order.SaleDate).getDay();
            incomeByWeek[day] += Number(order.TotalPrice);
            setIncomeByWeek(incomeByWeek);
        });
    }

    const loadNumberOrderByMonth = () => {
        const numberOrderByMonth = Array(12).fill(0);
        orderData.forEach((order) => {
            const month = new Date(order.SaleDate).getMonth();
            numberOrderByMonth[month] += 1;
            setNumberOrderByMonth(numberOrderByMonth);
        });
    }

    const loadNumberOrderByWeek = () => {
        const numberOrderByWeek = Array(7).fill(0);
        orderData.forEach((order) => {
            const day = new Date(order.SaleDate).getDay();
            numberOrderByWeek[day] += 1;
            setNumberOrderByWeek(numberOrderByWeek);
        });
    }

    useEffect(() => {
        loadIncomeByMonth();
        loadIncomeByWeek();
        loadNumberOrderByMonth();
        loadNumberOrderByWeek();
    }, [orderData]);


    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[700]],
            xaxis: {
                categories:
                    slot === 'month'
                        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary
                        ]
                    }
                },
                axisBorder: {
                    show: true,
                    color: line
                },
                tickAmount: slot === 'month' ? 11 : 7
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            }
        }));
    }, [primary, secondary, line, theme, slot]);

    const [series, setSeries] = useState([
        {
            name: 'Page Views',
            data: [0, 86, 28, 115, 48, 210, 136]
        },
        {
            name: 'Sessions',
            data: [0, 43, 14, 56, 24, 105, 68]
        }
    ]);



    useEffect(() => {
        setSeries([
            {
                name: 'Income',
                data: slot === 'month' ? incomeByMonth : incomeByWeek
            },
            {
                name: 'Orders',
                data: slot === 'month' ? numberOrderByMonth : numberOrderByWeek
            }
        ]);
    }, [slot]);

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

IncomeAreaChart.propTypes = { slot: PropTypes.string };