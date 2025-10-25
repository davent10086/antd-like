import { useState } from 'react';
import DatePicker from '../index';

const BasicDemo = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  const handleChange = (date: Date) => {
    console.log('Selected date:', date);
    setValue(date);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>DatePicker 基础示例</h2>
      <DatePicker
        value={value}
        onChange={handleChange}
        placeholder="请选择日期"
      />

      <div style={{ marginTop: 20 }}>
        <h3>带时间选择</h3>
        <DatePicker
          showTime
          placeholder="请选择日期和时间"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>禁用状态</h3>
        <DatePicker
          disabled
          placeholder="禁用状态"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>只读状态</h3>
        <DatePicker
          readonly
          placeholder="只读状态"
        />
      </div>
    </div>
  );
};

export default BasicDemo;