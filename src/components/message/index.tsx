import Message from './src/Message';
import MessageHolder from './src/MessageHolder';
import useMessage from './src/useMessage';
import type { MessageProps, MessageInstance, MessageConfig } from './interface';

// 创建全局message实例
const message: MessageInstance = {
  open: (config) => {
    const instance = (window as any).__ANTD_MESSAGE_INSTANCE__ as MessageInstance;
    return instance?.open(config);
  },
  success: (content, duration) => {
    const instance = (window as any).__ANTD_MESSAGE_INSTANCE__ as MessageInstance;
    return instance?.success(content, duration);
  },
  info: (content, duration) => {
    const instance = (window as any).__ANTD_MESSAGE_INSTANCE__ as MessageInstance;
    return instance?.info(content, duration);
  },
  warning: (content, duration) => {
    const instance = (window as any).__ANTD_MESSAGE_INSTANCE__ as MessageInstance;
    return instance?.warning(content, duration);
  },
  error: (content, duration) => {
    const instance = (window as any).__ANTD_MESSAGE_INSTANCE__ as MessageInstance;
    return instance?.error(content, duration);
  },
  loading: (content, duration) => {
    const instance = (window as any).__ANTD_MESSAGE_INSTANCE__ as MessageInstance;
    return instance?.loading(content, duration);
  },
  destroy: () => {
    const instance = (window as any).__ANTD_MESSAGE_INSTANCE__ as MessageInstance;
    return instance?.destroy();
  },
};

export type { MessageProps, MessageInstance, MessageConfig };
export { Message, MessageHolder, useMessage };
export default message;