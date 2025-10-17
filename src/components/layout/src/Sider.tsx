import React, { useState, useEffect, useCallback } from 'react';
import type { SiderProps } from '../interface';
import classNames from 'classnames';
import '../style/index.scss';

/**
 * Sider组件 - 用于创建页面侧边栏布局
 * @param props - Sider组件的属性
 * @param props.className - 自定义CSS类名
 * @param props.children - 子元素
 * @param props.collapsible - 是否可折叠
 * @param props.collapsed - 控制折叠状态（受控）
 * @param props.defaultCollapsed - 默认折叠状态
 * @param props.collapsedWidth - 折叠时的宽度
 * @param props.width - 展开时的宽度
 * @param props.trigger - 自定义触发器
 * @param props.resizable - 是否可调整大小
 * @param props.onCollapse - 折叠状态变化时的回调函数
 * @param props.breakpoint - 响应式断点
 * @param props.zeroWidthTriggerStyle - 零宽度触发器样式
 * @param props.style - 自定义样式对象
 * @returns 返回Sider侧边栏组件
 */
const Sider: React.FC<SiderProps> = (props) => {
  const {
    className,
    children,
    collapsible = false,
    collapsed: customCollapsed,
    defaultCollapsed = false,
    collapsedWidth = 80,
    width = 200,
    trigger,
    resizable = false,
    onCollapse,
    breakpoint,
    zeroWidthTriggerStyle,
    style,
    ...restProps
  } = props;

  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  
  // 如果传入了collapsed属性，则使用传入的值（受控组件）
  const isCollapsed = customCollapsed !== undefined ? customCollapsed : collapsed;

  const prefixCls = 'ant-layout-sider';

  // 构建组件的CSS类名
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-collapsed`]: isCollapsed,
      [`${prefixCls}-has-trigger`]: collapsible || (trigger !== null && trigger !== undefined),
      [`${prefixCls}-below`]: false, // 简化处理，实际项目中可能需要根据具体需求实现
      [`${prefixCls}-light`]: false, // 简化处理，实际项目中可能需要实现主题功能
    },
    className,
  );

  // 合并样式，根据折叠状态设置宽度相关样式
  const mergedStyle: React.CSSProperties = {
    flex: `0 0 ${isCollapsed ? collapsedWidth : width}px`,
    maxWidth: isCollapsed ? collapsedWidth : width,
    minWidth: isCollapsed ? collapsedWidth : width,
    width: isCollapsed ? collapsedWidth : width,
    ...style,
  };

  /**
   * 处理折叠状态变更
   * @param value - 新的折叠状态
   * @param type - 导致变更的操作类型
   */
  const handleSetCollapsed = useCallback((value: boolean, type: 'clickTrigger' | 'responsive') => {
    if (customCollapsed === undefined) {
      setCollapsed(value);
    }
    onCollapse?.(value, type);
  }, [customCollapsed, onCollapse]);

  /**
   * 切换折叠状态
   */
  const toggleCollapse = () => {
    handleSetCollapsed(!isCollapsed, 'clickTrigger');
  };

  // 简化处理响应式断点，实际项目中应该使用更复杂的实现
  useEffect(() => {
    if (breakpoint) {
      const handleResize = () => {
        // 实际项目中根据断点设置collapsed状态
        // 这里只是示例，不实现完整逻辑
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [breakpoint]);

  // 零宽度触发器
  const renderZeroWidthTrigger = () => {
    if (collapsedWidth === 0 && isCollapsed) {
      return (
        <span
          onClick={toggleCollapse}
          className={`${prefixCls}-zero-width-trigger`}
          style={zeroWidthTriggerStyle}
        >
          {trigger !== undefined ? trigger : <span className={`${prefixCls}-zero-width-trigger-default`} />}
        </span>
      );
    }
    return null;
  };

  return (
    <aside className={classes} style={mergedStyle} {...restProps}>
      <div className={`${prefixCls}-children`}>{children}</div>
      {collapsible && (
        <div
          className={`${prefixCls}-trigger`}
          onClick={toggleCollapse}
          style={{ width: isCollapsed ? collapsedWidth : width }}
        >
          {trigger !== undefined ? trigger : (
            <div className={`${prefixCls}-trigger-default`}>
              {isCollapsed ? '展开' : '收起'}
            </div>
          )}
        </div>
      )}
      {renderZeroWidthTrigger()}
    </aside>
  );
};

export default Sider;