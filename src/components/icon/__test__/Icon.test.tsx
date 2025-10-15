import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  ArrowOutlined, 
  CheckOutlined, 
  CloseOutlined, 
  HeartFilled, 
  LoadingOutlined, 
  SearchOutlined, 
  SettingOutlined, 
  StarFilled, 
  UserOutlined 
} from '../index';

describe('Icon 组件测试', () => {
  it('应该渲染 ArrowOutlined 图标', () => {
    render(<ArrowOutlined />);
    const iconElement = screen.getByRole('img', { name: 'arrow' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该渲染 CheckOutlined 图标', () => {
    render(<CheckOutlined />);
    const iconElement = screen.getByRole('img', { name: 'check' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该渲染 CloseOutlined 图标', () => {
    render(<CloseOutlined />);
    const iconElement = screen.getByRole('img', { name: 'close' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该渲染 HeartFilled 图标', () => {
    render(<HeartFilled />);
    const iconElement = screen.getByRole('img', { name: 'heart' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该渲染 LoadingOutlined 图标', () => {
    render(<LoadingOutlined />);
    const iconElement = screen.getByRole('img', { name: 'loading' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该渲染 SearchOutlined 图标', () => {
    render(<SearchOutlined />);
    const iconElement = screen.getByRole('img', { name: 'search' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该渲染 SettingOutlined 图标', () => {
    render(<SettingOutlined />);
    const iconElement = screen.getByRole('img', { name: 'settings' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该渲染 StarFilled 图标', () => {
    render(<StarFilled />);
    const iconElement = screen.getByRole('img', { name: 'star' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该渲染 UserOutlined 图标', () => {
    render(<UserOutlined />);
    const iconElement = screen.getByRole('img', { name: 'user' });
    expect(iconElement).toBeInTheDocument();
  });

  it('应该支持自定义 className', () => {
    render(<CheckOutlined className="custom-class" />);
    const iconElement = screen.getByRole('img', { name: 'check' });
    expect(iconElement).toHaveClass('custom-class');
  });

  it('应该支持自定义样式', () => {
    render(<CheckOutlined style={{ color: 'red', fontSize: '24px' }} />);
    const iconElement = screen.getByRole('img', { name: 'check' });
    expect(iconElement).toHaveStyle({ color: 'red', fontSize: '24px' });
  });

  it('应该支持旋转属性', () => {
    render(<SettingOutlined rotate={90} />);
    const iconElement = screen.getByRole('img', { name: 'settings' });
    expect(iconElement).toHaveStyle({ transform: 'rotate(90deg)' });
  });

  it('LoadingOutlined 图标默认应该有旋转动画', () => {
    render(<LoadingOutlined />);
    const iconElement = screen.getByRole('img', { name: 'loading' });
    expect(iconElement).toHaveStyle({ animation: 'antRotate 1s infinite linear' });
  });

  it('应该支持 spin 属性', () => {
    render(<SettingOutlined spin />);
    const iconElement = screen.getByRole('img', { name: 'settings' });
    expect(iconElement).toHaveStyle({ animation: 'antRotate 1s infinite linear' });
  });
});