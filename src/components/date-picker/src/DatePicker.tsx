import React, { useRef, useEffect, useState } from 'react';
import type { DatePickerProps } from './interface';
import useDatePicker from './hooks/useDatePicker';
import { formatDate, getPanelDays, getWeekdays, isSameDay } from './utils';

/**
 * 日期选择器组件
 * 
 * @param props - DatePicker组件的属性
 * @param props.placeholder - 输入框占位符，默认为'请选择日期'
 * @param props.disabled - 是否禁用选择器，默认为false
 * @param props.format - 日期显示格式，默认为'YYYY-MM-DD'
 * @param props.className - 自定义CSS类名
 * @param props.style - 自定义内联样式
 * @param props.size - 输入框大小，可选 'large' | 'middle' | 'small'，默认为'middle'
 * @param props.allowClear - 是否允许清除已选日期，默认为true
 * @param props.showToday - 是否显示"今天"按钮，默认为true
 * @param props.readonly - 是否为只读模式，默认为false
 * @param props.showTime - 是否显示时间选择器，默认为false
 * @param props.bordered - 是否显示边框，默认为true
 * @param props.suffixIcon - 后缀图标
 * @param props.autoFocus - 是否自动获取焦点，默认为false
 * @param props.renderExtraFooter - 自定义页脚内容的渲染函数
 * @param props.open - 控制面板是否展开
 * @param props.onOpenChange - 面板展开状态变化时的回调函数
 * @param props.onChange - 日期变化时的回调函数
 * @param props.value - 受控组件的值
 * @param props.defaultValue - 非受控组件的默认值
 * @param props.dropdownClassName - 下拉面板的自定义CSS类名
 * @param props.popupStyle - 下拉面板的自定义样式
 */
