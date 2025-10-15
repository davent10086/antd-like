# antd-like 组件库

基于 React、TypeScript 和 Vite 构建的现代化组件库。该库旨在提供类似 Ant Design 的组件集合，采用现代化的工具链，支持热模块替换（HMR）和代码检查。

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [组件库开发进度](#组件库开发进度)
- [ESLint 配置扩展](#eslint-配置扩展)
- [React 编译器](#react-编译器)

## 项目概述

这是一个类似 Ant Design 风格的 React 组件库，旨在为开发者提供高质量的 UI 组件。项目采用现代化的技术栈，具有快速的开发体验和良好的性能优化。

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
git clone https://github.com/davent10086/antd-like
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
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 代码检查

```bash
# 运行 ESLint 检查
npm run lint
```

## 组件库开发进度

### 已完成组件

| 组件名称 | 状态 | 描述 |
|---------|------|------|
| [Button](./src/components/button) | ✅ 已完成 | 支持多种类型、尺寸和状态的按钮组件 |
| [Form](./src/components/form) | ✅ 已完成 | 支持表单控件、数据管理、验证和重置功能的表单组件 |
| [Tooltip](./src/components/tooltip) | ✅ 已完成 | 支持多种触发方式和位置的提示组件 |
| [Input](./src/components/input) | ✅ 已完成 | 支持多种功能的输入框组件 |
| [Card](./src/components/card) | ✅ 已完成 | 支持标题、操作、内容、加载状态等基本功能的卡片组件 |

### 待开发组件

以下组件仅创建了目录结构，尚未实现具体功能：

- [DatePicker](./src/components/date-picker)
- [Dropdown](./src/components/dropdown)
- [Grid](./src/components/grid)
- [Icon](./src/components/icon)
- [Layout](./src/components/layout)
- [Menu](./src/components/menu)
- [Modal](./src/components/modal)
- [Notification](./src/components/notification)
- [Table](./src/components/table)
- [Tabs](./src/components/tabs)

### Button 组件详情

Button 组件是一个功能完整的按钮组件，具有以下特性：

- 多种类型：`primary`、`default`、`dashed`、`link`、`text`
- 三种尺寸：`large`、`middle`、`small`
- 禁用状态 (`disabled`)
- 加载状态 (`loading`)
- 幽灵按钮 (`ghost`)
- 块级元素按钮 (`block`)
- 图标支持 (`icon`)
- 链接按钮支持 (`href`)
- 支持原生 button 属性 (`htmlType`)

### Form 组件详情

Form 组件是一个完整的表单解决方案，具有以下特性：

- 表单控件管理（Form、FormItem等）
- 表单数据管理（获取、设置、重置字段值）
- 表单验证机制
- 初始值支持
- 支持嵌套字段结构
- 支持动态增减表单项
- 性能优化，避免不必要的重渲染

### Tooltip 组件详情

Tooltip 组件是一个灵活的提示组件，具有以下特性：

- 多种触发方式：`hover`、`click`、`focus`
- 多种位置支持：`top`、`bottom`、`left`、`right`
- 受控与非受控模式支持
- 延迟显示与隐藏功能
- 支持标题和描述内容
- 手动控制显示隐藏
- 支持自定义样式和类名

### Input 组件详情

Input 组件是一个功能丰富的输入框组件，具有以下特性：

- 受控和非受控模式支持
- 多种输入类型（text, password 等）
- 前缀和后缀支持
- 清除按钮
- 字数统计
- 禁用和只读状态

### Card 组件详情

Card 组件是一个内容容器组件，具有以下特性：

- 标题和副标题支持
- 自定义操作区域
- 可选边框和悬停效果
- 加载状态展示
- 封面图片支持
- 底部操作区域
- 多种尺寸（默认和小尺寸）
- 卡片嵌套支持
- 元信息展示（头像、标题、描述）

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