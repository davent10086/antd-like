import React from 'react';
import Card from '..';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 20 }}>
      {/* 基础卡片 */}
      <div style={{ width: 300 }}>
        <Card title="基础卡片" extra={<a href="#">更多</a>}>
          <p>这是卡片内容</p>
          <p>这是卡片内容</p>
          <p>这是卡片内容</p>
        </Card>
      </div>

      {/* 无边框卡片 */}
      <div style={{ background: '#f0f0f0', padding: 20 }}>
        <div style={{ width: 300 }}>
          <Card title="无边框卡片" bordered={false}>
            <p>这是卡片内容</p>
            <p>这是卡片内容</p>
            <p>这是卡片内容</p>
          </Card>
        </div>
      </div>

      {/* 悬浮效果卡片 */}
      <div style={{ width: 300 }}>
        <Card
          title="悬浮效果卡片"
          hoverable
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
      </div>

      {/* 带操作的卡片 */}
      <div style={{ width: 300 }}>
        <Card
          title="带操作的卡片"
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
      </div>

      {/* 小尺寸卡片 */}
      <div style={{ width: 300 }}>
        <Card title="小尺寸卡片" size="small">
          <p>这是卡片内容</p>
          <p>这是卡片内容</p>
          <p>这是卡片内容</p>
        </Card>
      </div>
    </div>
  );
};

export default App;