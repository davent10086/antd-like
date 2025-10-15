# My React Component Library

基于 React、TypeScript 和 Vite 构建的现代化组件库模板。该模板提供了最小化的设置，让 React 在 Vite 中运行并支持热模块替换（HMR）和 ESLint 规则。

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [组件库开发进度](#组件库开发进度)
- [ESLint 配置扩展](#eslint-配置扩展)
- [React 编译器](#react-编译器)

## 项目概述

这是一个使用最新技术栈构建的 React 组件库开发模板，旨在帮助开发者快速启动组件库项目。项目采用现代化的工具链，具有快速的开发服务器启动速度和热更新功能。

## 技术栈

- [React](https://react.dev/) 19.1.1 - 用于构建用户界面的 JavaScript 库
- [Vite](https://vitejs.dev/) 7.1.7 - 新一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) ~5.9.3 - JavaScript 的超集，添加了静态类型
- [Sass](https://sass-lang.com/) - CSS 扩展语言
- [Jest](https://jestjs.io/) - JavaScript 测试框架

## 快速开始

### 克隆和安装

```bash
# 克隆项目
git clone <repository-url>
cd my-app

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
- [x] Tooltip 文字提示组件

### 待开发组件

以下组件尚未实现，但已在目录结构中预留位置：

- Alert 警告提示
- AutoComplete 自动完成
- Avatar 头像
- BackTop 回到顶部
- Badge 徽标数
- Breadcrumb 面包屑
- Cascader 级联选择
- Checkbox 多选框
- Collapse 折叠面板
- Comment 评论
- Descriptions 描述列表
- Divider 分割线
- Drawer 抽屉
- Dropdown 下拉菜单
- Empty 空状态
- Grid 栅格
- Image 图片
- Layout 布局
- List 列表
- Mentions 提及
- Menu 导航菜单
- Message 全局提示
- Modal 对话框
- Notification 通知提醒框
- PageHeader 页头
- Pagination 分页
- Popconfirm 气泡确认框
- Popover 气泡卡片
- Progress 进度条
- Radio 单选框
- Rate 评分
- Result 结果
- Select 选择器
- Skeleton 骨架屏
- Slider 滑动输入条
- Space 间距
- Spin 加载中
- Steps 步骤条
- Switch 开关
- Table 表格
- Tabs 标签页
- Tag 标签
- TimePicker 时间选择框
- Timeline 时间轴
- Transfer 穿梭框
- Tree 树形控件
- TreeSelect 树选择
- Upload 上传

## Icon 组件详情

Icon 组件是一套完整的图标解决方案，具有以下特性：

- 提供多套不同风格的图标（线框、实色）
- 支持自定义尺寸和颜色
- 支持旋转和动画效果
- 按需加载，支持 Tree Shaking
- 完整的 TypeScript 类型支持

### 使用方法

```tsx
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

## Card 组件详情

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

## ESLint 配置扩展

如果要开发生产应用程序，建议更新配置以启用类型感知的 lint 规则：

```js
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

```js
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