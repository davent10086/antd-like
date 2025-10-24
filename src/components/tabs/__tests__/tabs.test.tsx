import { render, screen, fireEvent } from '@testing-library/react';
import Tabs, { TabsProps } from '..';

const items: TabsProps['items'] = [
    { key: '1', label: 'Tab 1', children: <div data-testid="p1">Content 1</div> },
    { key: '2', label: 'Tab 2', children: <div data-testid="p2">Content 2</div> },
    { key: '3', label: 'Tab 3', disabled: true, children: <div data-testid="p3">Content 3</div> },
];

describe('Tabs', () => {
    test('renders and shows first enabled tab by default', () => {
        render(<Tabs items={items} />);
        expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Tab 1');
        expect(screen.getByTestId('p1')).toBeVisible();
        expect(screen.getByTestId('p2')).not.toBeVisible();
    });

    test('click to switch active tab (uncontrolled)', () => {
        const onChange = jest.fn();
        render(<Tabs items={items} onChange={onChange} />);
        fireEvent.click(screen.getByText('Tab 2'));
        expect(onChange).toHaveBeenCalledWith('2');
        expect(screen.getByTestId('p2')).toBeVisible();
    });

    test('disabled tab should not activate', () => {
        render(<Tabs items={items} />);
        fireEvent.click(screen.getByText('Tab 3'));
        expect(screen.getByTestId('p1')).toBeVisible();
    });

    test('controlled mode does not change without prop update', () => {
        const onChange = jest.fn();
        const { rerender } = render(<Tabs items={items} activeKey="1" onChange={onChange} />);
        fireEvent.click(screen.getByText('Tab 2'));
        expect(onChange).toHaveBeenCalledWith('2');
        // still 1 visible
        expect(screen.getByTestId('p1')).toBeVisible();
        rerender(<Tabs items={items} activeKey="2" onChange={onChange} />);
        expect(screen.getByTestId('p2')).toBeVisible();
    });

    test('destroyInactiveTabPane removes hidden panes from DOM', () => {
        render(<Tabs items={items} destroyInactiveTabPane />);
        expect(screen.getByTestId('p1')).toBeInTheDocument();
        expect(screen.queryByTestId('p2')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Tab 2'));
        expect(screen.getByTestId('p2')).toBeInTheDocument();
        expect(screen.queryByTestId('p1')).not.toBeInTheDocument();
    });
});
