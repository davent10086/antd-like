import React, { createContext} from 'react';
import type { LayoutProps } from '../interface';
import classNames from 'classnames';
import '../style/index.scss';

/**
 * LayoutContext用于在Layout组件和其子组件之间传递侧边栏相关的操作方法
 */
export const LayoutContext = createContext({
  siderHook: {
    addSider: () => {},
    removeSider: () => {}
  }
});

/**
 * Layout组件是页面布局的基础容器组件
 * @param props - Layout组件的属性
 * @param props.direction - 布局方向，可选值为 'horizontal' | 'vertical'，默认为 'horizontal'
 * @param props.children - 布局内的子元素
 * @param props.className - 自定义CSS类名
 * @param props.hasSider - 是否包含侧边栏
 * @returns 返回一个布局容器DOM元素
 */
const Layout: React.FC<LayoutProps> = (props) => {
  const { 
    direction = 'horizontal', 
    children, 
    className, 
    hasSider,
    ...restProps 
  } = props;

  const prefixCls = 'ant-layout';

  // 构建组件的CSS类名
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : false,
      [`${prefixCls}-vertical`]: direction === 'vertical',
    },
    className,
  );

  return (
    <LayoutContext.Provider
      value={{
        siderHook: {
          addSider: () => {},
          removeSider: () => {}
        }
      }}
    >
      <div className={classes} {...restProps}>
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;