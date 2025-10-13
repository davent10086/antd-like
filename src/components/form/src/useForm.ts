import { useState, useCallback, useRef } from 'react';
import type { FormInstance } from './interface';

/**
 * 自定义hook，用于创建表单实例
 * @returns 表单实例对象
 */
const useForm = (): [FormInstance] => {
  // 表单数据存储
  const [formData, setFormData] = useState<Record<string, any>>({});
  // 初始值引用
  const initialValuesRef = useRef<Record<string, any>>({});
  // 强制更新函数
  const [, forceUpdate] = useState({});
  
  /**
   * 获取表单字段值
   * @param name 字段名称
   * @returns 字段值
   */
  const getFieldValue = useCallback((name: string) => {
    return formData[name];
  }, [formData]);
  
  /**
   * 获取表单多个或所有字段值
   * @param nameList 字段名称列表，如果为true则返回所有字段值
   * @returns 字段值对象
   */
  const getFieldsValue = useCallback((nameList?: string[] | true) => {
    if (nameList === true) {
      return { ...formData };
    }
    
    if (Array.isArray(nameList)) {
      const result: Record<string, any> = {};
      nameList.forEach(name => {
        result[name] = formData[name];
      });
      return result;
    }
    
    return { ...formData };
  }, [formData]);
  
  /**
   * 设置表单字段值
   * @param values 要设置的字段值对象
   */
  const setFieldsValue = useCallback((values: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        ...values
      };
      return newData;
    });
  }, []);
  
  /**
   * 重置表单字段
   * @param fields 要重置的字段名称列表，如果不传则重置所有字段
   */
  const resetFields = useCallback((fields?: string[]) => {
    if (fields && Array.isArray(fields)) {
      const resetValues: Record<string, any> = {};
      fields.forEach(field => {
        resetValues[field] = initialValuesRef.current[field];
      });
      setFieldsValue(resetValues);
    } else {
      // 重置所有字段为初始值
      setFormData({ ...initialValuesRef.current });
    }
  }, [setFieldsValue]);
  
  /**
   * 验证表单字段
   * @param nameList 要验证的字段名称列表
   * @returns Promise，验证通过时resolve，验证失败时reject
   */
  const validateFields = useCallback((nameList?: string[]): Promise<any> => {
    // TODO: 实际项目中这里需要实现真正的验证逻辑
    // 目前简化实现，总是返回成功的Promise
    return Promise.resolve(getFieldsValue(nameList));
  }, [getFieldsValue]);
  
  /**
   * 设置初始值
   * @param initialValues 初始值对象
   */
  const setInitialValues = useCallback((initialValues: Record<string, any>) => {
    initialValuesRef.current = initialValues || {};
    // 只有当formData为空时才设置初始值
    setFormData(prev => {
      if (Object.keys(prev).length === 0) {
        return { ...initialValuesRef.current };
      }
      return prev;
    });
  }, []);
  
  const formInstance: FormInstance = {
    getFieldValue,
    getFieldsValue,
    setFieldsValue,
    resetFields,
    validateFields
  };
  
  // 添加额外的内部方法
  (formInstance as any).setInitialValues = setInitialValues;
  (formInstance as any).forceUpdate = () => forceUpdate({});
  
  return [formInstance];
};

export default useForm;