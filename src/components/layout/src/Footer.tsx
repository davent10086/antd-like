import React from 'react';
import type { FooterProps } from '../interface';
import classNames from 'classnames';
import '../style/index.scss';

/**
 * Footer 组件用于页面底部布局
 * 
 * @param props - Footer 组件的属性
 * @param props.className - 自定义 CSS 类名
 * @param props.children - 子元素
 * @param props.height - Footer 高度，默认为 64
 * @param props.style - 自定义样式
 * @returns Footer 组件 JSX 元素
 */
const Footer: React.FC<FooterProps> = (props) => {
  const { 
    className, 
    children, 
    height = 64,
    style,
    ...restProps 
  } = props;

  const prefixCls = 'ant-layout-footer';

  const classes = classNames(prefixCls, className);
  
  const mergedStyle: React.CSSProperties = {
    height,
    lineHeight: `${height}px`,
    ...style,
  };

  return (
    <footer className={classes} style={mergedStyle} {...restProps}>
      {children}
    </footer>
  );
};

export default Footer;