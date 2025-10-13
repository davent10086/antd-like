import React, { useEffect, useRef, createContext } from 'react';
import type { FormProps } from './interface';
import useForm from './useForm';

/**
 * FormContext 用于在表单组件树中传递表单相关配置
 */
export const FormContext = createContext<FormProps | null>(null);

/**
 * Form 组件是表单系统的根组件，提供表单上下文和基本功能
 * 
 * @param props - FormProps 表单属性
 * @param props.children - 表单子组件
 * @param props.form - 表单实例
 * @param props.onFinish - 表单验证通过后的回调函数
 * @param props.initialValues - 表单初始值
 * @param props.layout - 表单布局，可选值为 'horizontal' | 'vertical' | 'inline'，默认为 'horizontal'
 * @param props.disabled - 是否禁用表单
 * @param props.labelCol - label 标签布局，同 <Col> 组件
 * @param props.wrapperCol - 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
 * @param props.labelAlign - label 标签的文本对齐方式，'left' | 'right'，默认为 'right'
 * @param props.labelWrap - label 标签的文本换行方式，布尔值，默认为 false
 * @param props.colon - 是否显示 label 后面的冒号，布尔值，默认为 true
 * @param props.onFinishFailed - 表单验证失败后的回调函数
 * @param props.onValuesChange - 字段值更新时触发回调事件
 * @param props.onFieldsChange - 字段更新时触发回调事件
 * @param props.validateMessages - 验证提示模板
 * @param props.validateTrigger - 统一设置字段校验规则的触发时机
 * @param props.scrollToFirstError - 提交失败自动滚动到第一个错误字段
 * @param props.name - 表单名称
 * @param props.preserve - 当字段被删除时是否保留字段值，默认为 true
 * @param props.requiredMark - 必选样式，可以切换为可选样式
 * @returns React元素
 */
const Form: React.FC<FormProps> = (props) => {
  const { 
    children, 
    form,
    onFinish, 
    initialValues,
    layout = 'horizontal',
    disabled,
    labelCol,
    wrapperCol,
    labelAlign = 'right',
    labelWrap = false,
    colon = true,
    onFinishFailed,
    onValuesChange,
    onFieldsChange,
    validateMessages,
    validateTrigger,
    scrollToFirstError,
    name,
    preserve = true,
    requiredMark
  } = props;
  
  const isMounted = useRef(false);
  const [formInstance] = useForm();
  
  // 如果外部传入form，则使用外部的form实例
  const formRef = form || formInstance;

  useEffect(() => {
    // 处理表单初始值设置
    if (initialValues && !isMounted.current) {
      isMounted.current = true;
      (formRef as any).setInitialValues(initialValues);
    }
  }, [initialValues, formRef]);

  /**
   * 处理表单提交事件
   * @param e - 表单提交事件对象
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 添加表单验证逻辑
    onFinish?.(e);
  };
  
  // 构建表单上下文值对象
  const formContextValue = {
    layout,
    disabled,
    labelCol,
    wrapperCol,
    labelAlign,
    labelWrap,
    colon,
    requiredMark,
    validateTrigger,
    validateMessages,
    scrollToFirstError,
    preserve,
    onFinishFailed,
    onValuesChange,
    onFieldsChange
  };

  return (
    <FormContext.Provider value={formContextValue}>
      <form 
        onSubmit={handleSubmit}
        name={name}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;