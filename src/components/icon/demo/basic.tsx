import React from 'react';
import { 
  ArrowOutlined, 
  CheckOutlined, 
  CloseOutlined, 
  HeartFilled, 
  LoadingOutlined, 
  SearchOutlined, 
  SettingOutlined, 
  StarFilled, 
  UserOutlined 
} from '../index';

const IconDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Icon 组件演示</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <h3>基本图标</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <ArrowOutlined />
            <CheckOutlined />
            <CloseOutlined />
            <SearchOutlined />
            <UserOutlined />
            <SettingOutlined />
            <StarFilled />
            <HeartFilled />
            <LoadingOutlined />
          </div>
        </div>
        
        <div>
          <h3>不同尺寸</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <CheckOutlined style={{ fontSize: '16px' }} />
            <CheckOutlined style={{ fontSize: '24px' }} />
            <CheckOutlined style={{ fontSize: '32px' }} />
            <CheckOutlined style={{ fontSize: '48px' }} />
          </div>
        </div>
        
        <div>
          <h3>不同颜色</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <CheckOutlined style={{ color: 'red' }} />
            <CheckOutlined style={{ color: 'green' }} />
            <CheckOutlined style={{ color: 'blue' }} />
            <CheckOutlined style={{ color: '#fadb14' }} />
          </div>
        </div>
        
        <div>
          <h3>旋转图标</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <SettingOutlined rotate={45} />
            <SettingOutlined rotate={90} />
            <SettingOutlined rotate={180} />
          </div>
        </div>
        
        <div>
          <h3>旋转动画</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <LoadingOutlined spin />
            <SettingOutlined spin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconDemo;