import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { MessageConfig, MessageInstance } from '../interface';
import Message from './Message';

export interface MessageHolderProps {
  prefixCls?: string;
}

export interface MessageInstanceInternal extends MessageConfig {
  key: string;
}

const MessageHolder: React.FC<MessageHolderProps> = (props) => {
  const { prefixCls = 'ant-message' } = props;
  const [messages, setMessages] = useState<MessageInstanceInternal[]>([]);
  const messageRefs = useRef<Record<string, HTMLElement | null>>({});

  const removeMessage = useCallback((key: string) => {
    setMessages(prev => prev.filter(msg => msg.key !== key));
  }, []);

  const addMessage = useCallback((config: MessageConfig): string => {
    const key = config.key?.toString() || Date.now().toString();
    const messageConfig: MessageInstanceInternal = {
      ...config,
      key,
    };

    setMessages(prev => [...prev, messageConfig]);
    
    // 如果设置了duration且大于0，则自动移除
    if (config.duration !== undefined && config.duration > 0) {
      setTimeout(() => {
        removeMessage(key);
      }, config.duration);
    }

    return key;
  }, [removeMessage]);

  const getMessageInstance = useCallback((): MessageInstance => {
    return {
      open: (config) => {
        return addMessage(config);
      },
      success: (content, duration) => {
        const config: MessageConfig = {
          content,
          type: 'success',
          duration,
        };
        return addMessage(config);
      },
      info: (content, duration) => {
        const config: MessageConfig = {
          content,
          type: 'info',
          duration,
        };
        return addMessage(config);
      },
      warning: (content, duration) => {
        const config: MessageConfig = {
          content,
          type: 'warning',
          duration,
        };
        return addMessage(config);
      },
      error: (content, duration) => {
        const config: MessageConfig = {
          content,
          type: 'error',
          duration,
        };
        return addMessage(config);
      },
      loading: (content, duration) => {
        const config: MessageConfig = {
          content,
          type: 'loading',
          duration,
        };
        return addMessage(config);
      },
      destroy: () => {
        setMessages([]);
      },
    };
  }, [addMessage]);

  // 将消息实例暴露给全局
  useEffect(() => {
    const messageInstance = getMessageInstance();
    // 在window上挂载全局message实例
    (window as any).__ANTD_MESSAGE_INSTANCE__ = messageInstance;
    
    return () => {
      delete (window as any).__ANTD_MESSAGE_INSTANCE__;
    };
  }, [getMessageInstance]);

  return (
    <>
      {messages.map((message) => (
        <div 
          key={message.key} 
          ref={(ref: HTMLDivElement | null) => { messageRefs.current[message.key] = ref; }}
        >
          <Message
            {...message}
            prefixCls={prefixCls}
            onClose={() => removeMessage(message.key)}
          />
        </div>
      ))}
    </>
  );
};

export default MessageHolder;