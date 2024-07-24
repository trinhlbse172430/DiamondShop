import React from 'react';
import { Button, Result } from 'antd';
const Fail = () => (
    <Result
        status="404"
        title={<span style={{ color: 'white' }}>Thanh toán không thành công</span>}
        subTitle={<span style={{ color: 'white' }}>Thanh toán của bạn không thành công vì hủy đơn trong lúc thanh toán hoặc server bị trục trặc, xin vui lòng thử lại</span>}
        extra={<a href='/'><Button type="primary">Back Home</Button></a>}
    />
);
export default Fail;