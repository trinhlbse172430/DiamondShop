import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './Account.css';
import useAuth from "../../hooks/useAuth";
import { useEffect } from 'react';
import axios from 'axios';

const user = {
    name: 'Sofia Rivers',
    avatar: '/assets/avatar.png',
    jobTitle: 'Senior Developer',
    country: 'USA',
    city: 'Los Angeles',
    timezone: 'GTM-7',
};

export function AccountInfo() {

    const [Point, setPoint] = React.useState(0);
    const context = useAuth();

    const { auth } = context;

    const loadPoint = async () => {
        const response = await axios.get(`/customer/${auth.id}`);
        setPoint(response.data.CusPoint);
    }

    useEffect(() => {
        if (auth.id) {
            loadPoint();
        }
    }, [auth.id]);

    return (
        <Card>
            <CardContent >
                <Stack spacing={2} sx={{ alignItems: 'center' }}>
                    <div>
                        <Avatar src={auth.fullname} sx={{ height: '80px', width: '80px' }} />
                    </div>
                    <Stack spacing={1} sx={{ textAlign: 'center' }}>
                        <Typography variant="h5">{auth.fullname}</Typography>
                        <Typography color="text.secondary" variant="body2">
                            khách hàng
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                            {auth.phone}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
            <Divider />
            <CardActions className="gradient-custom" sx={{ paddingBottom: "40px", paddingTop: "20px" }}>
                <Typography variant="h3" style={{ textAlign: 'center', marginTop: '20px', color: '#ffffff' }}>
                    {Point} Point
                </Typography>
            </CardActions>
        </Card>
    );
}