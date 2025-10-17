import { useState, useRef, useEffect } from 'react';

/**
 * 下拉菜单组件的自定义 Hook 属性接口
 */
export interface UseDropdownProps {
  /**
   * 控制下拉菜单是否打开（受控模式）
   */
  open?: boolean;
  /**
   * 默认是否打开（非受控模式）
   */
  defaultOpen?: boolean;
  /**
   * 下拉菜单打开状态改变时的回调函数
   * @param open 是否打开
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 是否禁用下拉菜单
   */
  disabled?: boolean;
  /**
   * 鼠标进入延迟时间（秒）
   */
  mouseEnterDelay?: number;
  /**
   * 鼠标离开延迟时间（秒）
   */
  mouseLeaveDelay?: number;
}

/**
 * 下拉菜单自定义 Hook，用于管理下拉菜单的打开状态和相关事件处理
 * @param props 下拉菜单属性
 * @returns 包含状态和事件处理函数的对象
 */
export default function useDropdown(props: UseDropdownProps) {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
  } = props;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isOpenControlled = open !== undefined;
  const realOpen = isOpenControlled ? open : isOpen;
  
  const timerRef = useRef<number | null>(null);

  // 清除定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  /**
   * 设置下拉菜单的打开状态
   * @param newOpen 新的打开状态
   */
  const setOpen = (newOpen: boolean) => {
    if (!isOpenControlled && !disabled) {
      setIsOpen(newOpen);
    }
    if (!disabled) {
      onOpenChange?.(newOpen);
    }
  };

  /**
   * 鼠标进入事件处理函数
   */
  const onMouseEnter = () => {
    if (disabled) return;
    
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, mouseEnterDelay * 1000);
  };

  /**
   * 鼠标离开事件处理函数
   */
  const onMouseLeave = () => {
    if (disabled) return;
    
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    timerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, mouseLeaveDelay * 1000);
  };

  /**
   * 点击事件处理函数
   */
  const onClick = () => {
    if (disabled) return;
    setOpen(!realOpen);
  };

  return {
    /**
     * 当前下拉菜单是否打开
     */
    isOpen: realOpen,
    /**
     * 设置下拉菜单打开状态的函数
     */
    setOpen,
    /**
     * 鼠标进入事件处理函数
     */
    onMouseEnter,
    /**
     * 鼠标离开事件处理函数
     */
    onMouseLeave,
    /**
     * 点击事件处理函数
     */
    onClick,
  };
}