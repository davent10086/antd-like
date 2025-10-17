import React, { useState, useRef, useEffect } from 'react';
import type { DropdownProps } from './src/interface';
import './style/index.scss';

/**
 * Dropdown 下拉菜单组件
 * 
 * @param props - Dropdown 组件属性
 * @param props.trigger - 触发方式，可选 'hover' | 'click' | 'contextMenu'，默认为 'hover'
 * @param props.placement - 下拉菜单弹出位置，默认为 'bottomLeft'
 * @param props.open - 下拉菜单是否可见（受控模式）
 * @param props.defaultOpen - 下拉菜单是否可见（非受控模式）
 * @param props.onOpenChange - 下拉菜单显隐状态改变回调
 * @param props.disabled - 是否禁用下拉菜单，默认为 false
 * @param props.menu - 下拉菜单内容
 * @param props.items - 菜单项配置数组
 * @param props.className - 自定义类名
 * @param props.style - 自定义样式
 * @param props.overlayClassName - 下拉菜单根元素的类名
 * @param props.overlayStyle - 下拉菜单根元素的样式
 * @param props.getPopupContainer - 指定下拉菜单渲染的父节点
 * @param props.arrow - 是否显示箭头，默认为 false
 * @param props.autoFocus - 下拉菜单显示时是否自动获取焦点，默认为 false
 * @param props.destroyPopupOnHide - 隐藏后是否销毁下拉菜单，默认为 false
 * @param props.mouseEnterDelay - 鼠标移入后延时多少才显示下拉菜单，单位：秒，默认为 0.15
 * @param props.mouseLeaveDelay - 鼠标移出后延时多少才隐藏下拉菜单，单位：秒，默认为 0.1
 * @param props.children - 子元素
 * @returns Dropdown 组件
 */
const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    trigger = 'hover',
    placement = 'bottomLeft',
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    menu,
    items,
    className = '',
    style,
    overlayClassName = '',
    overlayStyle,
    getPopupContainer,
    arrow = false,
    autoFocus = false,
    destroyPopupOnHide = false,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    children,
  } = props;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isOpenControlled = open !== undefined;
  const realOpen = isOpenControlled ? open : isOpen;
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
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

  // 处理打开状态变化
  const setOpen = (newOpen: boolean) => {
    if (!isOpenControlled) {
      setIsOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // 鼠标进入事件处理
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

  // 鼠标离开事件处理
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

  // 点击事件处理
  const onClick = () => {
    if (disabled) return;
    setOpen(!realOpen);
  };

  // 渲染菜单内容
  const renderMenu = () => {
    if (menu) {
      return menu;
    }
    
    if (items && items.length > 0) {
      return (
        <ul className="ant-dropdown-menu">
          {items.map((item, index) => {
            if (item.divider) {
              return <li key={index} className="ant-dropdown-menu-item-divider" />;
            }
            
            return (
              <li 
                key={item.key || index} 
                className={`ant-dropdown-menu-item ${item.disabled ? 'ant-dropdown-menu-item-disabled' : ''}`}
                onClick={!item.disabled ? () => {
                  // 处理菜单项点击事件
                  setOpen(false);
                } : undefined}
              >
                {item.icon && <span className="ant-dropdown-menu-item-icon">{item.icon}</span>}
                {item.label}
              </li>
            );
          })}
        </ul>
      );
    }
    
    return null;
  };

  // 下拉菜单类名
  const dropdownCls = [
    'ant-dropdown',
    `ant-dropdown-placement-${placement}`,
    overlayClassName,
    realOpen ? '' : 'ant-dropdown-hidden',
    arrow ? 'ant-dropdown-arrow' : '',
  ].filter(Boolean).join(' ');

  // 触发器事件处理
  const getTriggerEvents = () => {
    const events: Record<string, any> = {};
    
    if (trigger === 'hover') {
      events.onMouseEnter = onMouseEnter;
      events.onMouseLeave = onMouseLeave;
    } else if (trigger === 'click') {
      events.onClick = onClick;
    } else if (trigger === 'contextMenu') {
      events.onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(true);
      };
    }
    
    return events;
  };

  return (
    <div className={className} style={style} ref={dropdownRef}>
      <div ref={triggerRef} {...getTriggerEvents()}>
        {children}
      </div>
      {realOpen && (
        <div className={dropdownCls} style={overlayStyle}>
          {renderMenu()}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
export type { DropdownProps, MenuItemType } from './src/interface';
