import React from 'react';
import Flex from '../index';

const Demo: React.FC = () => {
    return (
        <div style={{ padding: 16 }}>
            <h3>基础横向布局（gap=8）</h3>
            <Flex gap={8} align="center">
                <div style={{ background: '#1677ff', color: '#fff', padding: '8px 12px', borderRadius: 4 }}>A</div>
                <div style={{ background: '#52c41a', color: '#fff', padding: '8px 12px', borderRadius: 4 }}>B</div>
                <div style={{ background: '#faad14', color: '#fff', padding: '8px 12px', borderRadius: 4 }}>C</div>
            </Flex>

            <h3 style={{ marginTop: 24 }}>两端对齐</h3>
            <Flex justify="space-between" align="center" style={{ background: '#fff', padding: 12, border: '1px solid #f0f0f0' }}>
                <div>左</div>
                <div>中</div>
                <div>右</div>
            </Flex>

            <h3 style={{ marginTop: 24 }}>纵向布局 + Flex.Item 拉伸</h3>
            <Flex direction="column" gap={12} style={{ background: '#fff', padding: 12, border: '1px solid #f0f0f0' }}>
                <Flex.Item flex={1}>
                    <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>块 1（flex=1）</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>块 2</div>
                </Flex.Item>
            </Flex>

            <h3 style={{ marginTop: 24 }}>换行布局（wrap）</h3>
            <Flex wrap gap={8} style={{ maxWidth: 320 }}>
                {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} style={{ background: '#e6f4ff', padding: '8px 12px', borderRadius: 4 }}>Item {i + 1}</div>
                ))}
            </Flex>
        </div>
    );
};

export default Demo;
