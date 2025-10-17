import { render } from '@testing-library/react';
import Layout from '../index';

const { Header } = Layout;

describe('Header', () => {
  it('should render correctly', () => {
    const { container } = render(<Header>Header</Header>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have default height', () => {
    const { container } = render(<Header>Header</Header>);
    expect(container.firstChild).toHaveClass('ant-layout-header');
    expect(container.firstChild).toHaveStyle('height: 64px');
  });

  it('should support custom height', () => {
    const { container } = render(<Header height={80}>Header</Header>);
    expect(container.firstChild).toHaveStyle('height: 80px');
  });

  it('should support custom className', () => {
    const { container } = render(<Header className="custom-header">Header</Header>);
    expect(container.querySelector('.custom-header')).toBeInTheDocument();
  });

  it('should support custom style', () => {
    const { container } = render(<Header style={{ backgroundColor: 'red' }}>Header</Header>);
    expect(container.firstChild).toHaveStyle('background-color: red');
  });
});