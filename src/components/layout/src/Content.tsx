import React from 'react';
import type { ContentProps } from '../interface';
import classNames from 'classnames';
import '../style/index.scss';

/**
 * 内容区域组件，用于布局中的主要内容区域
 * 
 * @param props - 组件属性
 * @param props.className - 自定义CSS类名
 * @param props.children - 子元素
 * @returns 返回HTML main元素作为内容容器
 */
const Content: React.FC<ContentProps> = (props) => {
  const { className, children, ...restProps } = props;
  
  // 定义基础CSS类名
  const prefixCls = 'ant-layout-content';
  
  // 合并CSS类名
  const classes = classNames(prefixCls, className);

  return (
    <main className={classes} {...restProps}>
      {children}
    </main>
  );
};

export default Content;