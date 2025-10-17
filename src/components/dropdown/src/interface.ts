import type React from 'react';

/**
 * 下拉菜单弹出位置选项
 * top: 上方居中弹出
 * topLeft: 上方左对齐弹出
 * topRight: 上方右对齐弹出
 * bottom: 下方居中弹出
 * bottomLeft: 下方左对齐弹出
 * bottomRight: 下方右对齐弹出
 * left: 左侧居中弹出
 * leftTop: 左侧上对齐弹出
 * leftBottom: 左侧下对齐弹出
 * right: 右侧居中弹出
 * rightTop: 右侧上对齐弹出
 * rightBottom: 右侧下对齐弹出
 */
export type DropdownPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

/**
 * 触发下拉菜单的方式
 * hover: 鼠标悬停触发
 * click: 鼠标点击触发
 * contextMenu: 右键菜单触发
 */
export type TriggerType = 'hover' | 'click' | 'contextMenu';

/**
 * 菜单项类型接口
 * 定义了下拉菜单中单个菜单项的属性结构
 */
export interface MenuItemType {
  /**
   * 菜单项唯一标识
   */
  key?: string;
  /**
   * 菜单项标签内容
   */
  label?: React.ReactNode;
  /**
   * 菜单项图标
   */
  icon?: React.ReactNode;
  /**
   * 是否禁用菜单项
   */
  disabled?: boolean;
  /**
   * 是否为分隔线
   */
  divider?: boolean;
  /**
   * 子菜单项
   */
  children?: MenuItemType[];
}

/**
 * 下拉菜单组件属性接口
 * 定义了 Dropdown 组件的所有可用属性
 */
export interface DropdownProps {
  /**
   * 触发方式
   * @default 'hover'
   */
  trigger?: TriggerType | TriggerType[];

  /**
   * 下拉菜单弹出位置
   * @default 'bottomLeft'
   */
  placement?: DropdownPlacement;

  /**
   * 下拉菜单是否可见（受控模式）
   */
  open?: boolean;

  /**
   * 下拉菜单是否可见（非受控模式）
   */
  defaultOpen?: boolean;

  /**
   * 下拉菜单显隐状态改变回调
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * 是否禁用下拉菜单
   * @default false
   */
  disabled?: boolean;

  /**
   * 下拉菜单内容
   */
  menu?: React.ReactNode;

  /**
   * 菜单项配置数组
   */
  items?: MenuItemType[];

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 下拉菜单根元素的类名
   */
  overlayClassName?: string;

  /**
   * 下拉菜单根元素的样式
   */
  overlayStyle?: React.CSSProperties;

  /**
   * 指定下拉菜单渲染的父节点
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * 是否显示箭头
   * @default false
   */
  arrow?: boolean;

  /**
   * 下拉菜单显示时是否自动获取焦点
   * @default false
   */
  autoFocus?: boolean;

  /**
   * 隐藏后是否销毁下拉菜单
   * @default false
   */
  destroyPopupOnHide?: boolean;

  /**
   * 鼠标移入后延时多少才显示下拉菜单，单位：秒
   * @default 0.15
   */
  mouseEnterDelay?: number;

  /**
   * 鼠标移出后延时多少才隐藏下拉菜单，单位：秒
   * @default 0.1
   */
  mouseLeaveDelay?: number;

  /**
   * 子元素
   */
  children: React.ReactNode;
}