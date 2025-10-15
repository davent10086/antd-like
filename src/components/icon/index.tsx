import React from 'react';
import type { AntdIconProps } from './interface';

// 导入所有图标组件
import Arrow from './icons/Arrow';
import Check from './icons/Check';
import Close from './icons/Close';
import Heart from './icons/Heart';
import Loading from './icons/Loading';
import Search from './icons/Search';
import Settings from './icons/Settings';
import Star from './icons/Star';
import User from './icons/User';

// 按照 Ant Design 命名规范导出图标组件
export const ArrowOutlined = Arrow;
export const CheckOutlined = Check;
export const CloseOutlined = Close;
export const HeartFilled = Heart;
export const LoadingOutlined = Loading;
export const SearchOutlined = Search;
export const SettingOutlined = Settings;
export const StarFilled = Star;
export const UserOutlined = User;

/**
 * Icon 组件属性接口
 */
export interface IconProps extends AntdIconProps {
  /**
   * 图标组件
   */
  component?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

/**
 * Icon 组件
 * 
 * @param props - Icon 组件属性
 * @param props.component - 自定义图标组件
 * @param props.className - 自定义类名
 * @param props.style - 自定义样式
 * @param props.rotate - 图标旋转角度
 * @param props.spin - 是否有旋转动画
 * @param props.title - 图标标题
 * @returns React 函数组件
 */
const Icon: React.FC<IconProps> = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    component: Component,
    className = '',
    style,
    rotate,
    spin,
    title,
    ...restProps
  } = props;

  const rotateStyle = rotate ? { transform: `rotate(${rotate}deg)` } : {};
  const spinStyle = spin ? { animation: 'antRotate 1s infinite linear' } : {};

  // 如果提供了自定义组件，则使用自定义组件
  if (Component) {
    return (
      <span
        ref={ref}
        className={className}
        style={{
          ...style,
          ...rotateStyle,
          ...spinStyle,
        }}
        {...restProps}
      >
        <Component />
      </span>
    );
  }

  return null;
});

Icon.displayName = 'Icon';

// 导出 Icon 组件
export {
  Icon,
};

// 创建图标组件的联合类型
export type IconType = 
  | typeof Arrow
  | typeof Check
  | typeof Close
  | typeof Heart
  | typeof Loading
  | typeof Search
  | typeof Settings
  | typeof Star
  | typeof User;

export default Icon;