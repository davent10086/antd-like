# Antd-Like React Component Library

基于 React、TypeScript 和 Vite 构建的现代化组件库模板。该模板提供了最小化的设置，让 React 在 Vite 中运行并支持热模块替换（HMR）和 ESLint 规则。

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [组件库开发进度](#组件库开发进度)
- [开发指南](#开发指南)
- [项目结构](#项目结构)
- [ESLint 配置扩展](#eslint-配置扩展)
- [React 编译器](#react-编译器)

## 项目概述

这是一个使用最新技术栈构建的 React 组件库开发模板，旨在帮助开发者快速启动组件库项目。项目采用现代化的工具链，具有快速的开发服务器启动速度和热更新功能。

该模板提供了完整的开发环境，包括 TypeScript 类型检查、Sass 样式支持、Jest 测试框架等，可以作为构建企业级 UI 组件库的基础。

## 技术栈

- [React](https://react.dev/) 19.1.1 - 用于构建用户界面的 JavaScript 库
- [Vite](https://vitejs.dev/) 7.1.7 - 新一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) ~5.9.3 - JavaScript 的超集，添加了静态类型
- [Sass](https://sass-lang.com/) - CSS 扩展语言
- [Jest](https://jestjs.io/) - JavaScript 测试框架
- [Testing Library](https://testing-library.com/) - 测试工具库
- [Ant Design](https://ant.design/) 5.27.4 - React UI 组件库（参考样式）

## 快速开始

### 克隆和安装

```bash
# 克隆项目
git clone <repository-url>
cd antd-like

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 运行测试
npm test
```

### 构建

```bash
# 构建生产版本（应用）
npm run build

# 预览构建结果
npm run preview

# 构建组件库（打包发布版本）
npm run build:lib

# 清理构建产物
npm run clean

# 构建并查看包大小分析报告
npm run build:analyze
```

## 组件库开发进度

### 已完成组件

- [x] Button 按钮组件
- [x] Form 表单组件
- [x] Icon 图标组件
- [x] Card 卡片组件
- [x] DatePicker 日期选择器组件
- [x] Input 输入框组件
- [x] Layout 布局组件
- [x] Tooltip 文字提示组件
- [x] Modal 对话框组件
- [x] Sider 侧边栏组件

### 待开发组件

以下组件尚未实现，但已在目录结构中预留位置：

- [ ] Alert 警告提示
- [ ] AutoComplete 自动完成
- [ ] Avatar 头像
- [ ] BackTop 回到顶部
- [ ] Badge 徽标数
- [ ] Breadcrumb 面包屑
- [ ] Cascader 级联选择
- [ ] Checkbox 多选框
- [ ] Collapse 折叠面板
- [ ] Comment 评论
- [ ] Descriptions 描述列表
- [ ] Divider 分割线
- [ ] Drawer 抽屉
- [ ] Dropdown 下拉菜单
- [ ] Empty 空状态
- [ ] Grid 栅格
- [ ] Image 图片
- [ ] List 列表
- [ ] Mentions 提及
- [ ] Menu 导航菜单
- [ ] Message 全局提示
- [ ] Notification 通知提醒框
- [ ] PageHeader 页头
- [ ] Pagination 分页
- [ ] Popconfirm 气泡确认框
- [ ] Popover 气泡卡片
- [ ] Progress 进度条
- [ ] Radio 单选框
- [ ] Rate 评分
- [ ] Result 结果
- [ ] Select 选择器
- [ ] Skeleton 骨架屏
- [ ] Slider 滑动输入条
- [ ] Space 间距
- [ ] Spin 加载中
- [ ] Steps 步骤条
- [ ] Switch 开关
- [ ] Table 表格
- [ ] Tabs 标签页
- [ ] Tag 标签
- [ ] TimePicker 时间选择框
- [ ] Timeline 时间轴
- [ ] Transfer 穿梭框
- [ ] Tree 树形控件
- [ ] TreeSelect 树选择
- [ ] Upload 上传

## 开发指南

### 运行组件 Demo

要查看特定组件的 demo，需要修改 [src/main.tsx](file:///f:/antd-like/src/main.tsx) 文件，导入并渲染相应的 demo 组件：

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import IconDemo from './components/icon/demo/basic'; // 导入要展示的 demo
import './styles/index.scss';

// 渲染 demo 组件
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IconDemo />
  </React.StrictMode>,
);
```

然后运行开发服务器：

```bash
npm run dev
```

### 创建新组件

1. 在 [src/components](file:///f:/antd-like/src/components) 目录下创建新组件文件夹
2. 在组件文件夹中创建以下子目录和文件：
   - `index.tsx` - 组件主文件
   - `interface.ts` - 组件接口定义
   - `style/index.scss` - 组件样式文件
   - `demo/` - 组件演示文件夹
   - `__test__/` - 组件测试文件夹

### 编写测试

使用 Jest 和 Testing Library 编写组件测试：

```bash
# 运行所有测试
npm test

# 运行特定组件测试
npm test -- src/components/button/__tests__/button.test.tsx

# 以监听模式运行测试
npm run test:watch
```

### 样式规范

1. 使用 SCSS 预处理器
2. 遵循 BEM 命名规范
3. 使用项目提供的主题变量
4. 在 [src/themes](file:///f:/antd-like/src/themes) 目录中定义全局样式变量

## 项目结构

```
src/
├── components/           # 组件目录
│   ├── button/           # 按钮组件
│   ├── card/             # 卡片组件
│   ├── date-picker/      # 日期选择器组件
│   ├── form/             # 表单组件
│   ├── icon/             # 图标组件
│   ├── input/            # 输入框组件
│   ├── layout/           # 布局组件
│   ├── tooltip/          # 文字提示组件
│   └── ...               # 其他预留组件
├── styles/               # 全局样式
└── themes/               # 主题变量
    ├── index.scss        # 主题入口文件
    ├── _color.scss       # 颜色变量
    ├── _mixin.scss       # 混合宏
    ├── _motion.scss      # 动效变量
    ├── _size.scss        # 尺寸变量
    └── dark/             # 暗色主题
```

## Icon 组件详情

Icon 组件是一套完整的图标解决方案，具有以下特性：

- 提供多套不同风格的图标（线框、实色）
- 支持自定义尺寸和颜色
- 支持旋转和动画效果
- 按需加载，支持 Tree Shaking
- 完整的 TypeScript 类型支持

### 使用方法

``tsx
import { CheckOutlined, StarFilled, SettingOutlined } from './components/icon';

// 基本使用
<CheckOutlined />

// 自定义尺寸和颜色
<StarFilled style={{ fontSize: '24px', color: '#ffcc00' }} />

// 旋转
<SettingOutlined rotate={90} />

// 旋转动画
<LoadingOutlined spin />
```

### 支持的图标

- ArrowOutlined - 箭头图标
- CheckOutlined - 勾选图标
- CloseOutlined - 关闭图标
- HeartFilled - 心形图标（实心）
- LoadingOutlined - 加载图标
- SearchOutlined - 搜索图标
- SettingOutlined - 设置图标
- StarFilled - 星形图标（实心）
- UserOutlined - 用户图标

## Modal 组件

Modal 组件用于在当前页面正中打开一个浮层，承载相应的操作，具有以下特性：

- 支持基本的弹窗显示和隐藏
- 可自定义标题、内容和底部按钮
- 支持键盘操作（ESC关闭）
- 点击遮罩层关闭
- 可自定义宽度
- 支持确认加载状态

#### 使用示例

```tsx
import React, { useState } from 'react';
import { Modal } from './components/modal';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // 处理确认逻辑
    setVisible(false);
  };

  const handleCancel = () => {
    // 处理取消逻辑
    setVisible(false);
  };

  return (
    <>
      <button onClick={showModal}>Open Modal</button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
```

## 组件结构说明

每个组件都遵循统一的目录结构：

```
component-name/
├── index.tsx              # 组件主文件
├── interface.ts           # 组件接口定义（可选）
├── style/                 # 组件样式目录
│   ├── index.scss         # 样式主文件
│   └── index.ts           # 样式导入文件
├── demo/                  # 组件演示目录
│   └── basic.tsx          # 基本演示文件
├── __tests__/             # 组件测试目录
│   └── index.test.tsx     # 组件测试文件
└── ...                    # 其他特定文件或子目录
```

### Button 组件

按钮组件用于触发操作。

```
button/
├── index.tsx              # 按钮组件主文件
├── style/
│   ├── index.scss         # 按钮样式
│   └── index.ts           # 样式导入
├── demo/
│   └── basic.tsx          # 按钮演示
└── __tests__/
    └── button.test.tsx    # 按钮测试
```

### Form 组件

表单组件用于数据录入和验证。

```
form/
├── index.ts               # 表单入口文件
├── src/                   # 表单源码目录
│   ├── Form.tsx           # 表单主组件
│   ├── FormItem.tsx       # 表单项组件
│   └── useForm.ts         # 表单Hook
├── style/
│   ├── index.scss         # 表单样式
│   └── index.ts           # 样式导入
├── demo/
│   └── basic.tsx          # 表单演示
└── __tests__/
    ├── Form.test.tsx      # 表单测试
    ├── FormItem.test.tsx  # 表单项测试
    └── useForm.test.tsx   # 表单Hook测试
```

### Icon 组件

图标组件提供了一套完整的图标解决方案。

```
icon/
├── index.tsx              # 图标组件主文件
├── interface.ts           # 图标接口定义
├── utils.ts               # 工具函数
├── svgs/                  # 原始SVG文件
├── icons/                 # 转换后的图标组件
├── style/
│   ├── index.scss         # 图标样式
│   └── index.ts           # 样式导入
├── demo/
│   └── basic.tsx          # 图标演示
└── __tests__/
    └── Icon.test.tsx      # 图标测试
```

### Card 组件

Card 组件用于展示信息块，具有以下特性：

- 标题和副标题支持
- 自定义操作区域
- 可选边框和悬停效果
- 加载状态展示
- 封面图片支持
- 底部操作区域
- 多种尺寸（默认和小尺寸）
- 卡片嵌套支持
- 元信息展示（头像、标题、描述）

### DatePicker 组件详情

DatePicker 组件是一个日期选择组件，具有以下特性：

- 基础日期选择功能
- 时间选择功能（通过 showTime 属性启用）
- 受控与非受控模式支持
- 禁用状态（disabled）和只读状态（readonly）
- 多种尺寸（large, middle, small）
- 自定义日期格式（format 属性）
- 占位符文本（placeholder 属性）
- 清除已选日期（allowClear 属性）
- 显示"今天"按钮（showToday 属性）
- 自定义后缀图标（suffixIcon 属性）
- 边框显示控制（bordered 属性）
- 自定义面板类名（dropdownClassName 属性）和样式（popupStyle 属性）
- 自动获取焦点（autoFocus 属性）
- 面板展开状态控制（open 属性）和状态变化回调（onOpenChange 属性）
- 自定义页脚渲染（renderExtraFooter 属性）

### Layout 组件

布局组件用于构建页面整体布局结构，具有以下特性：

- 提供经典页面布局方案（上-中-下布局或侧边栏布局）
- 支持响应式设计
- 灵活的自定义配置
- 与其它组件良好配合

#### 组件构成

Layout 组件由以下子组件构成：

- Layout - 布局容器组件
- Layout.Header - 顶部导航区域
- Layout.Sider - 侧边栏区域
- Layout.Content - 主要内容区域
- Layout.Footer - 底部区域

#### 使用示例

``tsx
import { Layout } from './components/layout';

const { Header, Sider, Content, Footer } = Layout;

// 基本布局
<Layout>
  <Header>Header</Header>
  <Content>Content</Content>
  <Footer>Footer</Footer>
</Layout>

// 侧边栏布局
<Layout>
  <Header>Header</Header>
  <Layout>
    <Sider>Sider</Sider>
    <Content>Content</Content>
  </Layout>
  <Footer>Footer</Footer>
</Layout>
```

## ESLint 配置扩展

如果要开发生产应用程序，建议更新配置以启用类型感知的 lint 规则：

``js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

您还可以安装 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) 和 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) 以获得 React 特定的 lint 规则：

``js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## React 编译器

由于 React 编译器对开发和构建性能的影响，此模板未启用 React 编译器。要添加它，请参阅 [相关文档](https://react.dev/learn/react-compiler/installation)。