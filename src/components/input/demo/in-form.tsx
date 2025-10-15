import React from 'react';
import Form from '../../form/src/Form';
import FormItem from '../../form/src/FormItem';
import Input from '../index';

const InputInFormDemo: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Form submitted:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Form submission failed:', errorInfo);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Input 组件在 Form 中的使用演示</h2>
      
      <Form
        name="input-in-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <FormItem
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>

        <FormItem
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input type="password" placeholder="请输入密码" />
        </FormItem>

        <FormItem
          label="邮箱"
          name="email"
          rules={[{ type: 'email', message: '请输入有效的邮箱地址!' }]}
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>

        <FormItem
          label="手机号"
          name="phone"
          rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码!' }]}
        >
          <Input placeholder="请输入手机号" maxLength={11} showCount />
        </FormItem>

        <FormItem>
          <button type="submit">提交</button>
        </FormItem>
      </Form>
    </div>
  );
};

export default InputInFormDemo;