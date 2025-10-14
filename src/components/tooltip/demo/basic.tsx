import React from 'react';
import Tooltip from '../imdex';

const BasicDemo: React.FC = () => {
  return (
    <div style={{ padding: '50px' }}>
      <h2>Tooltip 组件演示</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>基本用法</h3>
        <Tooltip content="这是一个提示信息">
          <span>鼠标悬停显示提示</span>
        </Tooltip>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>不同触发方式</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Tooltip content="点击触发的提示" trigger="click">
            <button>点击触发</button>
          </Tooltip>
          
          <Tooltip content="聚焦触发的提示" trigger="focus">
            <input placeholder="聚焦触发" />
          </Tooltip>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>不同位置</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '20px' }}>
          <Tooltip content="顶部提示" placement="top">
            <button>上</button>
          </Tooltip>
          
          <Tooltip content="底部提示" placement="bottom">
            <button>下</button>
          </Tooltip>
          
          <Tooltip content="左侧提示" placement="left">
            <button>左</button>
          </Tooltip>
          
          <Tooltip content="右侧提示" placement="right">
            <button>右</button>
          </Tooltip>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Title 和 Description</h3>
        <Tooltip 
          content="这是提示内容"
          title="提示标题" 
          description="这是提示的详细描述信息"
        >
          <span>带标题和描述的提示</span>
        </Tooltip>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>延迟显示</h3>
        <Tooltip 
          content="延迟显示的提示" 
          mouseEnterDelay={500}
          mouseLeaveDelay={200}
        >
          <span>悬停500ms后显示，离开200ms后隐藏</span>
        </Tooltip>
      </div>
    </div>
  );
};

export default BasicDemo;