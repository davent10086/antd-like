import { renderHook, act } from '@testing-library/react';
import useForm from '../src/useForm';

describe('useForm', () => {
  it('should return form instance with required methods', () => {
    const { result } = renderHook(() => useForm());
    const formInstance = result.current[0];
    
    expect(formInstance).toBeDefined();
    expect(typeof formInstance.getFieldValue).toBe('function');
    expect(typeof formInstance.getFieldsValue).toBe('function');
    expect(typeof formInstance.setFieldsValue).toBe('function');
    expect(typeof formInstance.resetFields).toBe('function');
    expect(typeof formInstance.validateFields).toBe('function');
  });

  it('should get and set field values correctly', () => {
    const { result } = renderHook(() => useForm());
    
    // Initially should be empty
    expect(result.current[0].getFieldsValue()).toEqual({});
    
    // Set values
    act(() => {
      result.current[0].setFieldsValue({ username: 'test-user', age: 30 });
    });
    
    // Get specific field value
    expect(result.current[0].getFieldValue('username')).toBe('test-user');
    expect(result.current[0].getFieldValue('age')).toBe(30);
    
    // Get all field values
    expect(result.current[0].getFieldsValue()).toEqual({ username: 'test-user', age: 30 });
    
    // Get specific fields
    expect(result.current[0].getFieldsValue(['username'])).toEqual({ username: 'test-user' });
  });

  it('should reset fields correctly', () => {
    const { result } = renderHook(() => useForm());
    
    // Set initial values using internal method
    act(() => {
      (result.current[0] as any).setInitialValues({ username: 'initial-user', age: 25 });
    });
    
    // Check initial values
    expect(result.current[0].getFieldsValue()).toEqual({ username: 'initial-user', age: 25 });
    
    // Change values
    act(() => {
      result.current[0].setFieldsValue({ username: 'new-user', age: 30 });
    });
    
    expect(result.current[0].getFieldsValue()).toEqual({ username: 'new-user', age: 30 });
    
    // Reset all fields
    act(() => {
      result.current[0].resetFields();
    });
    
    expect(result.current[0].getFieldsValue()).toEqual({ username: 'initial-user', age: 25 });
    
    // Change values again
    act(() => {
      result.current[0].setFieldsValue({ username: 'another-user', age: 35, email: 'test@example.com' });
    });
    
    expect(result.current[0].getFieldsValue()).toEqual({ username: 'another-user', age: 35, email: 'test@example.com' });
    
    // Reset specific fields
    act(() => {
      result.current[0].resetFields(['username']);
    });
    
    expect(result.current[0].getFieldsValue()).toEqual({ username: 'initial-user', age: 35, email: 'test@example.com' });
  });

  it('should validate fields and return promise', async () => {
    const { result } = renderHook(() => useForm());
    
    // Set values
    act(() => {
      result.current[0].setFieldsValue({ username: 'test-user' });
    });
    
    // Validate all fields
    let validateResult;
    await act(async () => {
      validateResult = await result.current[0].validateFields();
    });
    
    expect(validateResult).toEqual({ username: 'test-user' });
    
    // Set more values
    act(() => {
      result.current[0].setFieldsValue({ username: 'test-user', email: 'test@example.com' });
    });
    
    // Validate specific fields
    let validateSpecificResult;
    await act(async () => {
      validateSpecificResult = await result.current[0].validateFields(['username']);
    });
    
    expect(validateSpecificResult).toEqual({ username: 'test-user' });
  });
});