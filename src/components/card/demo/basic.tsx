import React from 'react';
import Card from '..';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 20 }}>
      {/* 基础卡片 */}
      <Card title="基础卡片" extra={<a href="#">更多</a>} style={{ width: 300 }}>
        <p>这是卡片内容</p>
        <p>这是卡片内容</p>
        <p>这是卡片内容</p>
      </Card>

      {/* 无边框卡片 */}
      <div style={{ background: '#f0f0f0', padding: 20 }}>
        <Card title="无边框卡片" bordered={false} style={{ width: 300 }}>
          <p>这是卡片内容</p>
          <p>这是卡片内容</p>
          <p>这是卡片内容</p>
        </Card>
      </div>

      {/* 悬浮效果卡片 */}
      <Card 
        title="悬浮效果卡片" 
        hoverable 
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Card.Meta 
          title="Europe Street Beat" 
          description="www.instagram.com" 
        />
      </Card>

      {/* 带操作的卡片 */}
      <Card
        title="带操作的卡片"
        style={{ width: 300 }}
        actions={[
          <a key="edit">编辑</a>,
          <a key="setting">设置</a>,
          <a key="more">更多</a>
        ]}
      >
        <p>这是卡片内容</p>
        <p>这是卡片内容</p>
        <p>这是卡片内容</p>
      </Card>

      {/* 小尺寸卡片 */}
      <Card title="小尺寸卡片" size="small" style={{ width: 300 }}>
        <p>这是卡片内容</p>
        <p>这是卡片内容</p>
        <p>这是卡片内容</p>
      </Card>
    </div>
  );
};

export default App;