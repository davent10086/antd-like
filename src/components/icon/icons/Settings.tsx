import React from 'react';
import type { AntdIconProps } from '../interface';

const Settings: React.FC<AntdIconProps> = React.forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
  const {
    className,
    style,
    rotate,
    spin,
    title,
    ...restProps
  } = props;

  const rotateStyle = rotate ? { transform: `rotate(${rotate}deg)` } : {};
  const spinStyle = spin ? { animation: 'antRotate 1s infinite linear' } : {};

  return (
    <span
      ref={ref}
      role="img"
      aria-label="settings"
      className={className}
      style={{
        ...style,
        ...rotateStyle,
        ...spinStyle,
      }}
      {...restProps}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1024 1024" 
        width="1em" 
        height="1em"
        style={{ display: 'block' }}
      >
        {title && <title>{title}</title>}
        <path 
          d="M928.4 672.8c-12.8-44.8-38.4-83.2-70.4-115.2-32-32-70.4-57.6-115.2-70.4 0-8.8 2.4-17.6 2.4-26.4 0-8.8-2.4-17.6-2.4-26.4 44.8-12.8 83.2-38.4 115.2-70.4 32-32 57.6-70.4 70.4-115.2 0-8.8-2.4-17.6-2.4-26.4 0-8.8 2.4-17.6 2.4-26.4-12.8-44.8-38.4-83.2-70.4-115.2-32-32-70.4-57.6-115.2-70.4 0-8.8-2.4-17.6-2.4-26.4 0-8.8 2.4-17.6 2.4-26.4 12.8 44.8 38.4 83.2 70.4 115.2 32 32 70.4 57.6 115.2 70.4 0 8.8-2.4 17.6-2.4 26.4 0 8.8 2.4 17.6 2.4 26.4-44.8 12.8-83.2 38.4-115.2 70.4-32 32-57.6 70.4-70.4 115.2 0 8.8-2.4 17.6-2.4 26.4 0 8.8 2.4 17.6 2.4 26.4 12.8 44.8 38.4 83.2 70.4 115.2 32 32 70.4 57.6 115.2 70.4 0 8.8 2.4 17.6 2.4 26.4 0 8.8-2.4 17.6-2.4 26.4zM512 608a96 96 0 1 0 0-192 96 96 0 0 0 0 192z" 
          fill="currentColor" 
        />
      </svg>
    </span>
  );
});

Settings.displayName = 'SettingOutlined';

export default Settings;