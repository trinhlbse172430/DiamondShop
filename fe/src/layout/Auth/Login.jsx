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

const Login = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const context = useAuth();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);


    //handle submit
    const login = async (e) => {
        e.preventDefault();
        //check all field
        if (!data.username || !data.password) {
            openNotificationWithIcon('error', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const { username, password } = data;
        try {
            const res = await axios.post("/customer/login", { username, password }).then((res) => {
                if (res.data.error) {
                    openNotificationWithIcon('error', res.data.error);
                }
                else {
                    const dataDecode = jwtDecode(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("role", "Customer");
                    context.setAuth({
                        id: dataDecode.CustomerID,
                        fullname: dataDecode.CusName,
                        phone: dataDecode.CusPhone,
                        address: dataDecode.CusAddress,
                        token: res.data.token,
                    });
                    navigate("/");
                    openNotificationWithIcon('success', 'Đăng nhập thành công');
                }
            });
        } catch (error) {
            openNotificationWithIcon('error', 'Đăng nhập thất bại, sai tên đăng nhập hoặc mật khẩu');
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
                            Đăng nhập
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
                                Username
                            </Typography>
                            <Input placeholder="username" prefix={<UserOutlined />} onChange={(e) => setData({ ...data, username: e.target.value })} />
                            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
                                Password
                            </Typography>
                            <Input.Password
                                placeholder="password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                            <Button
                                color="warning"
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={login}
                                sx={{ mt: 3, mb: 3, py: 1.5 }}
                            >
                                Đăng nhập
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <StyledNavLink to="/forgot-password" variant="body2">
                                        Quên mật khẩu?
                                    </StyledNavLink>
                                </Grid>
                                <Grid item>
                                    <StyledNavLink to="/sign-up" variant="body2">
                                        {"Bạn chưa có tài khoản?"}
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

export default Login;
