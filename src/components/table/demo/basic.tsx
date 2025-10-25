import Table, { type ColumnType } from '..';

interface User {
    key: number;
    name: string;
    age: number;
    address?: { city: string };
}

const columns: ColumnType<User>[] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age', align: 'right' },
    { title: 'City', dataIndex: 'address.city' },
];

const data: User[] = [
    { key: 1, name: 'Alice', age: 20, address: { city: 'New York' } },
    { key: 2, name: 'Bob', age: 25, address: { city: 'San Francisco' } },
    { key: 3, name: 'Charlie', age: 30, address: { city: 'Seattle' } },
];

export default function BasicTableDemo() {
    return (
        <div style={{ padding: 16 }}>
            <h3>Basic Table</h3>
            <Table<User> columns={columns} dataSource={data} rowKey={(r) => r.key} bordered />
        </div>
    );
}
