import type React from "react";

/**
 * 禁用时间配置接口
 * 用于配置时间选择器中哪些小时、分钟、秒钟选项应该被禁用
 * 通常与DatePicker的disabledTime属性配合使用，以限制用户可以选择的时间范围
 */
export interface DisabledTimeConfig {
    /**
     * 禁用的小时列表
     * 返回一个数组，包含需要禁用的小时数值(0-23)
     * @returns number[] - 需要禁用的小时数组，例如 [0, 1, 2, 3] 表示禁用凌晨0点到3点
     * @example
     * ```typescript
     * disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]
     * ```
     */
    disabledHours?: () => number[];
    
    /**
     * 禁用的分钟列表
     * 根据选定的小时返回需要禁用的分钟数值(0-59)
     * @param hour - 当前选中的小时数(0-23)
     * @returns number[] - 需要禁用的分钟数组，例如 [0, 15, 30, 45] 表示禁用每15分钟间隔的时间点之外的所有分钟
     * @example
     * ```typescript
     * disabledMinutes: (hour) => {
     *   if (hour < 12) {
     *     return Array.from({ length: 60 }, (_, i) => i);
     *   }
     *   return [];
     * }
     * ```
     */
    disabledMinutes?: (hour: number) => number[];
    
    /**
     * 禁用的秒钟列表
     * 根据选定的小时和分钟返回需要禁用的秒钟数值(0-59)
     * @param hour - 当前选中的小时数(0-23)
     * @param minute - 当前选中的分钟数(0-59)
     * @returns number[] - 需要禁用的秒钟数组
     * @example
     * ```typescript
     * disabledSeconds: (hour, minute) => {
     *   if (minute % 5 !== 0) {
     *     return Array.from({ length: 60 }, (_, i) => i);
     *   }
     *   return [];
     * }
     * ```
     */
    disabledSeconds?: (hour: number, minute: number) => number[];
}

/**
 * 日期选择器组件属性接口
 * 定义了日期选择器组件的所有可用配置选项
 * 支持多种模式(date, month, year, week, quarter)的日期选择
 */
export interface DatePickerProps {
    /** 
     * 当前选中的日期值，用于受控组件模式
     * 当提供此属性时，组件变为受控组件，其值完全由该属性控制
     */
    value?: Date;
    
    /** 
     * 默认选中的日期值，用于非受控组件模式
     * 仅在组件初次渲染时生效，之后的值变化由组件内部控制
     */
    defaultValue?: Date;
    
    /** 
     * 日期值变化时的回调函数
     * 当用户选择新日期或时间时触发
     * @param date - 新选择的日期对象
     */
    onChange?: (date: Date) => void;
    
    /** 
     * 输入框占位符文本
     * 当输入框没有值时显示的提示文字
     */
    placeholder?: string;
    
    /** 
     * 是否禁用整个组件
     * 设置为true时，组件不可交互且呈现禁用状态样式
     */
    disabled?: boolean;
    
    /** 
     * 禁用特定日期的判断函数
     * 返回true表示该日期应该被禁用，用户无法选择
     * @param date - 需要判断的日期对象
     * @returns boolean - true表示禁用该日期，false表示启用该日期
     * @example
     * ```typescript
     * disableDate: (date) => date.getDay() === 0 || date.getDay() === 6 // 禁用周末
     * ```
     */
    disableDate?: (date: Date) => boolean;
    
    /** 
     * 日期显示格式
     * 控制日期在输入框中的显示格式，遵循moment.js格式化规则
     * @example "YYYY-MM-DD", "MM/DD/YYYY", "YYYY年MM月DD日"
     */
    format?: string;
    
    /** 
     * 自定义类名
     * 添加到组件根元素上的CSS类名，可用于自定义样式
     */
    className?: string;
    
    /** 
     * 自定义样式对象
     * 直接应用于组件根元素的内联样式
     */
    style?: React.CSSProperties;
    
    /** 
     * 组件尺寸大小
     * 控制组件的整体尺寸，包括输入框高度和字体大小
     * 'small' - 紧凑型，'middle' - 默认中等尺寸，'large' - 大尺寸
     */
    size?: 'small' | 'middle' | 'large';
    
    /** 
     * 是否允许清除已选日期
     * 设置为true时，在输入框右侧显示清除按钮，点击可清空已选日期
     */
    allowClear?: boolean;
    
    /** 
     * 是否显示今天按钮
     * 在日期面板底部显示"今天"按钮，点击可快速跳转到当前日期
     */
    showToday?: boolean;
    
    /** 
     * 是否只读
     * 设置为true时，用户无法直接编辑输入框内容，但仍可通过日期面板选择
     */
    readonly?: boolean;
    
    /** 
     * 是否显示时间选择
     * 设置为true时，日期选择器同时包含时间选择功能
     */
    showTime?: boolean;
    
    /** 
     * 选择器类型
     * 决定日期选择器的粒度：
     * 'date' - 日期选择（默认）
     * 'month' - 月份选择
     * 'year' - 年份选择
     * 'week' - 周选择
     * 'quarter' - 季度选择
     */
    picker?: 'date' | 'month' | 'year' | 'week' | 'quarter';
    
    /** 
     * 是否显示边框
     * 设置为false时，移除输入框的边框样式
     */
    bordered?: boolean;
    
    /** 
     * 下拉面板的类名
     * 添加到日期选择面板根元素上的CSS类名，可用于自定义面板样式
     */
    dropdownClassName?: string;
    
    /** 
     * 下拉面板的样式对象
     * 直接应用于日期选择面板根元素的内联样式
     */
    popupStyle?: React.CSSProperties;
    
    /** 
     * 控制下拉面板是否展开
     * 用于受控模式，决定日期选择面板的显示状态
     */
    open?: boolean;
    
    /** 
     * 下拉面板展开状态变化回调
     * 当面板打开或关闭时触发
     * @param open - 新的展开状态
     */
    onOpenChange?: (open: boolean) => void;
    
    /** 
     * 是否自动获取焦点
     * 组件挂载后自动获得输入焦点
     */
    autoFocus?: boolean;
    
    /** 
     * 自定义日期单元格渲染
     * 允许自定义日期面板中每个日期单元格的内容
     * @param date - 当前单元格对应的日期对象
     * @returns React.ReactNode - 渲染的节点
     */
    dateRender?: (date: Date) => React.ReactNode;
    
    /** 
     * 在面板底部渲染额外的页脚
     * 可用于添加额外的操作按钮或信息展示
     * @returns React.ReactNode - 渲染的节点
     */
    renderExtraFooter?: () => React.ReactNode;
    
    /** 
     * 指定弹出框的挂载节点
     * 默认情况下，弹出框渲染到body上，可以通过该属性指定其他挂载点
     * @param node - 触发弹出框的DOM节点
     * @returns HTMLElement - 弹出框的挂载节点
     */
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    
    /** 
     * 自定义后缀图标
     * 替换默认的日历图标
     */
    suffixIcon?: React.ReactNode;
    
    /** 
     * 是否显示"此刻"按钮
     * 在时间选择面板底部显示"此刻"按钮，点击可选择当前时间
     */
    showNow?: boolean;
    
    /** 
     * 禁用时间的配置函数
     * 当showTime为true时，用于配置禁用的时间选项
     * @param date - 当前选中的日期对象
     * @returns DisabledTimeConfig - 时间禁用配置
     */
    disabledTime?: (date: Date) => DisabledTimeConfig;
    
    /** 
     * 分钟步进值
     * 设置分钟选择器的步进间隔，例如设置为15时，分钟只能选择00, 15, 30, 45
     */
    minuteStep?: number;
}