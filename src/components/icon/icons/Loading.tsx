import React from 'react';
import type { AntdIconProps } from '../interface';

const Loading: React.FC<AntdIconProps> = React.forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
  const {
    className,
    style,
    rotate,
    spin = true, // 默认开启旋转动画
    title,
    ...restProps
  } = props;

  const rotateStyle = rotate ? { transform: `rotate(${rotate}deg)` } : {};
  const spinStyle = spin ? { animation: 'antRotate 1s infinite linear' } : {};

  return (
    <span
      ref={ref}
      role="img"
      aria-label="loading"
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
          d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a64 64 0 0 0-64 64v192a64 64 0 0 0 128 0V320a64 64 0 0 0-64-64zm0 512a48 48 0 1 0 0-96 48 48 0 0 0 0 96z" 
          fill="currentColor" 
        />
      </svg>
    </span>
  );
});

Loading.displayName = 'LoadingOutlined';

export default Loading;