import React from 'react';
import { Message } from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Message 基础示例</h2>
      <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
        <Message content="这是一条普通的信息提示" type="info" />
        <Message content="这是一条成功的提示" type="success" />
        <Message content="这是一条警告的提示" type="warning" />
        <Message content="这是一条错误的提示" type="error" />
        <Message content="这是一条加载中的提示" type="loading" />
      </div>
    </div>
  );
};

export default BasicDemo;