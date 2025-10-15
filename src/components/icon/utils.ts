/**
 * 获取SVG图标组件的显示名称
 * @param name - 图标名称
 * @param theme - 图标主题
 * @returns 格式化后的图标组件名称
 */
export const getIconName = (name: string, theme: string): string => {
  // 首字母大写
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  // 根据主题添加后缀
  switch (theme) {
    case 'filled':
      return `${capitalizedName}Filled`;
    case 'outlined':
      return `${capitalizedName}Outlined`;
    case 'twoTone':
      return `${capitalizedName}TwoTone`;
    default:
      return capitalizedName;
  }
};

/**
 * 生成SVG图标组件
 * @param svgContent - SVG内容
 * @param name - 图标名称
 * @returns SVG图标组件
 */
export const createIconComponent = (svgContent: string, name: string) => {
  // 移除SVG中的width和height属性，使用em单位来适配字体大小
  const svgWithoutSize = svgContent
    .replace(/width="[^"]*"/, '')
    .replace(/height="[^"]*"/, '');
  
  return svgWithoutSize;
};