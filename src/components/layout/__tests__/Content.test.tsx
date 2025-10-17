import { render } from '@testing-library/react';
import Layout from '../index';

const { Content } = Layout;

describe('Content', () => {
  it('should render correctly', () => {
    const { container } = render(<Content>Content</Content>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have correct class', () => {
    const { container } = render(<Content>Content</Content>);
    expect(container.firstChild).toHaveClass('ant-layout-content');
  });

  it('should support custom className', () => {
    const { container } = render(<Content className="custom-content">Content</Content>);
    expect(container.querySelector('.custom-content')).toBeInTheDocument();
  });

  it('should support custom style', () => {
    const { container } = render(<Content style={{ padding: '20px' }}>Content</Content>);
    expect(container.firstChild).toHaveStyle('padding: 20px');
  });
});