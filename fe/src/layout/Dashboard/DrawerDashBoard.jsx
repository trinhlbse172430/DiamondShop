import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
// icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from '@mui/icons-material/Logout';
import SpaIcon from "@mui/icons-material/Spa";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ClassIcon from "@mui/icons-material/Class";
import useAuth from "../../hooks/useAuth";
import Logo from "../../image/logo.png";

const DrawerDashborad = () => {
    const context = useAuth();
    const navigate = useNavigate();
    const links = [
        { text: "DashBoard", path: "/dashboard/home" },
        { text: "Employee Management", path: "/dashboard/employee" },
        { text: "Customer Management", path: "/dashboard/customer" },
    ];
    const links2 = [
        { text: "Product", path: "/dashboard/product" },
        { text: "Diamond", path: "/dashboard/diamond" },
        { text: "Small Diamond", path: "/dashboard/SmallDiamond" },
        { text: "Gold", path: "/dashboard/Gold" },
    ];

    const links3 = [
        { text: "Order Manage", path: "/dashboard/order" },
    ];

    const link6 = [
        { text: "Delivery Order", path: "/dashboard/delivery" },
    ];

    const links4 = [
        { text: "Promotion", path: "/dashboard/promotion" },
    ];

    const links5 = [
        { text: "Log Out" },
    ];

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token"); // xóa token lưu trữ trong localStorage
            navigate("/sign-in-employee"); // chuyển hướng về trang đăng nhập
            toast.success("Đăng xuất thành công!");
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <a href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={Logo} alt="logo" style={{ width: "50%", height: "120%" }} />
                </a>
            </Toolbar>
            <Divider />

            {context.auth.role === "Admin" ? (
                <List>
                    <ListSubheader component="div" id="nested-list-subheader">
                        Admin
                    </ListSubheader>
                    {links.map((link, index) => (
                        <ListItem key={link.text} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={link.path}
                                sx={{
                                    "&.active": {
                                        bgcolor: "#ffb74d",
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <DashboardIcon /> : <PersonIcon />}
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                ""
            )}

            <Divider />

            {context.auth.role === "Admin" || context.auth.role === "Manager" ? (
                <List>
                    <ListSubheader component="div" id="nested-list-subheader">
                        Manager
                    </ListSubheader>
                    {links2.map((link, index) => (
                        <ListItem key={link.text} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={link.path}
                                sx={{
                                    "&.active": {
                                        bgcolor: "#ffb74d",
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <DashboardIcon />
                                    ) : (
                                        <DashboardIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                ""
            )}
            <Divider />

            {context.auth.role === "Admin" || context.auth.role === "Sale" ? (
                <List>
                    <ListSubheader component="div" id="nested-list-subheader">
                        Sale Employee
                    </ListSubheader>
                    {links3.map((link, index) => (
                        <ListItem key={link.text} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={link.path}
                                sx={{
                                    "&.active": {
                                        bgcolor: "#ffb74d",
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <DashboardIcon /> : <SpaIcon />}
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                ""
            )}

            <Divider />

            {context.auth.role === "Delivery" ? (
                <List>
                    <ListSubheader component="div" id="nested-list-subheader">
                        Delivery Employee
                    </ListSubheader>
                    {link6.map((link, index) => (
                        <ListItem key={link.text} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={link.path}
                                sx={{
                                    "&.active": {
                                        bgcolor: "#ffb74d",
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <DashboardIcon /> : <SpaIcon />}
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                ""
            )}

            <Divider />

            {context.auth.role === "Admin" || context.auth.role === "Manager" ? (
                <List>
                    <ListSubheader component="div" id="nested-list-subheader">
                        Promotion
                    </ListSubheader>
                    {links4.map((link, index) => (
                        <ListItem key={link.text} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={link.path}
                                sx={{
                                    "&.active": {
                                        bgcolor: "#efab9161",
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InventoryIcon /> : <ClassIcon />}
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                ""
            )}
            <Divider />

            <List>
                <ListSubheader component="div" id="nested-list-subheader">
                    Authen
                </ListSubheader>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            "&.active": {
                                bgcolor: "#efab9161",
                            },
                        }}
                        onClick={handleLogout}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Log out' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </>
    );
};

export default DrawerDashborad;
