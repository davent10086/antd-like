import { render } from '@testing-library/react';
import Flex from '../index';

describe('Flex', () => {
    test('renders with default classes', () => {
        const { container } = render(<Flex />);
        const el = container.firstChild as HTMLElement;
        expect(el).toHaveClass('ant-flex');
        expect(el).toHaveClass('ant-flex-row');
        expect(el).toHaveClass('ant-flex-justify-start');
        expect(el).toHaveClass('ant-flex-align-stretch');
        expect(el).toHaveClass('ant-flex-nowrap');
    });

    test('applies direction, wrap, justify, align and gap', () => {
        const { container } = render(
            <Flex direction="column" wrap justify="center" align="center" gap={12} />
        );
        const el = container.firstChild as HTMLElement;
        expect(el).toHaveClass('ant-flex-column');
        expect(el).toHaveClass('ant-flex-wrap');
        expect(el).toHaveClass('ant-flex-justify-center');
        expect(el).toHaveClass('ant-flex-align-center');
        expect(el).toHaveStyle({ gap: '12px' });
    });

    test('inline and fullWidth helpers', () => {
        const { container } = render(<Flex inline fullWidth />);
        const el = container.firstChild as HTMLElement;
        expect(el).toHaveClass('ant-flex-inline');
        expect(el).toHaveClass('ant-flex-full-width');
    });

    test('Flex.Item accepts flex and alignSelf', () => {
        const { getByText } = render(
            <Flex>
                <Flex.Item flex={1}><div>item</div></Flex.Item>
            </Flex>
        );
        const item = getByText('item').parentElement as HTMLElement;
        expect(item).toHaveClass('ant-flex-item');
        expect(item.style.flex).toBe('1');
    });
});
