import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /**
   * 输入框内容（受控模式）
   */
  value?: string;
  
  /**
   * 值改变时触发的回调函数
   */
  onChange?: (value: string) => void;
  
  /**
   * 默认值（非受控模式）
   */
  defaultValue?: string;
  
  /**
   * 提示文字
   */
  placeholder?: string;
  
  /**
   * 禁用状态
   */
  disabled?: boolean;
  
  /**
   * 只读状态
   */
  readOnly?: boolean;
  
  /**
   * 最大输入长度
   */
  maxLength?: number;
  
  /**
   * 是否显示字数统计
   */
  showCount?: boolean;
  
  /**
   * 是否显示清除按钮
   */
  allowClear?: boolean;
  
  /**
   * 自动聚焦
   */
  autoFocus?: boolean;
  
  /**
   * 自动完成设置
   */
  autocomplete?: string;
  
  /**
   * 输入框类型
   * @default 'text'
   */
  type?: string;
  
  /**
   * 按下回车键时触发
   */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  
  /**
   * 聚焦时触发
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * 失焦时触发
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * 键盘按下时触发
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}