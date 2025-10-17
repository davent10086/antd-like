import React, { useEffect, useRef } from 'react';
import type { ModalProps } from '../interface';
import classNames from 'classnames';
import '../style/index.scss';

/**
 * Modal组件用于在当前页面正中打开一个浮层，承载相应的操作
 * 
 * @param props - Modal组件的属性
 * @param props.visible - 是否可见
 * @param props.title - 标题
 * @param props.closable - 是否显示右上角的关闭按钮
 * @param props.onOk - 点击确定回调
 * @param props.onCancel - 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调
 * @param props.maskClosable - 点击蒙层是否允许关闭
 * @param props.okText - 确认按钮文字
 * @param props.cancelText - 取消按钮文字
 * @param props.width - 宽度
 * @param props.footer - 底部内容
 * @param props.forceRender - 强制渲染 Modal
 * @param props.confirmLoading - 确定按钮 loading
 * @param props.children - 子元素
 * @returns 返回Modal组件
 */
const Modal: React.FC<ModalProps> = (props) => {
  const {
    visible = false,
    title,
    closable = true,
    onOk,
    onCancel,
    maskClosable = true,
    okText = '确定',
    cancelText = '取消',
    width = 520,
    footer,
    forceRender = false,
    confirmLoading = false,
    children,
    className,
    ...restProps
  } = props;

  const prefixCls = 'ant-modal';
  const modalRef = useRef<HTMLDivElement>(null);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible && onCancel) {
        onCancel();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onCancel]);

  // 点击遮罩层关闭
  const onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget && onCancel) {
      onCancel();
    }
  };

  // 渲染底部内容
  const renderFooter = () => {
    if (footer !== undefined) {
      return footer;
    }

    return (
      <>
        <button onClick={onCancel} className={`${prefixCls}-footer-cancel-btn`}>
          {cancelText}
        </button>
        <button 
          onClick={onOk} 
          className={`${prefixCls}-footer-ok-btn`}
          disabled={confirmLoading}
        >
          {confirmLoading ? '加载中...' : okText}
        </button>
      </>
    );
  };

  // 如果不可见且不强制渲染，则不渲染组件
  if (!visible && !forceRender) {
    return null;
  }

  const classes = classNames(prefixCls, className);
  const wrapClasses = classNames(`${prefixCls}-wrap`, {
    [`${prefixCls}-wrap-hidden`]: !visible,
  });

  return (
    <div className={wrapClasses} onClick={onMaskClick}>
      <div 
        ref={modalRef}
        className={classes}
        style={{ width }}
        role="dialog"
        {...restProps}
      >
        <div className={`${prefixCls}-content`}>
          {closable && (
            <button 
              className={`${prefixCls}-close`} 
              onClick={onCancel}
              aria-label="Close"
            >
              <span className={`${prefixCls}-close-x`}>×</span>
            </button>
          )}
          {title && (
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-title`}>{title}</div>
            </div>
          )}
          <div className={`${prefixCls}-body`}>{children}</div>
          <div className={`${prefixCls}-footer`}>{renderFooter()}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;