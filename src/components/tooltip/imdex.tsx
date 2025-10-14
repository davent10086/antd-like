import React, { useState, useRef, useEffect } from "react";
import "./style";

/**
 * Tooltip组件的属性接口定义
 * 定义了用于配置Tooltip组件的所有可用属性
 */
export interface TooltipProps {
    /**
     * 提示内容
     */
    content: React.ReactNode;
    /**
     * 触发方式
     * @default 'hover'
     */
    trigger?: 'hover' | 'click' | 'focus';
    /**
     * 提示位置
     * @default 'top'
     */
    placement?: 'top' | 'bottom' | 'left' | 'right';

    /**
     * 是否手动控制Tooltip的显示隐藏
     */
    manual?: boolean;
    /**
     * 控制Tooltip的显示隐藏（受控模式）
     */
    visible?: boolean;
    /**
     * Tooltip显示状态改变时的回调
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * 提示框的样式
     */
    style?: React.CSSProperties;
    /**
     * 提示框的类名
     */
    className?: string;
    /**
     * 提示框的标题
     */
    title?: React.ReactNode;
    /**
     * 提示框的描述
     */
    description?: React.ReactNode;
    /**
     * 鼠标进入延迟时间（毫秒）
     */
    mouseEnterDelay?: number;
    /**
     * 鼠标离开延迟时间（毫秒）
     */
    mouseLeaveDelay?: number;
    /**
     * 子元素
     */
    children: React.ReactNode;
}

/**
 * Tooltip组件
 * 
 * 一个用于在鼠标悬停、点击或聚焦时显示提示信息的组件
 * 
 * @param props - Tooltip组件的属性
 * @param props.content - 提示内容
 * @param props.trigger - 触发方式，可选值为'hover' | 'click' | 'focus'，默认为'hover'
 * @param props.placement - 提示位置，可选值为'top' | 'bottom' | 'left' | 'right'，默认为'top'
 * @param props.manual - 是否手动控制Tooltip的显示隐藏，默认为false
 * @param props.visible - 控制Tooltip的显示隐藏（受控模式）
 * @param props.onVisibleChange - Tooltip显示状态改变时的回调
 * @param props.style - 提示框的样式
 * @param props.className - 提示框的类名
 * @param props.title - 提示框的标题
 * @param props.description - 提示框的描述
 * @param props.mouseEnterDelay - 鼠标进入延迟时间（毫秒），默认为0
 * @param props.mouseLeaveDelay - 鼠标离开延迟时间（毫秒），默认为0
 * @param props.children - 子元素
 * 
 * @returns 返回一个Tooltip组件
 */
const Tooltip: React.FC<TooltipProps> = (props) => {
    const {
        content,
        trigger = 'hover',
        placement = 'top',
        manual = false,
        visible: controlledVisible,
        onVisibleChange,
        style,
        className = '',
        title,
        description,
        mouseEnterDelay = 0,
        mouseLeaveDelay = 0,
        children,
    } = props;

    // 判断是否为受控组件模式
    const isControlled = controlledVisible !== undefined;
    const [uncontrolledVisible, setUncontrolledVisible] = useState(false);

    // 根据受控状态确定当前可见性
    const visible = isControlled ? controlledVisible : uncontrolledVisible;
    // 设置可见性状态的统一方法
    const setVisible = (newVisible: boolean) => {
        if (!isControlled) {
            setUncontrolledVisible(newVisible);
        }
        onVisibleChange?.(newVisible);
    };

    // 定时器引用，用于处理延迟显示/隐藏
    const timeoutRef = useRef<number | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // 清除延迟定时器
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // 显示Tooltip
    const showTooltip = () => {
        if (manual) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            setVisible(true);
        }, mouseEnterDelay);
    };

    // 隐藏Tooltip
    const hideTooltip = () => {
        if (manual) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            setVisible(false);
        }, mouseLeaveDelay);
    };

    // 处理点击事件
    const handleClick = () => {
        if (manual) return;
        switch (trigger) {
            case 'click':
                setVisible(!visible);
                break;
            case 'hover':
                showTooltip();
                break;
            case 'focus':
                setVisible(true);
                break;
            default:
                break;
        }
    };

    // 处理获得焦点事件
    const handleFocus = () => {
        if (manual || trigger !== 'focus') return;
        setVisible(true);
    };

    // 处理失去焦点事件
    const handleBlur = () => {
        if (manual || trigger !== 'focus') return;
        setVisible(false);
    };

    // 构建Tooltip内容
    const tooltipContent = title || description ? (
        <>
            {title && <div className="tooltip-title">{title}</div>}
            {description && <div className="tooltip-description">{description}</div>}
        </>
    ) : content;

    const placementClass = `tooltip-placement-${placement}`;
    const visibleClass = visible ? 'tooltip-open' : '';
    const tooltipClasses = `tooltip ${placementClass} ${visibleClass} ${className}`.trim();

    return (
        <div
            className={tooltipClasses}
            style={style}
            onClick={trigger === 'click' ? handleClick : undefined}
            onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
            onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={tooltipRef}
        >
            <div className="tooltip-trigger">{children}</div>
            <div className="tooltip-content">
                {tooltipContent}
            </div>
        </div>
    );
};

export default Tooltip;