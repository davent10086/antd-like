import React from 'react';
import type { AntdIconProps } from '../interface';

const Heart: React.FC<AntdIconProps> = React.forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
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
      aria-label="heart"
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
          d="M866.9 169.9a228.5 228.5 0 0 0-315 0l-17.9 17.9-17.9-17.9a228.5 228.5 0 0 0-315 315l17.9 17.9L512 814.7l315.1-315.1 17.9-17.9a228.5 228.5 0 0 0 0-315z" 
          fill="currentColor" 
        />
      </svg>
    </span>
  );
});

Heart.displayName = 'HeartFilled';

export default Heart;