import * as React from "react";
import { useState, useEffect } from "react";
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
import Background from "../../../image/back.jpg";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button as AntButton, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../../hooks/useAuth";

// import GoogleLogin from "react-google-login";
import styled from "styled-components";

const defaultTheme = createTheme();


const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const LoginEmp = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [roleList, setRoleList] = useState([]);

    const context = useAuth();


    //useEffect
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
        loadRoleList();
    }, []);

    // load role list
    const loadRoleList = async () => {
        try {
            const res = await axios.get("/role");
            setRoleList(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    //handle submit
    const login = async (e) => {
        e.preventDefault();
        const { username, password } = data;
        try {
            const res = await axios.post("/employee/login", { username, password }).then((res) => {
                if (res.data.error) {
                    openNotificationWithIcon('error', res.data.error);
                }
                else if (res.data.EmpStatus === 2) {
                    openNotificationWithIcon('error', 'Tài khoản của bạn đã bị khóa');
                }
                else {
                    const dataDecode = jwtDecode(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    let id = dataDecode.EmployeeID;
                    let role = roleList.find((role) => role.EmployeeID === id);
                    localStorage.setItem("role", role.RoleName);
                    context.setAuth({
                        id: dataDecode.EmployeeID,
                        fullname: dataDecode.EmpName,
                        phone: dataDecode.EmpPhone,
                        email: dataDecode.EmpGmail,
                        token: res.data.token,
                        role: role.RoleName,
                    });
                    if (role.RoleName === "Admin") {
                        navigate("/dashboard/home");
                    }
                    else if (role.RoleName === "Manager") {
                        navigate("/dashboard/product");
                    }
                    else if (role.RoleName === "Sale") {
                        navigate("/dashboard/order");
                    } else if (role.RoleName === "Delivery") {
                        navigate("/dashboard/delivery");
                    } else {
                        navigate("/");
                    }
                    openNotificationWithIcon('success', 'Đăng nhập thành công');
                }
            });
        } catch (error) {
            openNotificationWithIcon('error', 'Đăng nhập thất bại');
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
                            Employee Login
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
                                Login
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <StyledNavLink to="/reset-password" variant="body2">
                                        Forgot password?
                                    </StyledNavLink>
                                </Grid>
                                <Grid item>
                                    {/* <StyledNavLink to="/sign-up" variant="body2">
                                        {"Bạn chưa có tài khoản?"}
                                    </StyledNavLink> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default LoginEmp;
