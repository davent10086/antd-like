import React from 'react';
import Form from '../src/Form';
import FormItem from '../src/FormItem';
import useForm from '../src/useForm';

const BasicFormDemo: React.FC = () => {
  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Basic Form Demo</h2>
      <Form
        form={form}
        name="basic"
        initialValues={{ username: 'antd-like', remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <input type="text" id="username" />
        </FormItem>

        <FormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <input type="password" id="password" />
        </FormItem>

        <FormItem name="remember" valuePropName="checked">
          <input type="checkbox" id="remember" /> Remember me
        </FormItem>

        <FormItem>
          <button type="submit" id="submit-btn">Submit</button>
          <button 
            type="button" 
            onClick={() => form.resetFields()}
            style={{ marginLeft: 10 }}
            id="reset-btn"
          >
            Reset
          </button>
        </FormItem>
      </Form>
    </div>
  );
};

export default BasicFormDemo;