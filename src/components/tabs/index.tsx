import React, { useMemo, useRef, useState, useEffect } from 'react';
// 忽略样式导入的类型检查
// @ts-ignore
import './style/index.scss';

export type TabItem = {
    key: string;
    label: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
};

export interface TabsProps {
    items: TabItem[];
    activeKey?: string;
    defaultActiveKey?: string;
    onChange?: (activeKey: string) => void;
    onTabClick?: (key: string) => void;
    size?: 'small' | 'middle' | 'large';
    type?: 'line' | 'card';
    centered?: boolean;
    destroyInactiveTabPane?: boolean;
    tabPosition?: 'top' | 'bottom' | 'left' | 'right';
    extra?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Tabs: React.FC<TabsProps> = ({
    items,
    activeKey,
    defaultActiveKey,
    onChange,
    onTabClick,
    size = 'middle',
    type = 'line',
    centered = false,
    destroyInactiveTabPane = false,
    tabPosition = 'top',
    extra,
    className = '',
    style,
}) => {
    const enabledItems = useMemo(() => items.filter(Boolean), [items]);
    const firstEnabledKey = useMemo(
        () => enabledItems.find(i => !i.disabled)?.key,
        [enabledItems]
    );

    const isControlled = activeKey !== undefined;
    const [innerActiveKey, setInnerActiveKey] = useState<string | undefined>(
        defaultActiveKey ?? firstEnabledKey
    );

    // 同步受控值
    useEffect(() => {
        if (isControlled) return;
        if (innerActiveKey === undefined && firstEnabledKey) {
            setInnerActiveKey(firstEnabledKey);
        }
    }, [firstEnabledKey]);

    const realActiveKey = isControlled ? activeKey : innerActiveKey;

    const onActivate = (key: string) => {
        const item = enabledItems.find(i => i.key === key);
        if (!item || item.disabled) return;
        if (!isControlled) setInnerActiveKey(key);
        onChange?.(key);
    };

    const navRef = useRef<HTMLDivElement>(null);

    // 键盘导航：左右切换下一个可用标签
    const moveActive = (dir: 1 | -1) => {
        if (!enabledItems.length) return;
        const idx = enabledItems.findIndex(i => i.key === realActiveKey);
        let next = idx;
        for (let step = 0; step < enabledItems.length; step++) {
            next = (next + dir + enabledItems.length) % enabledItems.length;
            const it = enabledItems[next];
            if (!it.disabled) {
                onActivate(it.key);
                break;
            }
        }
    };

    const prefix = 'ant-tabs';
    const classes = [
        prefix,
        `${prefix}-${type}`,
        `${prefix}-${size}`,
        centered ? `${prefix}-centered` : '',
        tabPosition !== 'top' ? `${prefix}-position-${tabPosition}` : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} style={style}>
            <div
                className={`${prefix}-nav`}
                role="tablist"
                aria-orientation={tabPosition === 'left' || tabPosition === 'right' ? 'vertical' : 'horizontal'}
                ref={navRef}
                onKeyDown={e => {
                    if (e.key === 'ArrowRight') moveActive(1);
                    else if (e.key === 'ArrowLeft') moveActive(-1);
                }}
            >
                <ul className={`${prefix}-tabs`}>
                    {enabledItems.map((item) => {
                        const active = item.key === realActiveKey;
                        const id = `${prefix}-tab-${item.key}`;
                        const panelId = `${prefix}-panel-${item.key}`;
                        return (
                            <li
                                key={item.key}
                                id={id}
                                role="tab"
                                aria-selected={active}
                                aria-controls={panelId}
                                tabIndex={item.disabled ? -1 : active ? 0 : -1}
                                className={[
                                    `${prefix}-tab`,
                                    active ? `${prefix}-tab-active` : '',
                                    item.disabled ? `${prefix}-tab-disabled` : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                onClick={() => {
                                    onTabClick?.(item.key);
                                    onActivate(item.key);
                                }}
                            >
                                <span className={`${prefix}-tab-label`}>{item.label}</span>
                            </li>
                        );
                    })}
                </ul>
                {extra ? <div className={`${prefix}-extra`}>{extra}</div> : null}
            </div>

            <div className={`${prefix}-content`}>
                {enabledItems.map((item) => {
                    const active = item.key === realActiveKey;
                    const id = `${prefix}-panel-${item.key}`;
                    const tabId = `${prefix}-tab-${item.key}`;
                    if (destroyInactiveTabPane && !active) return null;
                    return (
                        <div
                            key={item.key}
                            id={id}
                            role="tabpanel"
                            aria-labelledby={tabId}
                            hidden={!active}
                            className={[
                                `${prefix}-tabpane`,
                                active ? `${prefix}-tabpane-active` : `${prefix}-tabpane-inactive`,
                            ]
                                .filter(Boolean)
                                .join(' ')}
                        >
                            {item.children}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tabs;