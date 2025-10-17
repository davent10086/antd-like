import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import Dropdown from '../src/Dropdown';

describe('Dropdown 组件测试', () => {
  const items = [
    {
      key: '1',
      label: '选项1',
    },
    {
      key: '2',
      label: '选项2',
    },
    {
      key: '3',
      label: '选项3',
    },
  ];

  // 测试默认渲染
  it('正确渲染下拉菜单', () => {
    render(
      <Dropdown items={items}>
        <button>Hover me</button>
      </Dropdown>
    );
    
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  // 测试hover触发方式
  it('hover触发下拉菜单显示', () => {
    jest.useFakeTimers();
    render(
      <Dropdown items={items} trigger="hover" mouseEnterDelay={0.1}>
        <button>Hover me</button>
      </Dropdown>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.advanceTimersByTime(100); // 等待mouseEnterDelay时间
    });
    expect(screen.getByText('选项1')).toBeInTheDocument();
    expect(screen.getByText('选项2')).toBeInTheDocument();
    expect(screen.getByText('选项3')).toBeInTheDocument();
    jest.useRealTimers();
  });

  // 测试click触发方式
  it('click触发下拉菜单显示', () => {
    render(
      <Dropdown items={items} trigger="click">
        <button>Click me</button>
      </Dropdown>
    );

    act(() => {
      fireEvent.click(screen.getByText('Click me'));
    });
    expect(screen.getByText('选项1')).toBeInTheDocument();
    expect(screen.getByText('选项2')).toBeInTheDocument();
    expect(screen.getByText('选项3')).toBeInTheDocument();
  });

  // 测试禁用状态
  it('禁用状态下无法触发下拉菜单', () => {
    render(
      <Dropdown items={items} disabled>
        <button>Disabled</button>
      </Dropdown>
    );

    act(() => {
      fireEvent.click(screen.getByText('Disabled'));
    });
    expect(screen.queryByText('选项1')).not.toBeInTheDocument();
  });

  // 测试菜单项点击
  it('点击菜单项能正常关闭菜单', () => {
    render(
      <Dropdown items={items} trigger="click" destroyPopupOnHide>
        <button>Click me</button>
      </Dropdown>
    );

    // 打开菜单
    act(() => {
      fireEvent.click(screen.getByText('Click me'));
    });
    expect(screen.getByText('选项1')).toBeInTheDocument();

    // 点击菜单项
    act(() => {
      fireEvent.click(screen.getByText('选项1'));
    });
    // 菜单应该关闭（使用destroyPopupOnHide确保立即销毁）
    expect(screen.queryByText('选项1')).not.toBeInTheDocument();
  });

  // 测试分隔线
  it('正确渲染分隔线', () => {
    const itemsWithDivider = [
      {
        key: '1',
        label: '选项1',
      },
      {
        key: '2',
        label: '选项2',
      },
      {
        divider: true,
      },
      {
        key: '4',
        label: '选项4',
      }
    ];

    render(
      <Dropdown items={itemsWithDivider} trigger="click">
        <button>Click me</button>
      </Dropdown>
    );

    act(() => {
      fireEvent.click(screen.getByText('Click me'));
    });
    // 分隔线元素应该存在
    const divider = screen.getByText('', { selector: '.ant-dropdown-menu-item-divider' });
    expect(divider).toBeInTheDocument();
  });

  // 测试禁用菜单项
  it('禁用菜单项不可点击', () => {
    const itemsWithDisabled = [
      {
        key: '1',
        label: '选项1',
      },
      {
        key: '3',
        label: '选项2',
      },
      {
        key: 'disabled',
        label: '禁用选项',
        disabled: true,
      }
    ];

    render(
      <Dropdown items={itemsWithDisabled} trigger="click">
        <button>Click me</button>
      </Dropdown>
    );

    act(() => {
      fireEvent.click(screen.getByText('Click me'));
    });
    const disabledItem = screen.getByText('禁用选项').closest('li');
    expect(disabledItem).toHaveClass('ant-dropdown-menu-item-disabled');
  });

  // 测试onOpenChange回调
  it('正确触发onOpenChange回调', () => {
    const handleOpenChange = jest.fn();
    
    render(
      <Dropdown 
        items={items} 
        trigger="click"
        onOpenChange={handleOpenChange}
      >
        <button>Click me</button>
      </Dropdown>
    );

    act(() => {
      fireEvent.click(screen.getByText('Click me'));
    });
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });
});