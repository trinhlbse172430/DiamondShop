import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button as antButton, Menu } from 'antd';

//item in menu
const items = [
    {
        key: '1',
        icon: <PieChartOutlined />,
        label: 'TRANG CHỦ',
    },
    {
        key: 'sub1',
        label: 'TRANG SỨC KIM CƯƠNG',
        icon: <MailOutlined />,
        children: [
            {
                key: '11',
                label: 'NHẪN KIM CƯƠNG',
                children: [
                    {
                        key: '',
                        label: 'NHẪN KIM CƯƠNG NAM',
                    },
                    {
                        key: '12',
                        label: 'NHẪN KIM CƯƠNG NỮ',
                    },
                ],
            },
            {
                key: '12',
                label: 'BÔNG TAI KIM CƯƠNG',
            },
            {
                key: '13',
                label: 'MẶT DÂY CHUYỂN KIM CƯƠNG',
            },
            {
                key: '14',
                label: 'VÒNG TAY KIM CƯƠNG',
            },
            {
                key: 'sub3',
                label: 'VỎ NHẪN KIM CƯƠNG',
                children: [
                    {
                        key: '11',
                        label: 'VỎ NHẪN KIM CƯƠNG NAM',
                    },
                    {
                        key: '12',
                        label: 'VỎ NHẪN KIM CƯƠNG NỮ',
                    },
                ],
            },
            {
                key: '15',
                label: 'MẶT DÂY CHUYỂN KIM CƯƠNG',
            },
        ],
    },
    {
        key: 'sub2',
        label: 'TRANG SỨC CƯỚI',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: '9',
                label: 'NHẪN CƯỚI KIM CƯƠNG',
            },
            {
                key: '10',
                label: 'NHẪN KIM CƯƠNG CẦU HÔN',
            }
        ],
    },
    {
        key: '6',
        icon: <PieChartOutlined />,
        label: 'BẢNG GIÁ KIM CƯƠNG',
    },
    {
        key: '2',
        icon: <PieChartOutlined />,
        label: 'KIẾN THỨC TRAGN SỨC',
    },
    {
        key: '3',
        icon: <PieChartOutlined />,
        label: 'KIẾN THỨC KIM CƯƠNG',
    },
    {
        key: '4',
        icon: <PieChartOutlined />,
        label: 'GIỚI THIỆU',
    },
    {
        key: '5',
        icon: <PieChartOutlined />,
        label: 'LIÊN HỆ',
    },
];

export default function SlideBarMenu(props) {
    const { openProp, setOpenProp } = props;
    const [collapsed, setCollapsed] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpenProp(newOpen);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const DrawerList = (
        <div
            style={{
                width: 256,
            }}
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                style={{ background: 'black', color: 'white' }}
            >
            </Menu>
        </div>
    );

    return (
        <div>
            <Drawer open={openProp} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}