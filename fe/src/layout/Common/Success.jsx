import React from 'react';
import { Button, Result } from 'antd';
const Success = () => (
    <Result
        status="success"
        title={<span style={{ color: 'white' }}>Thanh toán thành công!</span>}
        subTitle={<span style={{ color: 'white' }}>Cảm ơn bạn đã tin dùng dịch vụ của chúng tôi.</span>}
        extra={[
            <a href='/Profile'><Button key="buy">Xem thông tin</Button></a>,
        ]}
    />
);
export default Success;