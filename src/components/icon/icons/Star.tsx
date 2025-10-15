import React from 'react';
import type { AntdIconProps } from '../interface';

const Star: React.FC<AntdIconProps> = React.forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
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
      aria-label="star"
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
          d="M908.1 512a32 32 0 0 1-25.2 31.3l-212.3 63.4 135.7 185.1a32 32 0 0 1-13.4 46.2 32 32 0 0 1-19.5 5.8 32 32 0 0 1-26.5-13.1L512 674.8 346.1 830.7a32 32 0 0 1-46-46l135.7-185.1-212.3-63.4A32 32 0 0 1 192 512a32 32 0 0 1 18.4-29.3l212.3-63.4-135.7-185.1a32 32 0 0 1 46-46L512 345.2l165.9-156.9a32 32 0 0 1 46 46l-135.7 185.1 212.3 63.4A32 32 0 0 1 908.1 512z" 
          fill="currentColor" 
        />
      </svg>
    </span>
  );
});

Star.displayName = 'StarFilled';

export default Star;