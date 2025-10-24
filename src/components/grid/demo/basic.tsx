import React from 'react';
import { Row, Col } from '..';

const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ background: '#1677ff22', padding: 8, textAlign: 'center', borderRadius: 4 }}>{children}</div>
);

const BasicGridDemo: React.FC = () => {
    return (
        <div style={{ padding: 16 }}>
            <h3>基本栅格</h3>
            <Row gutter={16}>
                <Col span={12}><Box>span=12</Box></Col>
                <Col span={12}><Box>span=12</Box></Col>
            </Row>

            <h3 style={{ marginTop: 24 }}>组合</h3>
            <Row gutter={[16, 16]}>
                <Col span={8}><Box>8</Box></Col>
                <Col span={8}><Box>8</Box></Col>
                <Col span={8}><Box>8</Box></Col>
            </Row>

            <h3 style={{ marginTop: 24 }}>偏移</h3>
            <Row gutter={16}>
                <Col span={6} offset={6}><Box>6 offset 6</Box></Col>
                <Col span={6}><Box>6</Box></Col>
            </Row>

            <h3 style={{ marginTop: 24 }}>响应式</h3>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}><Box>xs=24 md=12</Box></Col>
                <Col xs={24} md={12}><Box>xs=24 md=12</Box></Col>
            </Row>
        </div>
    );
};

export default BasicGridDemo;
