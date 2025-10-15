import { useState, useEffect, useRef } from 'react';
import type { DatePickerProps } from '../interface';

/**
 * DatePicker组件的自定义hook
 * 用于管理日期选择器的状态和行为逻辑
 */
export interface UseDatePickerProps extends Pick<
  DatePickerProps,
  'value' | 'defaultValue' | 'onChange' | 'disabled' | 'readonly' | 'open' | 'onOpenChange' | 'autoFocus'
> {}

/**
 * DatePicker组件的核心hook
 * 管理日期值、面板开闭状态以及相关交互逻辑
 * 
 * @param props DatePicker的配置属性
 * @param props.value 受控模式下的日期值
 * @param props.defaultValue 非受控模式下的默认日期值
 * @param props.onChange 日期值变化时的回调函数
 * @param props.disabled 是否禁用日期选择器
 * @param props.readonly 是否只读
 * @param props.open 受控模式下的面板开启状态
 * @param props.onOpenChange 面板开启状态变化时的回调函数
 * @param props.autoFocus 是否自动获取焦点
 * @returns 包含状态和操作方法的对象
 */
export default function useDatePicker(props: UseDatePickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    disabled = false,
    readonly = false,
    open,
    onOpenChange,
    autoFocus = false
  } = props;

  // 管理日期值状态
  const [dateValue, setDateValue] = useState<Date | null>(value || defaultValue || null);
  
  // 管理面板打开状态
  const [isOpen, setIsOpen] = useState<boolean>(open || false);
  
  // 输入框引用
  const inputRef = useRef<HTMLInputElement>(null);

  // 处理受控组件的值更新
  useEffect(() => {
    if ('value' in props) {
      setDateValue(value || null);
    }
  }, [value]);

  // 处理受控组件的打开状态更新
  useEffect(() => {
    if ('open' in props) {
      setIsOpen(open || false);
    }
  }, [open]);

  // 自动聚焦功能
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  /**
   * 处理日期选择事件
   * @param date 选中的日期，null表示清空选择
   */
  const handleSelect = (date: Date | null) => {
    if (disabled || readonly) return;
    
    setDateValue(date);
    if (onChange) {
      onChange(date as Date); // 确保传递给onChange的类型正确
    }
  };

  /**
   * 处理时间变更事件
   * @param hours 小时
   * @param minutes 分钟
   * @param seconds 秒
   */
  const handleTimeChange = (hours: number, minutes: number, seconds: number) => {
    if (disabled || readonly || !dateValue) return;
    
    const newDate = new Date(dateValue);
    newDate.setHours(hours, minutes, seconds);
    setDateValue(newDate);
    if (onChange) {
      onChange(newDate); // 确保传递给onChange的类型正确
    }
  };

  /**
   * 切换面板的开启状态
   */
  const toggleOpen = () => {
    if (disabled || readonly) return;
    
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  /**
   * 设置面板的开启状态
   * @param open 面板是否开启
   */
  const setOpen = (open: boolean) => {
    if (disabled || readonly) return;
    
    setIsOpen(open);
    onOpenChange?.(open);
  };

  /**
   * 清除已选择的日期值
   * @param e 鼠标事件对象
   */
  const clearValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(null);
  };

  return {
    dateValue,
    isOpen,
    inputRef,
    handleSelect,
    handleTimeChange,
    toggleOpen,
    setOpen,
    clearValue
  };
}