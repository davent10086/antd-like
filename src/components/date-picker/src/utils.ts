/**
 * 日期格式化工具函数
 * @param date 需要格式化的日期对象
 * @param format 格式化字符串，支持 YYYY-MM-DD HH:mm:ss 等
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 日期解析工具函数
 * @param dateString 日期字符串
 * @param format 格式化字符串
 * @returns 解析后的日期对象
 */
export function parseDate(dateString: string, format: string = 'YYYY-MM-DD'): Date | null {
  // 简单实现，仅支持 YYYY-MM-DD 格式
  if (format === 'YYYY-MM-DD') {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const date = new Date(year, month, day);
        if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
          return date;
        }
      }
    }
  }
  
  return null;
}

/**
 * 检查日期是否有效
 * @param date 待检查的日期
 * @returns 日期是否有效
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * 获取日期面板需要显示的日期
 * @param year 年份
 * @param month 月份 (0-11)
 * @returns 包含当前月所有日期的数组
 */
export function getPanelDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  
  // 获取当月第一天
  const firstDay = new Date(year, month, 1);
  
  // 获取需要显示的第一天（从周日开始）
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  // 生成42天（6周）的日期
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  
  return days;
}

/**
 * 检查两个日期是否是同一天
 * @param date1 日期1
 * @param date2 日期2
 * @returns 是否是同一天
 */
export function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return date1.toDateString() === date2.toDateString();
}

/**
 * 获取星期几的名称
 * @returns 星期几的名称数组
 */
export function getWeekdays(): string[] {
  return ['日', '一', '二', '三', '四', '五', '六'];
}