
 import React, { useRef, useEffect } from 'react';
import type { MessageInstance, MessageConfig } from '../interface';
import type { MessageProps } from '../interface';
import classNames from 'classnames';
import '../style/index.scss';


export interface UseMessage {
  (): [MessageInstance, React.ReactElement];
}

export const useMessage: UseMessage = () => {
  const [messages, setMessages] = React.useState<React.ReactElement[]>([]);
  const messageRef = useRef<MessageInstance | null>(null);
  
  const addMessage = (config: MessageConfig) => {
    const key = config.key?.toString() || Date.now().toString();
    const newMessage = (
      <MessageHolderItem 
        key={key} 
        config={{...config, key}} 
        onClose={() => removeMessage(key)}
      />
    );
    
    setMessages(prev => [...prev, newMessage]);
    return key;
  };
  
  const removeMessage = (key: string) => {
    setMessages(prev => prev.filter(message => message.key !== key));
  };
  
  const createMessageInstance = (): MessageInstance => {
    return {
      open: (config) => addMessage(config),
      success: (content, duration) => {
        return addMessage({ content, type: 'success', duration });
      },
      info: (content, duration) => {
        return addMessage({ content, type: 'info', duration });
      },
      warning: (content, duration) => {
        return addMessage({ content, type: 'warning', duration });
      },
      error: (content, duration) => {
        return addMessage({ content, type: 'error', duration });
      },
      loading: (content, duration) => {
        return addMessage({ content, type: 'loading', duration });
      },
      destroy: () => {
        setMessages([]);
      }
    };
  };
  
  if (!messageRef.current) {
    messageRef.current = createMessageInstance();
  }
  
  const contextHolder = (
    <div className="ant-message-holder">
      {messages}
    </div>
  );
  
  return [messageRef.current, contextHolder];
};

interface MessageHolderItemProps {
  config: MessageConfig & { key: string };
  onClose: () => void;
}

const MessageHolderItem: React.FC<MessageHolderItemProps> = ({ config, onClose }) => {
  const { duration = 3000, ...restConfig } = config;
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, onClose]);
  
  return <Message {...restConfig} onClose={onClose} />;
};

// 单独导入Message组件避免循环依赖
const Message: React.FC<MessageProps> = (props) => {
  const {
    content,
    type = 'info',
    icon,
    duration = 3000,
    className,
    style,
    onClose,
    prefixCls = 'ant-message',
  } = props;

  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    return () => {
      onClose?.();
    };
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) {
    return null;
  }

  const classString = classNames(
    prefixCls,
    `${prefixCls}-${type}`,
    className,
  );

  return (
    <div className={classString} style={style}>
      <div className={`${prefixCls}-container`}>
        {icon ? (
          <span className={`${prefixCls}-icon`}>{icon}</span>
        ) : null}
        <span className={`${prefixCls}-content`}>{content}</span>
      </div>
    </div>
  );
};

export default useMessage;