const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    placeholder = '请选择日期',
    disabled = false,
    format = 'YYYY-MM-DD',
    className = '',
    style,
    size = 'middle',
    allowClear = true,
    showToday = true,
    readonly = false,
    showTime = false,
    bordered = true,
    suffixIcon,
    autoFocus = false,
    renderExtraFooter,
    open,
    onOpenChange,
    onChange,
    value,
    defaultValue,
    dropdownClassName,
    popupStyle,
  } = props;

  const { 
    dateValue, 
    isOpen, 
    inputRef, 
    handleSelect, 
    handleTimeChange,
    toggleOpen, 
    setOpen,
    clearValue
  } = useDatePicker({
    value,
    defaultValue,
    onChange,
    disabled,
    readonly,
    open,
    onOpenChange,
    autoFocus
  });

  const datePickerRef = useRef<HTMLDivElement>(null);

  // 时间选择状态
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedSecond, setSelectedSecond] = useState<number>(0);

  // 当dateValue改变时更新时间状态
  useEffect(() => {
    if (dateValue) {
      setSelectedHour(dateValue.getHours());
      setSelectedMinute(dateValue.getMinutes());
      setSelectedSecond(dateValue.getSeconds());
    }
  }, [dateValue]);

  // 点击外部关闭面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setOpen]);

  // 格式化日期显示
  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return '';
    return formatDate(date, format);
  };

  // 渲染输入框
  const renderInput = () => {
    const inputValue = formatDisplayDate(dateValue);
    
    return (
      <div 
        className={`ant-date-picker-input ${disabled ? 'ant-date-picker-input-disabled' : ''} ${
          readonly ? 'ant-date-picker-input-readonly' : ''
        } ${size === 'large' ? 'ant-date-picker-large' : ''} ${
          size === 'small' ? 'ant-date-picker-small' : ''
        } ${!bordered ? 'ant-date-picker-borderless' : ''} ${className}`}
        style={style}
        onClick={toggleOpen}
        ref={datePickerRef}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
        />
        {allowClear && dateValue && !disabled && (
          <span className="ant-date-picker-clear" onClick={clearValue}>
            ×
          </span>
        )}
        <span className="ant-date-picker-suffix">
          {suffixIcon || '📅'}
        </span>
      </div>
    );
  };

  // 渲染时间选择器
  const renderTimePicker = () => {
    if (!showTime) return null;

    // 生成小时选项 (0-23)
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    // 生成分钟/秒选项 (0-59)
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    return (
      <div className="ant-time-picker-panel">
        <div className="ant-time-picker-column">
          <select 
            value={selectedHour} 
            onChange={(e) => {
              const hour = parseInt(e.target.value);
              setSelectedHour(hour);
              handleTimeChange(hour, selectedMinute, selectedSecond);
            }}
            className="ant-time-picker-select"
          >
            {hours.map(hour => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
        <div className="ant-time-picker-column">
          <select 
            value={selectedMinute} 
            onChange={(e) => {
              const minute = parseInt(e.target.value);
              setSelectedMinute(minute);
              handleTimeChange(selectedHour, minute, selectedSecond);
            }}
            className="ant-time-picker-select"
          >
            {minutes.map(minute => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
        <div className="ant-time-picker-column">
          <select 
            value={selectedSecond} 
            onChange={(e) => {
              const second = parseInt(e.target.value);
              setSelectedSecond(second);
              handleTimeChange(selectedHour, selectedMinute, second);
            }}
            className="ant-time-picker-select"
          >
            {minutes.map(second => (
              <option key={second} value={second}>
                {second.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  // 渲染日期面板
  const renderPanel = () => {
    if (!isOpen) return null;
    
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // 生成日期表格
    const days = getPanelDays(currentYear, currentMonth);
    const weekdays = getWeekdays();
    
    return (
      <div 
        className={`ant-date-picker-panel ${dropdownClassName || ''}`}
        style={popupStyle}
      >
        {/* 面板头部 */}
        <div className="ant-date-picker-panel-header">
          <span className="ant-date-picker-panel-header-prev">‹</span>
          <span className="ant-date-picker-panel-header-title">
            {currentYear}年{currentMonth + 1}月
          </span>
          <span className="ant-date-picker-panel-header-next">›</span>
        </div>
        
        {/* 面板主体 */}
        <div className="ant-date-picker-panel-body">
          <table className="ant-date-picker-panel-table">
            <thead>
              <tr>
                {weekdays.map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => {
                    const isCurrentMonth = date.getMonth() === currentMonth;
                    const isToday = isSameDay(date, today);
                    const isSelected = isSameDay(dateValue, date);
                    
                    return (
                      <td 
                        key={dayIndex}
                        className={`
                          ant-date-picker-panel-cell
                          ${!isCurrentMonth ? 'ant-date-picker-panel-cell-disabled' : ''}
                          ${isToday ? 'ant-date-picker-panel-cell-today' : ''}
                          ${isSelected ? 'ant-date-picker-panel-cell-selected' : ''}
                        `}
                        onClick={() => {
                          if (isCurrentMonth) {
                            // 如果启用了时间选择，则只更新日期部分
                            if (showTime && dateValue) {
                              const newDate = new Date(date);
                              newDate.setHours(
                                dateValue.getHours(),
                                dateValue.getMinutes(),
                                dateValue.getSeconds()
                              );
                              handleSelect(newDate);
                            } else {
                              handleSelect(date);
                            }
                          }
                        }}
                      >
                        <div className="ant-date-picker-panel-cell-inner">
                          {date.getDate()}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* 时间选择器 */}
          {showTime && renderTimePicker()}
          
          {/* 额外页脚 */}
          {renderExtraFooter && (
            <div className="ant-date-picker-panel-footer">
              {renderExtraFooter()}
            </div>
          )}
          
          {/* 今天按钮 */}
          {showToday && (
            <div className="ant-date-picker-panel-actions">
              <button 
                onClick={() => {
                  const now = new Date();
                  // 如果启用了时间选择，使用当前时间；否则只使用今天的日期
                  if (showTime) {
                    handleSelect(now);
                  } else {
                    const todayWithSelectedTime = new Date(now);
                    if (dateValue) {
                      todayWithSelectedTime.setHours(
                        dateValue.getHours(),
                        dateValue.getMinutes(),
                        dateValue.getSeconds()
                      );
                    }
                    handleSelect(todayWithSelectedTime);
                  }
                }}
                className="ant-date-picker-panel-today-btn"
              >
                今天
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ant-date-picker">
      {renderInput()}
      {renderPanel()}
    </div>
  );
};

export default DatePicker;