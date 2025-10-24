import React from 'react';
import classNames from 'classnames';
// @ts-ignore
import './style/index.scss';

export type AlignType = 'left' | 'center' | 'right';

export type ColumnType<T> = {
    key?: React.Key;
    dataIndex?: string | string[];
    title?: React.ReactNode;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    width?: number | string;
    align?: AlignType;
    className?: string;
};

export type TableSize = 'small' | 'middle' | 'large';

export interface TableProps<T = any> {
    columns: ColumnType<T>[];
    dataSource: T[];
    rowKey?: keyof T | ((record: T) => React.Key);
    size?: TableSize;
    bordered?: boolean;
    loading?: boolean;
    emptyText?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const prefixCls = 'ant-table';

function getValueByDataIndex(record: any, dataIndex?: string | string[]) {
    if (!dataIndex) return undefined;
    const path = Array.isArray(dataIndex) ? dataIndex : String(dataIndex).split('.');
    return path.reduce((acc: any, key: string) => (acc == null ? acc : acc[key]), record);
}

function getRowKey<T>(record: T, rowKey?: keyof T | ((r: T) => React.Key)): React.Key | undefined {
    if (!rowKey) return (record as any)?.key as React.Key | undefined;
    if (typeof rowKey === 'function') return rowKey(record);
    return (record as any)[rowKey] as unknown as React.Key;
}

function Table<T extends Record<string, any>>({
    columns,
    dataSource,
    rowKey,
    size = 'middle',
    bordered,
    loading,
    emptyText = 'No Data',
    className,
    style,
}: TableProps<T>) {
    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-bordered`]: bordered,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-loading`]: loading,
    });

    const colCount = Math.max(columns.length, 1);

    return (
        <div className={classes} style={style} role="table" aria-busy={!!loading}>
            <div className={`${prefixCls}-container`}>
                <table>
                    <colgroup>
                        {columns.map((col, idx) => {
                            const k = (col.key ?? (Array.isArray(col.dataIndex) ? col.dataIndex.join('.') : col.dataIndex) ?? idx) as React.Key;
                            return <col key={k} style={col.width ? { width: col.width } : undefined} />;
                        })}
                    </colgroup>
                    <thead className={`${prefixCls}-thead`}>
                        <tr>
                            {columns.map((col, idx) => {
                                const k = (col.key ?? (Array.isArray(col.dataIndex) ? col.dataIndex.join('.') : col.dataIndex) ?? idx) as React.Key;
                                return (
                                    <th
                                        key={k}
                                        className={classNames(col.className, col.align ? `${prefixCls}-align-${col.align}` : undefined)}
                                    >
                                        {col.title}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className={`${prefixCls}-tbody`}>
                        {loading ? (
                            <tr className={`${prefixCls}-row-loading`}>
                                <td colSpan={colCount} className={`${prefixCls}-cell-empty`}>
                                    Loading...
                                </td>
                            </tr>
                        ) : dataSource.length === 0 ? (
                            <tr className={`${prefixCls}-row-empty`}>
                                <td colSpan={colCount} className={`${prefixCls}-cell-empty`}>
                                    {emptyText}
                                </td>
                            </tr>
                        ) : (
                            dataSource.map((record, rowIndex) => {
                                const key = getRowKey(record, rowKey) ?? rowIndex;
                                return (
                                    <tr key={key} className={`${prefixCls}-row`}>
                                        {columns.map((col, colIndex) => {
                                            const raw = getValueByDataIndex(record, col.dataIndex);
                                            const content = col.render ? col.render(raw, record, rowIndex) : raw;
                                            return (
                                                <td
                                                    key={
                                                        (col.key ?? (Array.isArray(col.dataIndex) ? col.dataIndex.join('.') : col.dataIndex) ?? colIndex) as React.Key
                                                    }
                                                    className={classNames(col.className, col.align ? `${prefixCls}-align-${col.align}` : undefined)}
                                                >
                                                    {content}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table as unknown as <T extends Record<string, any>>(props: TableProps<T>) => React.ReactElement;
