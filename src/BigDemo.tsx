import { useState } from 'react';
import { Button, Flex, Row, Col, Table, type ColumnType } from './components';
import Layout from './components/layout';
import Dropdown from './components/dropdown';
import Input from './components/input';
import Card from './components/card/Card';
import DatePicker from './components/date-picker';
import Tooltip from './components/tooltip/imdex';
import message, { MessageHolder } from './components/message';
import Modal from './components/modal/src/Modal';
// individual demos
import ButtonDemo from './components/button/demo/basic';
import InputDemo from './components/input/demo/basic';
import DropdownDemo from './components/dropdown/demo/basic';
import DatePickerDemo from './components/date-picker/demo/basic';
import TooltipDemo from './components/tooltip/demo/basic';
import TabsDemo from './components/tabs/demo/basic';
import GridDemo from './components/grid/demo/basic';
import FlexDemo from './components/flex/demo/basic';
import TableDemo from './components/table/demo/basic';
import CardDemo from './components/card/demo/basic';
import MessageDemo from './components/message/demo/basic';
import LayoutDemo from './components/layout/demo/simple';

// styles (for components that don't self-import all styles)
import './components/table/style/index.scss';
import './components/dropdown/style/index.scss';
import './components/input/style/index.scss';
import './components/tabs/style/index.scss';
import './components/card/style/index.scss';
import './components/layout/style/index.scss';
import './BigDemo.scss';

const { Header, Sider, Content, Footer } = Layout as any;

interface User {
    key: number;
    name: string;
    age: number;
    city: string;
}

const tableColumns: ColumnType<User>[] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age', align: 'right' },
    { title: 'City', dataIndex: 'city' },
];

const tableData: User[] = [
    { key: 1, name: 'Alice', age: 20, city: 'New York' },
    { key: 2, name: 'Bob', age: 25, city: 'San Francisco' },
    { key: 3, name: 'Charlie', age: 30, city: 'Seattle' },
];

export default function BigDemo() {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    type DemoKey = 'overview' | 'button' | 'input' | 'dropdown' | 'date-picker' | 'tooltip' | 'tabs' | 'table' | 'grid' | 'flex' | 'card' | 'message' | 'layout';
    const [active, setActive] = useState<DemoKey>('overview');

    const siderMenus: Array<{ key: DemoKey; label: string }> = [
        { key: 'overview', label: '概览' },
        { key: 'button', label: 'Button 按钮' },
        { key: 'input', label: 'Input 输入框' },
        { key: 'dropdown', label: 'Dropdown 下拉菜单' },
        { key: 'date-picker', label: 'DatePicker 日期' },
        { key: 'tooltip', label: 'Tooltip 提示' },
        { key: 'tabs', label: 'Tabs 标签页' },
        { key: 'table', label: 'Table 表格' },
        { key: 'grid', label: 'Grid 栅格' },
        { key: 'flex', label: 'Flex 布局' },
        { key: 'card', label: 'Card 卡片' },
        { key: 'message', label: 'Message 提示' },
        { key: 'layout', label: 'Layout 布局' },
    ];

    const renderOverview = () => (
        <div>
            <Flex gap={12} wrap>
                <Button type="primary" onClick={() => setCount((c) => c + 1)}>
                    计数 +1（{count}）
                </Button>
                <Tooltip content="这是一个提示">
                    <Button>悬停提示</Button>
                </Tooltip>
                <Button type="dashed" onClick={() => message.info('信息提示')}>信息</Button>
                <Button onClick={() => setOpen(true)}>打开弹窗</Button>
            </Flex>

            <Row gutter={[16, 16]} className="bd-section">
                <Col span={12}>
                    <Card title="表单元素" extra={<span className="bd-link">更多</span>}>
                        <Flex direction="column" gap={12}>
                            <Input placeholder="用户名" />
                            <DatePicker />
                        </Flex>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="表格数据">
                        <Table<User> columns={tableColumns} dataSource={tableData} bordered size="small" />
                    </Card>
                </Col>
            </Row>
        </div>
    );

    return (
        <div className="big-demo">
            <MessageHolder />
            <Layout>
                <Header className="bd-header">
                    <div className="bd-header-inner">
                        <strong>antd-like 蓝色主题演示</strong>
                        <div className="bd-header-actions">
                            <Flex gap={8}>
                                <Input placeholder="搜索..." />
                                <Button type="primary" onClick={() => message.success('已搜索')}>搜索</Button>
                                <Dropdown
                                    trigger="click"
                                    items={[
                                        { key: '1', label: '操作一' },
                                        { key: '2', label: '操作二' },
                                        { divider: true },
                                        { key: '3', label: '退出' },
                                    ]}
                                >
                                    <Button type="default">菜单</Button>
                                </Dropdown>
                            </Flex>
                        </div>
                    </div>
                </Header>
                <Layout hasSider>
                    <Sider className="bd-sider">
                        <ul className="bd-menu">
                            {siderMenus.map((m) => (
                                <li
                                    key={m.key}
                                    className={['bd-menu-item', active === m.key ? 'active' : ''].join(' ')}
                                    onClick={() => setActive(m.key)}
                                >
                                    {m.label}
                                </li>
                            ))}
                        </ul>
                    </Sider>
                    <Content className="bd-content">
                        {active === 'overview' && renderOverview()}
                        {active === 'button' && <ButtonDemo />}
                        {active === 'input' && <InputDemo />}
                        {active === 'dropdown' && <DropdownDemo />}
                        {active === 'date-picker' && <DatePickerDemo />}
                        {active === 'tooltip' && <TooltipDemo />}
                        {active === 'tabs' && <TabsDemo />}
                        {active === 'table' && <TableDemo />}
                        {active === 'grid' && <GridDemo />}
                        {active === 'flex' && <FlexDemo />}
                        {active === 'card' && <CardDemo />}
                        {active === 'message' && <MessageDemo />}
                        {active === 'layout' && <LayoutDemo />}

                        <Modal
                            visible={open}
                            title="演示弹窗"
                            onCancel={() => setOpen(false)}
                            onOk={() => { setOpen(false); message.success('已确认'); }}
                        >
                            这是一个简单的模态框内容。
                        </Modal>
                    </Content>
                </Layout>
                <Footer className="bd-footer">蓝色主题演示页 © 2025</Footer>
            </Layout>
        </div>
    );
}
