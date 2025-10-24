import type { ReactNode } from 'react';

export type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

export interface MessageProps {
  /**
   * 消息内容
   */
  content: ReactNode;

  /**
   * 消息类型
   * @default 'info'
   */
  type?: MessageType;

  /**
   * 自定义图标
   */
  icon?: ReactNode;

  /**
   * 消息持续时间，单位毫秒。设置为0时不会自动关闭
   * @default 3000
   */
  duration?: number;

  /**
   * 自定义 CSS class 名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 关闭时触发的回调函数
   */
  onClose?: () => void;

  /**
   * 自定义内联样式前缀类名
   * @default 'ant-message'
   */
  prefixCls?: string;
}

export interface MessageInstance {
  /**
   * 成功消息
   */
  success: (content: ReactNode, duration?: number) => void;

  /**
   * 信息消息
   */
  info: (content: ReactNode, duration?: number) => void;

  /**
   * 警告消息
   */
  warning: (content: ReactNode, duration?: number) => void;

  /**
   * 错误消息
   */
  error: (content: ReactNode, duration?: number) => void;

  /**
   * 加载消息
   */
  loading: (content: ReactNode, duration?: number) => void;

  /**
   * 打开消息
   */
  open: (config: MessageConfig) => void;

  /**
   * 销毁所有消息
   */
  destroy: () => void;
}

export interface MessageConfig extends MessageProps {
  /**
   * 消息唯一标识
   */
  key?: string | number;
}