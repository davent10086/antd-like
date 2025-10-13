import React from 'react';
// 忽略样式导入的类型检查
// @ts-ignore
import './style/index.scss';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
  
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  
  /**
   * 按钮尺寸
   * @default 'middle'
   */
  size?: 'large' | 'middle' | 'small';
  
  /**
   * 是否禁用按钮
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 是否显示加载状态
   */
  loading?: boolean;

  /**
   * 按钮图标
   */
  icon?: React.ReactNode;

  /**
   * 链接地址
   */
  href?: string;

  /**
   * 原生 button 类型
   */
  htmlType?: 'button' |'submit' |'reset';

  /**
   * 幽灵按钮（背景透明）
   */
  ghosty?: boolean;

  /**
   * 是否为块级元素按钮
   */
  block?: boolean;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * Button 按钮组件
 * 
 * @param {ButtonProps} props - 按钮组件的属性
 * @param {React.ReactNode} props.children - 按钮内容
 * @param {'primary' | 'default' | 'dashed' | 'link' | 'text'} props.type - 按钮类型
 * @param {'large' | 'middle' | 'small'} props.size - 按钮尺寸
 * @param {boolean} props.disabled - 是否禁用按钮
 * @param {React.MouseEventHandler<HTMLElement>} props.onClick - 点击事件回调函数
 * 
 * @example
 * ```tsx
 * // 基本使用
 * <Button>Default Button</Button>
 * 
 * // 主要按钮
 * <Button type="primary">Primary Button</Button>
 * 
 * // 大尺寸按钮
 * <Button size="large">Large Button</Button>
 * 
 * // 禁用按钮
 * <Button disabled>Disabled Button</Button>
 * ```
 */
const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  size = 'middle',
  disabled = false,
  loading = false,
  ghosty = false,
  block = false,
  onClick,
  htmlType,
  className = '',
  ...restProps
}) => {
  /**
   * 处理按钮点击事件
   * 如果按钮被禁用则不执行点击回调
   * @param e 鼠标点击事件对象
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      return;
    }
    onClick?.(e);
  };

  // 根据按钮属性构建类名
  const classes = [
    'ant-btn',
    `ant-btn-${type}`,
    `ant-btn-${size}`,
    disabled ? 'ant-btn-disabled' : '',
    loading ? 'ant-btn-loading' : '',
    ghosty ? 'ant-btn-ghost' : '',
    block ? 'ant-btn-block' : '',
    className
  ].filter(Boolean).join(' ');

  // 根据按钮属性构建类名并渲染按钮
  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      type={htmlType}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;