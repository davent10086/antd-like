import React from 'react';
import type { AntdIconProps } from '../interface';

const Search: React.FC<AntdIconProps> = React.forwardRef<HTMLSpanElement, AntdIconProps>((props, ref) => {
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
      aria-label="search"
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
          d="M932.416 864.64l-205.248-205.248a382.272 382.272 0 0 0 88.96-260.8 380.16 380.16 0 0 0-588.8 307.2 380.16 380.16 0 0 0 307.2 588.8 382.272 382.272 0 0 0 260.8-88.96L932.416 864.64zM768 448a320 320 0 1 1-640 0 320 320 0 0 1 640 0z" 
          fill="currentColor" 
        />
      </svg>
    </span>
  );
});

Search.displayName = 'SearchOutlined';

export default Search;