import React, { useState, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
// @ts-ignore
import './style/index.scss';
import type { InputProps } from './interface';

/**
 * Input 输入框组件
 * 
 * @param props - 输入框组件的属性
 * @param props.value - 输入框的值（受控模式）
 * @param props.defaultValue - 输入框默认值（非受控模式）
 * @param props.onChange - 输入框值改变时的回调函数
 * @param props.placeholder - 输入框占位符
 * @param props.disabled - 是否禁用输入框
 * @param props.readOnly - 是否只读
 * @param props.maxLength - 最大输入长度
 * @param props.showCount - 是否显示字数统计
 * @param props.allowClear - 是否允许清除内容
 * @param props.autoFocus - 是否自动聚焦
 * @param props.autocomplete - 自动补全属性
 * @param props.type - 输入框类型，默认为 'text'
 * @param props.onPressEnter - 按下回车键的回调函数
 * @param props.onFocus - 获取焦点时的回调函数
 * @param props.onBlur - 失去焦点时的回调函数
 * @param props.onKeyDown - 按键按下时的回调函数
 * @returns React函数组件
 */
const Input: React.FC<InputProps> = (props) => {
  const {
    value,
    defaultValue,
    onChange,
    placeholder,
    disabled,
    readOnly,
    maxLength,
    showCount,
    allowClear,
    autoFocus,
    autocomplete,
    type = 'text',
    onPressEnter,
    onFocus,
    onBlur,
    onKeyDown,
    ...restProps
  } = props;

  // 使用ref获取input元素
  const inputRef = useRef<HTMLInputElement>(null);

  // 管理内部value状态（非受控模式）
  const [innerValue, setInnerValue] = useState<string>(defaultValue || '');

  // 判断是否为受控组件
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : innerValue;

  // 处理输入变化
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInnerValue(newValue);
    }
    onChange?.(newValue);
  };

  // 处理清除按钮点击
  const handleClear = () => {
    if (!disabled && !readOnly) {
      if (!isControlled) {
        setInnerValue('');
      }
      onChange?.('');
      inputRef.current?.focus();
    }
  };

  // 处理回车键按下
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.key === 'Enter') {
      onPressEnter?.(e);
    }
  };

  return (
    <div className={`input ${disabled ? 'input-disabled' : ''} ${readOnly ? 'input-readonly' : ''}`}>
      <input
        ref={inputRef}
        type={type}
        value={currentValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        autoFocus={autoFocus}
        autoComplete={autocomplete}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className="input-inner"
        {...restProps}
      />
      {allowClear && currentValue && !disabled && !readOnly && (
        <span className="input-suffix">
          <span className="input-clear" onClick={handleClear}>×</span>
        </span>
      )}
      {showCount && maxLength && (
        <span className="input-suffix input-show-count">
          {currentValue.length}/{maxLength}
        </span>
      )}
    </div>
  );
};

export default Input;