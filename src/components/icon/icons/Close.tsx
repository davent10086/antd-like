import React from 'react';
import type { AntdIconProps } from '../interface';

const Close: React.FC<AntdIconProps> = React.forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
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
      aria-label="close"
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
          d="M557.312 512.064l221.76-222.144a31.936 31.936 0 0 0-45.248-45.184l-221.696 222.08-221.76-222.144a31.936 31.936 0 0 0-45.248 45.184l221.696 222.08-221.76 222.144a31.936 31.936 0 0 0 45.248 45.184l221.696-222.08 221.76 222.144a31.936 31.936 0 0 0 45.248-45.184L557.312 512.064z" 
          fill="currentColor" 
        />
      </svg>
    </span>
  );
});

Close.displayName = 'CloseOutlined';

export default Close;