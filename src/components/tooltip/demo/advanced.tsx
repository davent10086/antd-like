import React, { useState } from 'react';
import Tooltip from '../imdex';

const AdvancedDemo: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [clickVisible, setClickVisible] = useState(false);

  return (
    <div style={{ padding: '50px' }}>
      <h2>Tooltip 高级演示</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>手动控制显示/隐藏</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Tooltip 
            content="手动控制的提示" 
            manual={true}
            visible={visible}
            onVisibleChange={setVisible}
          >
            <span>受控组件</span>
          </Tooltip>
          
          <button onClick={() => setVisible(!visible)}>
            {visible ? '隐藏' : '显示'}提示
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>自定义样式</h3>
        <Tooltip 
          content="自定义样式的提示" 
          style={{ backgroundColor: '#ff6b6b', color: 'white' }}
        >
          <span>自定义样式</span>
        </Tooltip>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>复杂内容</h3>
        <Tooltip 
          content={
            <div>
              <p><strong>复杂内容提示</strong></p>
              <p>可以包含任意 JSX 元素</p>
              <ul>
                <li>列表项 1</li>
                <li>列表项 2</li>
              </ul>
            </div>
          }
        >
          <span>复杂内容</span>
        </Tooltip>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>组合触发方式</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Tooltip 
            content="点击控制显示" 
            manual={true}
            visible={clickVisible}
            onVisibleChange={setClickVisible}
          >
            <button>组合触发</button>
          </Tooltip>
          
          <button onClick={() => setClickVisible(true)}>
            显示
          </button>
          
          <button onClick={() => setClickVisible(false)}>
            隐藏
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDemo;