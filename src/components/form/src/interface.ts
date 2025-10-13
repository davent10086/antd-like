import type React from 'react';

export interface ColProps {
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
}

export interface Rule {
  enum?: any[];
  len?: number;
  max?: number;
  message?: string;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  transform?: (value: any) => any;
  type?: string;
  validator?: (rule: any, value: any, callback: any) => any;
  whitespace?: boolean;
  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: string;
}

export interface FormInstance {
  /**
   * 获取表单字段值
   */
  getFieldValue: (name: string) => any;
  
  /**
   * 获取表单全部字段值
   */
  getFieldsValue: (nameList?: string[] | true) => any;
  
  /**
   * 设置表单字段值
   */
  setFieldsValue: (values: any) => void;
  
  /**
   * 重置表单字段
   */
  resetFields: (fields?: string[]) => void;
  
  /**
   * 验证表单字段
   */
  validateFields: (nameList?: string[]) => Promise<any>;
}

export interface FormProps {
  /**
   * 表单控制实例，用于管理表单状态和操作
   */
  form?: FormInstance;
  
  /**
   * 表单初始值，只在初始化和重置时生效
   */
  initialValues?: Record<string, any>;
  
  /**
   * 表单布局方式
   * @default 'horizontal'
   */
  layout?: 'horizontal' | 'vertical' | 'inline';
  
  /**
   * 是否禁用整个表单中的所有组件
   */
  disabled?: boolean;
  
  /**
   * 标签布局，设置标签的栅格系统属性
   */
  labelCol?: ColProps;
  
  /**
   * 表单控件包装器布局，设置控件区域的栅格系统属性
   */
  wrapperCol?: ColProps;
  
  /**
   * 标签文本对齐方式
   * @default 'right'
   */
  labelAlign?: 'left' | 'right';
  
  /**
   * 标签文本是否换行
   * @default false
   */
  labelWrap?: boolean;
  
  /**
   * 是否显示标签后的冒号（仅在水平布局时有效）
   * @default true
   */
  colon?: boolean;
  
  /**
   * 表单验证成功后的回调函数
   */
  onFinish?: (values: any) => void;
  
  /**
   * 表单验证失败后的回调函数
   */
  onFinishFailed?: (errorInfo: any) => void;
  
  /**
   * 表单值变化时的回调函数
   */
  onValuesChange?: (changedValues: any, allValues: any) => void;
  
  /**
   * 表单字段变化时的回调函数
   */
  onFieldsChange?: (changedFields: any[], allFields: any[]) => void;
  
  /**
   * 验证提示模板
   */
  validateMessages?: Record<string, any>;
  
  /**
   * 验证触发时机
   */
  validateTrigger?: string | string[];
  
  /**
   * 提交失败时自动滚动到第一个错误字段
   */
  scrollToFirstError?: boolean | object;
  
  /**
   * 表单名称，用于表单控件的标识
   */
  name?: string;
  
  /**
   * 是否保留被删除字段的值
   * @default true
   */
  preserve?: boolean;
  
  /**
   * 必填选填的标记样式
   */
  requiredMark?: boolean | 'optional';
  
  /**
   * 表单子元素
   */
  children?: React.ReactNode;
}

export interface FormItemProps {
  /**
   * 字段名称，支持数组形式（嵌套字段）
   */
  name?: string | string[];
  
  /**
   * 标签文本
   */
  label?: React.ReactNode;
  
  /**
   * 校验规则
   */
  rules?: Rule[];
  
  /**
   * 是否必填（会自动添加校验规则）
   */
  required?: boolean;
  
  /**
   * 覆盖表单的标签布局
   */
  labelCol?: ColProps;
  
  /**
   * 覆盖表单的控件布局
   */
  wrapperCol?: ColProps;
  
  /**
   * 自定义校验提示信息
   */
  help?: React.ReactNode;
  
  /**
   * 校验状态，支持 success、warning、error、validating
   */
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  
  /**
   * 是否展示校验状态图标
   */
  hasFeedback?: boolean;
  
  /**
   * 设置触发验证时机
   */
  validateTrigger?: string | string[];
  
  /**
   * 依赖字段，依赖字段值变化时重新校验
   */
  dependencies?: string[];
  
  /**
   * 额外的提示信息
   */
  extra?: React.ReactNode;
  
  /**
   * 设置如何将事件的值转换成字段值
   */
  getValueFromEvent?: (...args: any[]) => any;
  
  /**
   * 为子元素添加额外的属性
   */
  getValueProps?: (value: any) => any;
  
  /**
   * 组件值格式转换
   */
  normalize?: (value: any, prevValue: any, allValues: any) => any;
  
  /**
   * 是否保留被删除字段的值
   */
  preserve?: boolean;
  
  /**
   * 设置收集字段值变更的方法
   */
  trigger?: string;
  
  /**
   * 子节点的值的属性，如 Switch 的是 'checked'
   * @default 'value'
   */
  valuePropName?: string;
  
  /**
   * 子元素
   */
  children?: React.ReactNode;
}