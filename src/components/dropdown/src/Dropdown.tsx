import React, { useRef, useState, useEffect } from 'react';
import type { DropdownProps } from './interface';
import { DropdownContext } from './context';
import useDropdown from './hooks/useDropdown';
import '../style/index.scss';

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
    // 删除未使用的getPopupContainer变量
    arrow = false,
    destroyPopupOnHide = false,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    children,
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { isOpen: realOpen, setOpen, onMouseEnter, onMouseLeave, onClick } = useDropdown({
    open,
    defaultOpen,
    onOpenChange,
    disabled,
    mouseEnterDelay,
    mouseLeaveDelay,
  });

  // 控制是否渲染下拉菜单内容
  const [shouldRenderMenu, setShouldRenderMenu] = useState(realOpen);

  // 当 destroyPopupOnHide 为 false 时，始终保持菜单存在于 DOM 中
  useEffect(() => {
    if (realOpen) {
      setShouldRenderMenu(true);
    } else if (!destroyPopupOnHide) {
      // 延迟移除以保证动画效果
      const timer = setTimeout(() => {
        setShouldRenderMenu(false);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setShouldRenderMenu(false);
    }
  }, [realOpen, destroyPopupOnHide]);

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

  const contextValue = {
    isOpen: realOpen,
    setIsOpen: setOpen,
    trigger,
    placement,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={["ant-dropdown-wrapper", className].filter(Boolean).join(' ')} style={style} ref={dropdownRef}>
        <div ref={triggerRef} {...getTriggerEvents()}>
          {children}
        </div>
        {(shouldRenderMenu || realOpen) && (
          <div className={dropdownCls} style={overlayStyle}>
            {renderMenu()}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;