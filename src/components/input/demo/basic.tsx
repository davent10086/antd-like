import React, { useState } from 'react';
import Input from '../index';

const InputDemo: React.FC = () => {
  const [value, setValue] = useState('');
  const [controlledValue, setControlledValue] = useState('受控模式输入框');

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
    console.log('Input value changed:', newValue);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Enter key pressed:', e.currentTarget.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input focused:', e.currentTarget.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input blurred:', e.currentTarget.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Input 输入框测试演示</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>基本输入框</h3>
        <div>
          <Input placeholder="请输入文本" />
          <Input placeholder="禁用状态" disabled style={{ marginLeft: '10px' }} />
          <Input placeholder="只读状态" readOnly style={{ marginLeft: '10px' }} />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>不同类型的输入框</h3>
        <div>
          <Input type="text" placeholder="文本输入" />
          <Input type="password" placeholder="密码输入" style={{ marginLeft: '10px' }} />
          <Input type="number" placeholder="数字输入" style={{ marginLeft: '10px' }} />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>带清除按钮的输入框</h3>
        <div>
          <Input allowClear placeholder="可清除的输入框" />
          <Input allowClear defaultValue="已有值" style={{ marginLeft: '10px' }} />
          <Input allowClear disabled defaultValue="禁用状态" style={{ marginLeft: '10px' }} />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>字数统计输入框</h3>
        <div>
          <Input showCount maxLength={20} placeholder="最多20个字符" />
          <Input 
            showCount 
            maxLength={50} 
            value={controlledValue} 
            onChange={setControlledValue}
            style={{ marginLeft: '10px', width: '300px' }} 
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>非受控与受控模式</h3>
        <div>
          <Input 
            defaultValue="非受控模式" 
            onChange={handleInputChange} 
            onPressEnter={handlePressEnter}
          />
          <Input 
            value={value} 
            onChange={setValue}
            placeholder="受控模式" 
            style={{ marginLeft: '10px' }} 
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>事件处理演示</h3>
        <Input 
          placeholder="聚焦、失焦、回车事件" 
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPressEnter={handlePressEnter}
        />
      </div>
    </div>
  );
};

export default InputDemo;