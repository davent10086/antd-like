import React, { createContext, useContext } from 'react';
// 忽略样式导入的类型检查
// @ts-ignore
import './style/index.scss';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type Gutter = number | [number, number];

export interface RowProps {
    gutter?: Gutter;
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'top' | 'middle' | 'bottom';
    wrap?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export interface ColProps {
    span?: number;
    offset?: number;
    order?: number;
    // 响应式断点 span
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface GridContextState {
    gutter: [number, number];
}

const GridContext = createContext<GridContextState>({ gutter: [0, 0] });

const normalizeGutter = (gutter?: Gutter): [number, number] => {
    if (!gutter) return [0, 0];
    if (Array.isArray(gutter)) return [gutter[0] ?? 0, gutter[1] ?? 0];
    return [gutter, 0];
};

export const Row: React.FC<RowProps> = ({
    gutter,
    justify = 'start',
    align = 'top',
    wrap = true,
    className = '',
    style,
    children,
}) => {
    const [horizontal, vertical] = normalizeGutter(gutter);
    const prefix = 'ant-row';
    const classes = [
        prefix,
        wrap ? '' : `${prefix}-no-wrap`,
        justify !== 'start' ? `${prefix}-justify-${justify}` : '',
        align !== 'top' ? `${prefix}-align-${align}` : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const rowStyle: React.CSSProperties = {
        marginLeft: horizontal ? -horizontal / 2 : undefined,
        marginRight: horizontal ? -horizontal / 2 : undefined,
        rowGap: vertical || undefined,
        ...style,
    };

    return (
        <GridContext.Provider value={{ gutter: [horizontal, vertical] }}>
            <div className={classes} style={rowStyle}>
                {children}
            </div>
        </GridContext.Provider>
    );
};

export const Col: React.FC<ColProps> = ({
    span,
    offset,
    order,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    className = '',
    style,
    children,
}) => {
    const { gutter } = useContext(GridContext);
    const [horizontal] = gutter;

    const prefix = 'ant-col';

    const sizeMap: Partial<Record<Breakpoint, number | undefined>> = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };

    const classes = [
        prefix,
        typeof span === 'number' ? `${prefix}-${span}` : '',
        typeof offset === 'number' && offset > 0 ? `${prefix}-offset-${offset}` : '',
        typeof order === 'number' ? `${prefix}-order-${order}` : '',
        ...Object.entries(sizeMap)
            .filter(([, v]) => typeof v === 'number')
            .map(([k, v]) => `${prefix}-${k}-${v}`),
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const colStyle: React.CSSProperties = {
        paddingLeft: horizontal ? horizontal / 2 : undefined,
        paddingRight: horizontal ? horizontal / 2 : undefined,
        ...style,
    };

    return (
        <div className={classes} style={colStyle}>
            {children}
        </div>
    );
};

export default { Row, Col };
