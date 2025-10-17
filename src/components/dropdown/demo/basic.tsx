import React from 'react';
import Dropdown from '../src/Dropdown';
import type { MenuItemType } from '../src/interface';

const DropdownDemo: React.FC = () => {
  const items: MenuItemType[] = [
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
    {
      divider: true,
    },
    {
      key: '4',
      label: '带图标选项',
      icon: <span>✉️</span>,
    },
    {
      key: '5',
      label: '禁用选项',
      disabled: true,
    },
  ];

  const handleOpenChange = (open: boolean) => {
    console.log('Dropdown状态改变:', open);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dropdown 下拉菜单演示</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>基本用法</h3>
        <div>
          <Dropdown 
            items={items}
            onOpenChange={handleOpenChange}
          >
            <button>Hover me</button>
          </Dropdown>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>不同触发方式</h3>
        <div>
          <Dropdown 
            items={items}
            trigger="click"
          >
            <button>Click me</button>
          </Dropdown>
          {' '}
          <Dropdown 
            items={items}
            trigger="contextMenu"
          >
            <button>Right Click</button>
          </Dropdown>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>不同弹出位置</h3>
        <div>
          <Dropdown 
            items={items}
            placement="bottomLeft"
          >
            <button>Bottom Left</button>
          </Dropdown>
          {' '}
          <Dropdown 
            items={items}
            placement="bottomRight"
          >
            <button>Bottom Right</button>
          </Dropdown>
          {' '}
          <Dropdown 
            items={items}
            placement="topLeft"
          >
            <button>Top Left</button>
          </Dropdown>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>其他属性</h3>
        <div>
          <Dropdown 
            items={items}
            disabled
          >
            <button>Disabled</button>
          </Dropdown>
          {' '}
          <Dropdown 
            items={items}
            arrow
          >
            <button>With Arrow</button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DropdownDemo;