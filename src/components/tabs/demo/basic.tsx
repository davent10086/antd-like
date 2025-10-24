import React, { useState } from 'react';
import Tabs, { TabItem } from '..';

const BasicDemo: React.FC = () => {
    const [active, setActive] = useState('1');
    const items: TabItem[] = [
        { key: '1', label: '基础', children: <div>这里是基础内容</div> },
        { key: '2', label: '进阶', children: <div>这里是进阶内容</div> },
        { key: '3', label: '禁用', disabled: true, children: <div>禁用 Tab</div> },
    ];

    return (
        <div style={{ padding: 16 }}>
            <h3>默认（受控）</h3>
            <Tabs items={items} activeKey={active} onChange={setActive} extra={<a>更多</a>} />

            <h3 style={{ marginTop: 24 }}>非受控 + 卡片型</h3>
            <Tabs items={items} type="card" />
        </div>
    );
};

export default BasicDemo;
