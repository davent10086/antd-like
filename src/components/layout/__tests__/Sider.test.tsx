import { render, fireEvent } from '@testing-library/react';
import Layout from '../index';

const { Sider } = Layout;

describe('Sider', () => {
  it('should render correctly', () => {
    const { container } = render(<Sider>Sider</Sider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with custom width', () => {
    const { container } = render(<Sider width={300}>Sider</Sider>);
    expect(container.firstChild).toHaveStyle({ width: '300px' });
  });

  it('should be collapsible', () => {
    const { container } = render(<Sider collapsible>Sider</Sider>);
    expect(container.querySelector('.ant-layout-sider-trigger')).toBeInTheDocument();
  });

  it('should respond to trigger click', () => {
    const onCollapse = jest.fn();
    const { container } = render(
      <Sider collapsible onCollapse={onCollapse}>
        Sider
      </Sider>
    );
    
    const trigger = container.querySelector('.ant-layout-sider-trigger');
    if (trigger) {
      fireEvent.click(trigger);
      expect(onCollapse).toHaveBeenCalledWith(true, 'clickTrigger');
    }
  });

  it('should support custom trigger', () => {
    const { container } = render(<Sider collapsible trigger={<div>Custom Trigger</div>}>Sider</Sider>);
    expect(container.querySelector('.ant-layout-sider-trigger')).toHaveTextContent('Custom Trigger');
  });

  it('should support zeroWidthTriggerStyle', () => {
    const { container } = render(
      <Sider 
        collapsible 
        collapsed 
        collapsedWidth={0} 
        zeroWidthTriggerStyle={{ color: 'red' }}
      >
        Sider
      </Sider>
    );
    const trigger = container.querySelector('.ant-layout-sider-zero-width-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveStyle({ color: 'red' });
  });
});