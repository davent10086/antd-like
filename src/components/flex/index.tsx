import React from 'react';
// @ts-ignore
import './style/index.scss';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'column';
    wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
    justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    gap?: number | string; // e.g. 8 | '8px' | '0.5rem'
    inline?: boolean; // inline-flex
    fullWidth?: boolean; // width: 100%
}

export interface FlexItemProps extends React.HTMLAttributes<HTMLDivElement> {
    flex?: number | string; // e.g. 1 | '0 0 auto'
    alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
}

const prefixCls = 'ant-flex';

const normalizeWrap = (wrap: FlexProps['wrap']): 'wrap' | 'nowrap' | 'wrap-reverse' => {
    if (wrap === true) return 'wrap';
    if (wrap === false || wrap === undefined) return 'nowrap';
    return wrap;
};

const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
    const {
        direction = 'row',
        wrap = false,
        justify = 'start',
        align = 'stretch',
        gap,
        inline = false,
        fullWidth = false,
        className,
        style,
        children,
        ...rest
    } = props;

    const wrapMode = normalizeWrap(wrap);

    const classes = [
        prefixCls,
        `${prefixCls}-${direction}`,
        `${prefixCls}-justify-${justify}`,
        `${prefixCls}-align-${align}`,
        `${prefixCls}-${wrapMode}`,
        inline ? `${prefixCls}-inline` : '',
        fullWidth ? `${prefixCls}-full-width` : '',
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    const mergedStyle: React.CSSProperties = {
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        ...style,
    };

    return (
        <div ref={ref} className={classes} style={mergedStyle} {...rest}>
            {children}
        </div>
    );
});

Flex.displayName = 'Flex';

const FlexItem: React.FC<FlexItemProps> = ({ flex, alignSelf, className, style, children, ...rest }) => {
    const itemStyle: React.CSSProperties = {
        flex: flex as any,
        alignSelf: alignSelf === 'start' || alignSelf === 'end' ? (`flex-${alignSelf}` as any) : (alignSelf as any),
        minWidth: 0,
        ...style,
    };

    const classes = [`${prefixCls}-item`, className || ''].filter(Boolean).join(' ');

    return (
        <div className={classes} style={itemStyle} {...rest}>
            {children}
        </div>
    );
};

type InternalFlex = typeof Flex & { Item: typeof FlexItem };

const FlexExport = Flex as InternalFlex;
FlexExport.Item = FlexItem;

export default FlexExport;
