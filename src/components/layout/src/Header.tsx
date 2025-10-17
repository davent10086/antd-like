import React from 'react';
import type { HeaderProps } from '../interface';
import classNames from 'classnames';
import '../style/index.scss';

/**
 * Layout 布局组件的 Header 部分
 * 
 * @param props - Header 组件的属性
 * @param props.className - 自定义 CSS 类名
 * @param props.children - 子元素
 * @param props.height - 头部高度，默认为 64px
 * @param props.style - 自定义样式
 * @returns Header 组件
 */
const Header: React.FC<HeaderProps> = (props) => {
  const { 
    className, 
    children, 
    height = 64,
    style,
    ...restProps 
  } = props;

  const prefixCls = 'ant-layout-header';

  // 构建组件的 CSS 类名
  const classes = classNames(prefixCls, className);
  
  // 合并样式，设置高度和行高
  const mergedStyle: React.CSSProperties = {
    height,
    lineHeight: `${height}px`,
    ...style,
  };

  return (
    <header className={classes} style={mergedStyle} {...restProps}>
      {children}
    </header>
  );
};

export default Header;