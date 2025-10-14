import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import Tooltip from '../imdex';

describe('Tooltip 组件', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('渲染子元素', () => {
    render(
      <Tooltip content="提示内容">
        <span>测试元素</span>
      </Tooltip>
    );

    expect(screen.getByText('测试元素')).toBeInTheDocument();
  });

  test('默认情况下鼠标悬停显示提示', () => {
    const { container } = render(
      <Tooltip content="提示内容">
        <span data-testid="trigger">悬停元素</span>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');
    fireEvent.mouseEnter(trigger);
    
    // 快进所有定时器
    act(() => {
      jest.runAllTimers();
    });
    
    const tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
  });

  test('点击触发显示提示', () => {
    const { container } = render(
      <Tooltip content="提示内容" trigger="click">
        <button data-testid="trigger">点击元素</button>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');
    act(() => {
      fireEvent.click(trigger);
    });
    
    const tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
  });

  test('聚焦触发显示提示', () => {
    const { container } = render(
      <Tooltip content="提示内容" trigger="focus">
        <input data-testid="trigger" placeholder="聚焦元素" />
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');
    act(() => {
      fireEvent.focus(trigger);
    });
    
    const tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
  });

  test('不同位置类名正确', () => {
    const { container, rerender } = render(
      <Tooltip content="提示内容" placement="top">
        <span>元素</span>
      </Tooltip>
    );

    // 查找包含tooltip类的元素
    let tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-placement-top');

    rerender(
      <Tooltip content="提示内容" placement="bottom">
        <span>元素</span>
      </Tooltip>
    );

    tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-placement-bottom');
  });

  test('鼠标离开隐藏提示', () => {
    const { container } = render(
      <Tooltip content="提示内容">
        <span data-testid="trigger">悬停元素</span>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');
    fireEvent.mouseEnter(trigger);
    act(() => {
      jest.runAllTimers();
    });
    
    let tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
    
    fireEvent.mouseLeave(trigger);
    act(() => {
      jest.runAllTimers();
    });
    
    tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).not.toHaveClass('tooltip-open');
  });

  test('手动控制显示隐藏', () => {
    const { container, rerender } = render(
      <Tooltip content="提示内容" visible={true}>
        <span>元素</span>
      </Tooltip>
    );

    let tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');

    rerender(
      <Tooltip content="提示内容" visible={false}>
        <span>元素</span>
      </Tooltip>
    );

    tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).not.toHaveClass('tooltip-open');
  });

  test('标题和描述内容渲染', () => {
    const { container } = render(
      <Tooltip content="提示内容" title="标题" description="描述">
        <span>元素</span>
      </Tooltip>
    );

    const tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toBeInTheDocument();
    
    // 检查是否包含标题和描述元素
    const titleElement = container.querySelector('.tooltip-title');
    const descriptionElement = container.querySelector('.tooltip-description');
    
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('标题');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent('描述');
  });

  test('延迟显示功能', async () => {
    const { container } = render(
      <Tooltip content="提示内容" mouseEnterDelay={500}>
        <span data-testid="trigger">悬停元素</span>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');
    fireEvent.mouseEnter(trigger);
    
    // 先前进499毫秒，Tooltip应该还未显示
    act(() => {
      jest.advanceTimersByTime(499);
    });
    
    let tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).not.toHaveClass('tooltip-open');
    
    // 再前进1毫秒，总共500毫秒，Tooltip应该显示
    act(() => {
      jest.advanceTimersByTime(1);
    });
    
    tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
  });

  test('延迟隐藏功能', async () => {
    const { container } = render(
      <Tooltip content="提示内容" mouseLeaveDelay={500}>
        <span data-testid="trigger">悬停元素</span>
      </Tooltip>
    );

    const trigger = screen.getByTestId('trigger');
    fireEvent.mouseEnter(trigger);
    act(() => {
      jest.runAllTimers();
    });
    
    let tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
    
    fireEvent.mouseLeave(trigger);
    
    // 先前进499毫秒，Tooltip应该仍然显示
    act(() => {
      jest.advanceTimersByTime(499);
    });
    
    tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
    
    // 再前进1毫秒，总共500毫秒，Tooltip应该隐藏
    act(() => {
      jest.advanceTimersByTime(1);
    });
    
    tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).not.toHaveClass('tooltip-open');
  });

  test('点击外部区域不会影响Tooltip', () => {
    const { container } = render(
      <div>
        <div data-testid="outside">外部区域</div>
        <Tooltip content="提示内容" trigger="click">
          <button data-testid="trigger">点击元素</button>
        </Tooltip>
      </div>
    );

    const trigger = screen.getByTestId('trigger');
    const outside = screen.getByTestId('outside');
    
    // 点击触发元素显示Tooltip
    act(() => {
      fireEvent.click(trigger);
    });
    
    let tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
    
    // 点击外部区域不应该隐藏Tooltip
    act(() => {
      fireEvent.click(outside);
    });
    
    tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');
  });

  test('受控模式下visible属性正常工作', () => {
    const onVisibleChange = jest.fn();
    const { container, rerender } = render(
      <Tooltip 
        content="提示内容" 
        visible={true} 
        onVisibleChange={onVisibleChange}
      >
        <span>元素</span>
      </Tooltip>
    );

    let tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).toHaveClass('tooltip-open');

    // 改变visible属性为false
    rerender(
      <Tooltip 
        content="提示内容" 
        visible={false} 
        onVisibleChange={onVisibleChange}
      >
        <span>元素</span>
      </Tooltip>
    );

    tooltipElements = container.getElementsByClassName('tooltip');
    expect(tooltipElements[0]).not.toHaveClass('tooltip-open');
    // 确保回调没有被调用（因为是受控模式）
    expect(onVisibleChange).toHaveBeenCalledTimes(0);
  });
});