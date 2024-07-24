import * as React from "react";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
//MUI
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    createTheme,
    ThemeProvider,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Background from "../../image/back.jpg";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button as AntButton, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";

// import GoogleLogin from "react-google-login";
import styled from "styled-components";

const defaultTheme = createTheme();


const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const ForgotPassword = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [email, setEmail] = useState("");

    const context = useAuth();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    //change password
    const changePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/customer/forgot-password", {
                email: email,
            });
            if (res) {
                openNotificationWithIcon('success', 'Email đã được gửi, vui lòng kiểm tra hộp thư của bạn');
            } else {
                openNotificationWithIcon('error', 'Email không tồn tại');
            }
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', 'Email không tồn tại');
        }
    };



    //ant notify
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            {contextHolder}
            <Grid
                container
                component="main"
                sx={{
                    height: "100vh",
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "dark"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: '#2a2a2a' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Link href="/">
                            <Box sx={{ xs: 1, zIndex: "1" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img src={'https://daokimcuong.vn/wp-content/uploads/2021/05/logo1-removebg-preview-1.png'} alt="" style={{ maxWidth: "30%" }} />
                                </Box>
                            </Box>
                        </Link>

                        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: '#ffffff' }}>
                            Đặt lại mật khẩu
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            sx={{
                                width: "70%",
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
                                Xác nhận email
                            </Typography>
                            <Input placeholder="email" prefix={<UserOutlined />} onChange={(e) => setEmail(e.target.value)} />
                            <Button
                                color="warning"
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={changePassword}
                                sx={{ mt: 3, mb: 3, py: 1.5 }}
                            >
                                Đặt lại mật khẩu
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <StyledNavLink to="/sign-in" variant="body2">
                                        Đăng nhập
                                    </StyledNavLink>
                                </Grid>
                                <Grid item>
                                    <StyledNavLink to="/sign-up" variant="body2">
                                        {"Đăng ký tài khoản"}
                                    </StyledNavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default ForgotPassword;
