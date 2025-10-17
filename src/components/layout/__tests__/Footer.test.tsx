import { render } from '@testing-library/react';
import Layout from '../index';

const { Footer } = Layout;

describe('Footer', () => {
  it('should render correctly', () => {
    const { container } = render(<Footer>Footer</Footer>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have default height', () => {
    const { container } = render(<Footer>Footer</Footer>);
    expect(container.firstChild).toHaveClass('ant-layout-footer');
    expect(container.firstChild).toHaveStyle('height: 64px');
  });

  it('should support custom height', () => {
    const { container } = render(<Footer height={80}>Footer</Footer>);
    expect(container.firstChild).toHaveStyle('height: 80px');
  });

  it('should support custom className', () => {
    const { container } = render(<Footer className="custom-footer">Footer</Footer>);
    expect(container.querySelector('.custom-footer')).toBeInTheDocument();
  });

  it('should support custom style', () => {
    const { container } = render(<Footer style={{ textAlign: 'center' }}>Footer</Footer>);
    expect(container.firstChild).toHaveStyle('text-align: center');
  });
});