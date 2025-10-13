import React, { useState } from 'react';
import Button from '../index';

const ButtonDemo: React.FC = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [buttonText, setButtonText] = useState('事件处理按钮');

  const handleClick = () => {
    console.log('Button clicked!');
    setButtonText('点击了按钮!');
    // 显示弹出消息
    setPopupVisible(true);
    // 3秒后隐藏弹出消息
    setTimeout(() => {
      setPopupVisible(false);
      setButtonText('事件处理按钮');
    }, 3000);
  };

  const handleMouseEnter = () => {
    console.log('Mouse entered button');
  };

  const handleMouseLeave = () => {
    console.log('Mouse left button');
  };

  const handleFocus = () => {
    console.log('Button focused');
  };

  const handleBlur = () => {
    console.log('Button blurred');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Button 按钮测试演示</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>基本按钮类型</h3>
        <div>
          <Button>Default Button</Button>{' '}
          <Button type="primary">默认按钮</Button>{' '}
          <Button type="dashed">虚线按钮</Button>{' '}
          <Button type="link">链接按钮</Button>{' '}
          <Button type="text">文本按钮</Button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>按钮尺寸</h3>
        <div>
          <Button size="large">大按钮</Button>{' '}
          <Button size="middle">中等按钮</Button>{' '}
          <Button size="small">小按钮</Button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>按钮状态</h3>
        <div>
          <Button disabled>禁用按钮</Button>{' '}
          <Button loading>加载中按钮</Button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>特殊样式按钮</h3>
        <div>
          <Button ghosty>幽灵按钮（背景透明）</Button>{' '}
          <Button block style={{ marginTop: '10px' }}>阻塞按钮</Button>
        </div>
      </div>

      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <h3>带事件处理的按钮</h3>
        <div>
          <Button 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {buttonText}
          </Button>
          
          {/* 弹出消息 */}
          {popupVisible && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 1000,
              marginTop: '10px'
            }}>
              按钮被点击了！这是一个弹出消息。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;