import React from 'react';
import type { AntdIconProps } from '../interface';

const Arrow: React.FC<AntdIconProps> = React.forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
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
      aria-label="arrow"
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
          d="M491.571 714.419a32 32 0 0 1-22.617-9.42l-341.334-341.334a32 32 0 0 1 45.248-45.249L512 667.595l341.334-341.334a32 32 0 0 1 45.248 45.249L514.189 705.008a32 32 0 0 1-22.618 9.411z" 
          fill="currentColor" 
        />
      </svg>
    </span>
  );
});

Arrow.displayName = 'ArrowOutlined';

export default Arrow;