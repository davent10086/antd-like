import React from 'react';
// @ts-ignore
import './style/index.scss';

/**
 * Card Props 属性接口定义
 */
export interface CardProps {
  /** 卡片标题 */
  title?: React.ReactNode;
  
  /** 卡片右上角的操作区域 */
  extra?: React.ReactNode;
  
  /** 是否有边框 */
  bordered?: boolean;
  
  /** 鼠标移过时可浮起 */
  hoverable?: boolean;
  
  /** 当前激活页签的 key */
  activeTabKey?: string;
  
  /** 初始化选中页签的 key */
  defaultActiveTabKey?: string;
  
  /** 当卡片内容还在加载中时，可以用 loading 展示一个占位 */
  loading?: boolean;
  
  /** 卡片尺寸 */
  size?: 'default' | 'small';
  
  /** 卡片类型 */
  type?: 'inner';
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 卡片封面 */
  cover?: React.ReactNode;
  
  /** 卡片操作组，位置在卡片底部 */
  actions?: React.ReactNode[];
  
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * CardMeta Props 属性接口定义
 */
interface CardMetaProps {
  /** 头像 */
  avatar?: React.ReactNode;
  
  /** 标题 */
  title?: React.ReactNode;
  
  /** 描述 */
  description?: React.ReactNode;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
}

interface CardType extends React.FC<CardProps> {
  Meta: React.FC<CardMetaProps>;
}

/**
 * Card 组件
 * 
 * @param props - Card 组件属性
 * @param props.title - 卡片标题
 * @param props.extra - 卡片右上角的操作区域
 * @param props.bordered - 是否有边框，默认为 true
 * @param props.hoverable - 鼠标移过时可浮起，默认为 false
 * @param props.loading - 当卡片内容还在加载中时，可以用 loading 展示一个占位，默认为 false
 * @param props.size - 卡片尺寸，可选 'default' | 'small'，默认为 'default'
 * @param props.type - 卡片类型
 * @param props.className - 自定义类名
 * @param props.style - 自定义样式
 * @param props.cover - 卡片封面
 * @param props.actions - 卡片操作组，位置在卡片底部
 * @param props.children - 子元素
 * @param props.activeTabKey - 当前激活页签的 key
 * @param props.defaultActiveTabKey - 初始化选中页签的 key
 * @returns Card 组件
 */
const Card: CardType = (props) => {
  const {
    title,
    extra,
    bordered = true,
    hoverable = false,
    loading = false,
    size = 'default',
    type,
    className = '',
    style,
    cover,
    actions,
    children,
  } = props;

  const prefixCls = 'ant-card';

  // 构建卡片类名
  const classes = [
    prefixCls,
    className,
    `${prefixCls}-${size}`,
    {
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-hoverable`]: hoverable,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-contain-grid`]: false, // TODO: 后续实现网格支持
      [`${prefixCls}-contain-tabs`]: false, // TODO: 后续实现tabs支持
      [`${prefixCls}-type-${type}`]: type,
    }
  ];

  /**
   * 将对象转换为类名字符串
   * 
   * @param classList - 类名数组，可以包含字符串或对象
   * @returns 处理后的类名字符串
   */
  const getClasses = (classList: any[]): string => {
    return classList
      .flat()
      .map(item => {
        if (typeof item === 'object' && item !== null) {
          return Object.keys(item)
            .filter(key => item[key])
            .join(' ');
        }
        return item;
      })
      .filter(Boolean)
      .join(' ');
  };

  /**
   * 渲染卡片头部
   * 
   * @returns 卡片头部 JSX 元素或 null
   */
  const renderHead = () => {
    if (!title && !extra) {
      return null;
    }

    return (
      <div className={`${prefixCls}-head`}>
        <div className={`${prefixCls}-head-wrapper`}>
          {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
          {extra && <div className={`${prefixCls}-head-extra`}>{extra}</div>}
        </div>
      </div>
    );
  };

  /**
   * 渲染卡片内容
   * 
   * @returns 卡片内容 JSX 元素
   */
  const renderBody = () => {
    // TODO: 添加loading状态下的骨架屏
    return (
      <div className={`${prefixCls}-body`}>
        {loading ? <div>Loading...</div> : children}
      </div>
    );
  };

  /**
   * 渲染卡片操作
   * 
   * @returns 卡片操作 JSX 元素或 null
   */
  const renderActions = () => {
    if (!actions || actions.length === 0) {
      return null;
    }

    return (
      <ul className={`${prefixCls}-actions`}>
        {actions.map((action, index) => (
          <li key={`action-${index}`}>{action}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className={getClasses(classes)} style={style}>
      {cover && <div className={`${prefixCls}-cover`}>{cover}</div>}
      {renderHead()}
      {renderBody()}
      {renderActions()}
    </div>
  );
};

/**
 * CardMeta 组件
 * 
 * @param props - CardMeta 组件属性
 * @param props.avatar - 头像
 * @param props.title - 标题
 * @param props.description - 描述
 * @param props.className - 自定义类名
 * @param props.style - 自定义样式
 * @returns CardMeta 组件
 */
const CardMeta: React.FC<CardMetaProps> = ({
  avatar,
  title,
  description,
  className = '',
  style,
}) => {
  const prefixCls = 'ant-card-meta';
  const classes = [prefixCls, className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {avatar && <div className={`${prefixCls}-avatar`}>{avatar}</div>}
      {(title || description) && (
        <div className={`${prefixCls}-detail`}>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          {description && (
            <div className={`${prefixCls}-description`}>{description}</div>
          )}
        </div>
      )}
    </div>
  );
};

Card.Meta = CardMeta;

export default Card;