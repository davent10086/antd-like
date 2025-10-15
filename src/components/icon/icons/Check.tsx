import React from 'react';
import type { AntdIconProps } from '../interface';

const Check: React.FC<AntdIconProps> = React.forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
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
      aria-label="check"
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
          d="M406.656 706.944L195.84 496.256a32 32 0 0 1 45.248-45.248l188.16 188.416 423.04-423.04a32 32 0 0 1 45.248 45.248L406.656 706.944z" 
          fill="currentColor" 
        />
      </svg>
    </span>
  );
});

Check.displayName = 'CheckOutlined';

export default Check;