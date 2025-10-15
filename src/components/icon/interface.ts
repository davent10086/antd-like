export interface IconProps {
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否有旋转动画
   */
  spin?: boolean;
  
  /**
   * 图标标题，用于无障碍访问
   */
  title?: string;
}

export interface AntdIconProps extends IconProps {
  /**
   * 双色图标的主要颜色
   */
  twoToneColor?: string | [string, string];
}