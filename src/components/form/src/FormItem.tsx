import React from 'react';
import type { FormItemProps } from './interface';

/**
 * 表单项组件，用于组织表单中的各个字段项
 * @param props - 表单项配置属性
 * @param props.name - 字段名称，支持数组形式（嵌套字段）
 * @param props.label - 标签文本
 * @param props.rules - 校验规则
 * @param props.required - 是否必填（会自动添加校验规则）
 * @param props.labelCol - 覆盖表单的标签布局
 * @param props.wrapperCol - 覆盖表单的控件布局
 * @param props.help - 自定义校验提示信息
 * @param props.validateStatus - 校验状态，支持 success、warning、error、validating
 * @param props.hasFeedback - 是否展示校验状态图标
 * @param props.validateTrigger - 设置触发验证时机
 * @param props.dependencies - 依赖字段，依赖字段值变化时重新校验
 * @param props.extra - 额外的提示信息
 * @param props.getValueFromEvent - 设置如何将事件的值转换成字段值
 * @param props.getValueProps - 为子元素添加额外的属性
 * @param props.normalize - 组件值格式转换
 * @param props.preserve - 是否保留被删除字段的值
 * @param props.trigger - 设置收集字段值变更的方法，默认为 'onChange'
 * @param props.valuePropName - 子节点的值的属性，如 Switch 的是 'checked'，默认为 'value'
 * @param props.children - 子元素
 * @returns 表单项的React节点
 */
const FormItem: React.FC<FormItemProps> = (props) => {
  const { 
    label, 
    children, 
    name,
    required,
    rules,
    labelCol,
    wrapperCol,
    help,
    validateStatus,
    hasFeedback,
    validateTrigger,
    dependencies,
    extra,
    getValueFromEvent,
    getValueProps,
    normalize,
    preserve,
    trigger = 'onChange',
    valuePropName = 'value',
    ...restProps
  } = props;
  
  return (
    <div {...restProps}>
      {label && (
        // 渲染标签文本，如果是数组形式的name则将其连接为字符串作为htmlFor属性
        <label htmlFor={Array.isArray(name) ? name.join('_') : name}>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      // 渲染表单项内容区域
      <div>{children}</div>
      {help && <div>{help}</div>}
      {extra && <div>{extra}</div>}
    </div>
  );
};

export default FormItem;