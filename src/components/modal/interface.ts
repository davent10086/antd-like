import type React from 'react';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 是否可见
   * @default false
   */
  visible?: boolean;
  
  /**
   * 标题
   */
  title?: React.ReactNode;
  
  /**
   * 是否显示右上角的关闭按钮
   * @default true
   */
  closable?: boolean;
  
  /**
   * 点击确定回调
   */
  onOk?: () => void;
  
  /**
   * 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调
   */
  onCancel?: () => void;
  
  /**
   * 点击蒙层是否允许关闭
   * @default true
   */
  maskClosable?: boolean;
  
  /**
   * 确认按钮文字
   */
  okText?: string;
  
  /**
   * 取消按钮文字
   */
  cancelText?: string;
  
  /**
   * 宽度
   * @default 520
   */
  width?: number | string;
  
  /**
   * 底部内容
   */
  footer?: React.ReactNode;
  
  /**
   * 强制渲染 Modal
   * @default false
   */
  forceRender?: boolean;
  
  /**
   * 确定按钮 loading
   */
  confirmLoading?: boolean;
}