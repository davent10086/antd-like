import type React from 'react';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 设置布局模式，水平布局或垂直布局
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 是否启用响应式布局
   * @default true
   */
  hasSider?: boolean;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 头部高度
   * @default 64
   */
  height?: number;
}

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 底部高度
   * @default 64
   */
  height?: number;
}

export interface SiderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 是否可收起
   * @default false
   */
  collapsible?: boolean;
  /**
   * 是否收起状态
   * @default false
   */
  collapsed?: boolean;
  /**
   * 默认收起状态
   * @default false
   */
  defaultCollapsed?: boolean;
  /**
   * 收起宽度
   * @default 80
   */
  collapsedWidth?: number;
  /**
   * 展开宽度
   * @default 200
   */
  width?: number;
  /**
   * 收起触发器
   */
  trigger?: React.ReactNode;
  /**
   * 是否可拖拽调整宽度
   * @default false
   */
  resizable?: boolean;
  /**
   * 收起状态改变时的回调
   */
  onCollapse?: (collapsed: boolean, type: 'clickTrigger' | 'responsive') => void;
  /**
   * 响应式断点
   */
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  /**
   * 零宽度触发器
   */
  zeroWidthTriggerStyle?: React.CSSProperties;
}