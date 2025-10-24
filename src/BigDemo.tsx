import { useState } from 'react';
import { Button, Flex, Tabs, Row, Col, Table, type ColumnType } from './components';
import Layout from './components/layout';
import Dropdown from './components/dropdown';
import Input from './components/input';
import Card from './components/card/Card';
import DatePicker from './components/date-picker';
import Tooltip from './components/tooltip/imdex';
import message, { MessageHolder } from './components/message';
import Modal from './components/modal/src/Modal';

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
                <Layout>
                    <Sider className="bd-sider">侧边栏</Sider>
                    <Content className="bd-content">
                        <Tabs
                            type="line"
                            items={[
                                {
                                    key: 'overview',
                                    label: '概览',
                                    children: (
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
                                    ),
                                },
                                {
                                    key: 'layout',
                                    label: '布局',
                                    children: (
                                        <div>
                                            <h4 className="bd-subtitle">Grid \u0020 24 栅格</h4>
                                            <Row gutter={16}>
                                                <Col span={6}><div className="bd-grid-box">col-6</div></Col>
                                                <Col span={6}><div className="bd-grid-box">col-6</div></Col>
                                                <Col span={6}><div className="bd-grid-box">col-6</div></Col>
                                                <Col span={6}><div className="bd-grid-box">col-6</div></Col>
                                            </Row>

                                            <h4 className="bd-subtitle mt-lg">Flex 灵活布局</h4>
                                            <Flex gap={8} wrap>
                                                <Button type="primary">主要</Button>
                                                <Button>默认</Button>
                                                <Button type="dashed">虚线</Button>
                                                <Button type="text">文本</Button>
                                                <Button type="link">链接</Button>
                                            </Flex>
                                        </div>
                                    ),
                                },
                            ]}
                        />

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
