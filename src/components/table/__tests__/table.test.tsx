import { render, screen } from '@testing-library/react';
import Table, { ColumnType } from '..';

interface User {
    id: number;
    name: string;
    age: number;
    address?: { city: string };
}

const columns: ColumnType<User>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'right' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'City', dataIndex: 'address.city', key: 'city' },
    {
        title: 'Age x2',
        key: 'age2',
        render: (_, record) => <span data-testid={`age2-${record.id}`}>{record.age * 2}</span>,
        align: 'center',
    },
];

const data: User[] = [
    { id: 1, name: 'Alice', age: 20, address: { city: 'NY' } },
    { id: 2, name: 'Bob', age: 25, address: { city: 'SF' } },
];

describe('Table', () => {
    test('renders headers and rows', () => {
        render(<Table<User> columns={columns} dataSource={data} rowKey="id" />);
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('City')).toBeInTheDocument();
        // cells
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('NY')).toBeInTheDocument();
    });

    test('supports render function', () => {
        render(<Table<User> columns={columns} dataSource={data} rowKey={(r) => r.id} />);
        expect(screen.getByTestId('age2-1')).toHaveTextContent('40');
        expect(screen.getByTestId('age2-2')).toHaveTextContent('50');
    });

    test('empty state', () => {
        render(<Table<User> columns={columns} dataSource={[]} emptyText="Empty" />);
        expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    test('loading state', () => {
        render(<Table<User> columns={columns} dataSource={data} loading />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('size and bordered classes', () => {
        const { container } = render(
            <Table<User> columns={columns} dataSource={data} size="small" bordered />
        );
        const root = container.querySelector('.ant-table')!;
        expect(root).toHaveClass('ant-table-bordered');
        expect(root).toHaveClass('ant-table-small');
    });
});
