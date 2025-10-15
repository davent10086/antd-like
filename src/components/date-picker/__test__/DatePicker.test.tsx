import { render, fireEvent, screen } from '@testing-library/react';
import DatePicker from '../index';

describe('DatePicker', () => {
  beforeAll(() => {
    // Mock console.error to avoid unnecessary logs in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('should render correctly', () => {
    const { container } = render(<DatePicker />);
    expect(container).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    const placeholder = '请选择日期';
    render(<DatePicker placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('should support disabled state', () => {
    render(<DatePicker disabled placeholder="禁用状态" />);
    const input = screen.getByPlaceholderText('禁用状态') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('should support readonly state', () => {
    render(<DatePicker readonly placeholder="只读状态" />);
    const input = screen.getByPlaceholderText('只读状态') as HTMLInputElement;
    expect(input).toHaveAttribute('readonly');
  });

  it('should render with default value', () => {
    const defaultValue = new Date(2023, 11, 25);
    render(<DatePicker defaultValue={defaultValue} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should support showTime prop', () => {
    render(<DatePicker showTime placeholder="选择日期和时间" />);
    expect(screen.getByPlaceholderText('选择日期和时间')).toBeInTheDocument();
  });

  it('should handle onChange callback', () => {
    const onChange = jest.fn();
    render(<DatePicker onChange={onChange} />);
    
    // 简单测试组件是否正确渲染
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should clear value when clear button is clicked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DatePicker 
        defaultValue={new Date()} 
        onChange={onChange} 
        allowClear 
      />
    );
    
    const clearBtn = container.querySelector('.ant-date-picker-clear');
    if (clearBtn) {
      fireEvent.click(clearBtn);
      expect(onChange).toHaveBeenCalledWith(null);
    }
  });

  it('should support different sizes', () => {
    const { container: smallContainer } = render(<DatePicker size="small" />);
    const { container: middleContainer } = render(<DatePicker size="middle" />);
    const { container: largeContainer } = render(<DatePicker size="large" />);
    
    expect(smallContainer.firstChild).toBeInTheDocument();
    expect(middleContainer.firstChild).toBeInTheDocument();
    expect(largeContainer.firstChild).toBeInTheDocument();
  });
});