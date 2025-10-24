import React, { useState, useEffect } from 'react';
import type { MessageProps } from '../interface';
import classNames from 'classnames';
import '../style/index.scss';

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

  const [visible, setVisible] = useState(true);

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

export default Message;