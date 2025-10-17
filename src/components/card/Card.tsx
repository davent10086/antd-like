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
  
  /** 默认激活页签的 key */
  defaultActiveTabKey?: string;
  
  /** 是否加载中 */
  loading?: boolean;
  
  /** 卡片尺寸 */
  size?: 'default' | 'small';
  
  /** 卡片类型 */
  type?: 'inner';
  
  /** 页签标题列表 */
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  
  /** 页签切换回调 */
  onTabChange?: (key: string) => void;
  
  /** 卡片封面 */
  cover?: React.ReactNode;
  
  /** 卡片操作组 */
  actions?: React.ReactNode[];
  
  /** 子元素 */
  children?: React.ReactNode;
  
  /** 自定义类名 */
  className?: string;
}

/**
 * Card 组件的子组件 Meta 的属性接口定义
 */
export interface CardMetaProps {
  /** Meta 头像 */
  avatar?: React.ReactNode;
  
  /** Meta 标题 */
  title?: React.ReactNode;
  
  /** Meta 描述 */
  description?: React.ReactNode;
}

/**
 * Card 组件的子组件 Meta
 * @param props CardMetaProps 属性
 * @returns CardMeta 组件
 */
export const CardMeta: React.FC<CardMetaProps> = ({ avatar, title, description }) => {
  return (
    <div className="ant-card-meta">
      {avatar && <div className="ant-card-meta-avatar">{avatar}</div>}
      <div className="ant-card-meta-detail">
        {title && <div className="ant-card-meta-title">{title}</div>}
        {description && <div className="ant-card-meta-description">{description}</div>}
      </div>
    </div>
  );
};

// 定义 Card 组件类型，包含静态属性
type CardType = React.FC<CardProps> & {
  Meta: React.FC<CardMetaProps>;
};

/**
 * Card 组件
 * @param props CardProps 属性
 * @returns Card 组件
 */
const Card: React.FC<CardProps> = ({
  title,
  extra,
  bordered = true,
  hoverable = false,
  activeTabKey,
  defaultActiveTabKey,
  loading = false,
  size = 'default',
  type,
  tabList = [],
  onTabChange,
  cover,
  actions,
  children,
  className = '',
}) => {
  // 处理 tab 相关逻辑
  const [innerActiveTabKey, setInnerActiveTabKey] = React.useState(defaultActiveTabKey || (tabList.length > 0 ? tabList[0].key : ''));
  const mergedActiveTabKey = activeTabKey || innerActiveTabKey;
  
  const onInternalTabChange = (key: string) => {
    if (!activeTabKey) {
      setInnerActiveTabKey(key);
    }
    onTabChange?.(key);
  };

  // 处理加载状态
  const renderCard = () => {
    if (loading) {
      return <div className="ant-card-loading">loading...</div>;
    }
    return children;
  };

  // 处理 tabs 渲染
  const renderTabs = () => {
    if (tabList.length === 0) return null;
    
    return (
      <div className="ant-card-tabs">
        {tabList.map(item => (
          <div
            key={item.key}
            className={`ant-card-tab ${mergedActiveTabKey === item.key ? 'ant-card-tab-active' : ''}`}
            onClick={() => onInternalTabChange(item.key)}
          >
            {item.tab}
          </div>
        ))}
      </div>
    );
  };

  // 处理 actions 渲染
  const renderActions = () => {
    if (!actions || actions.length === 0) return null;
    
    return (
      <ul className="ant-card-actions">
        {actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`
      ant-card
      ${bordered ? 'ant-card-bordered' : ''}
      ${hoverable ? 'ant-card-hoverable' : ''}
      ${size === 'small' ? 'ant-card-small' : ''}
      ${type === 'inner' ? 'ant-card-type-inner' : ''}
      ${className}
    `.trim()}>
      {cover && <div className="ant-card-cover">{cover}</div>}
      {title || extra ? (
        <div className="ant-card-head">
          {title && <div className="ant-card-head-title">{title}</div>}
          {extra && <div className="ant-card-extra">{extra}</div>}
        </div>
      ) : null}
      {renderTabs()}
      <div className="ant-card-body">
        {renderCard()}
      </div>
      {renderActions()}
    </div>
  );
};

// 添加 Meta 子组件
(Card as CardType).Meta = CardMeta;

export default Card as CardType;