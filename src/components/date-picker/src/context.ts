import React from 'react';
import type { DatePickerProps } from './interface';

/**
 * DatePicker组件的上下文属性接口
 * 定义了通过上下文传递的所有属性类型
 */
export interface DatePickerContextProps {
  // 当前选中的日期值
  value: Date | undefined;
  // 日期变更时的回调函数
  onChange: (date: Date | null) => void;
  // 日期格式化字符串
  format: string;
  // 输入框占位符文本
  placeholder: string;
  // 是否禁用组件
  disabled: boolean;
  // 是否只读
  readonly: boolean;
  // 组件尺寸大小
  size: 'small' | 'middle' | 'large';
  // 是否显示时间选择
  showTime: boolean;
  // 日期选择器类型
  picker: 'date' | 'month' | 'year' | 'week' | 'quarter';
}

/**
 * 创建DatePicker上下文对象
 * 用于在组件树中传递日期选择器相关属性
 */
export const DatePickerContext = React.createContext<DatePickerContextProps | null>(null);

/**
 * DatePicker上下文提供者的属性接口
 * 继承自DatePickerProps并添加了children属性
 */
interface DatePickerContextProviderProps extends DatePickerProps {
  // 子组件
  children: React.ReactNode;
  // 当前选中的日期值
  value: Date | undefined;
  // 日期变更时的回调函数
  onChange: (date: Date | null) => void;
}

/**
 * DatePicker上下文提供者组件
 * 将DatePicker相关属性通过上下文传递给子组件
 * @param props - DatePicker上下文提供者的属性
 * @returns React元素
 */
export function DatePickerProvider(props: DatePickerContextProviderProps) {
  const {
    children,
    value,
    onChange,
    format = 'YYYY-MM-DD',
    placeholder = '请选择日期',
    disabled = false,
    readonly = false,
    size = 'middle',
    showTime = false,
    picker = 'date',
    // 其他属性可以按需添加
  } = props;

  // 构建传递给子组件的上下文值
  const contextValue: DatePickerContextProps = {
    value,
    onChange,
    format,
    placeholder,
    disabled,
    readonly,
    size,
    showTime,
    picker,
  };

  // 通过上下文提供者包装子组件并传递上下文值
  return React.createElement(DatePickerContext.Provider, { value: contextValue }, children);
}