import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../index';

describe('Button 组件测试', () => {
  // 测试默认按钮渲染
  it('正确渲染默认按钮', () => {
    render(<Button>Default Button</Button>);
    expect(screen.getByText('Default Button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('ant-btn', 'ant-btn-default');
  });

  // 测试按钮类型
  it('正确应用按钮类型样式', () => {
    const { rerender } = render(<Button type="primary">Primary Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-primary');

    rerender(<Button type="dashed">Dashed Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-dashed');
  });

  // 测试按钮尺寸
  it('正确应用按钮尺寸样式', () => {
    const { rerender } = render(<Button size="large">Large Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-large');

    rerender(<Button size="small">Small Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-small');
  });

  // 测试禁用状态
  it('正确应用禁用状态', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('ant-btn-disabled');
  });

  // 测试点击事件
  it('正确处理点击事件', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    fireEvent.click(screen.getByText('Clickable Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 测试禁用按钮不触发点击事件
  it('禁用按钮不触发点击事件', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    
    fireEvent.click(screen.getByText('Disabled Button'));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  // 测试加载状态
  it('正确应用加载状态', () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading');
  });

  // 测试幽灵按钮
  it('正确应用幽灵按钮样式', () => {
    render(<Button ghosty>Ghost Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-ghost');
  });

  // 测试块级按钮
  it('正确应用块级按钮样式', () => {
    render(<Button block>Block Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('ant-btn-block');
  });
});