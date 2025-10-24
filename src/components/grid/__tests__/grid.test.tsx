import { render } from '@testing-library/react';
import { Row, Col } from '..';

describe('Grid', () => {
    test('renders span and offset correctly', () => {
        const { container } = render(
            <Row>
                <Col span={12}>A</Col>
                <Col span={6} offset={6}>B</Col>
            </Row>
        );
        expect(container.querySelector('.ant-col-12')).toBeInTheDocument();
        expect(container.querySelector('.ant-col-6.ant-col-offset-6')).toBeInTheDocument();
    });

    test('applies gutter padding/margin', () => {
        const { container } = render(
            <Row gutter={16}>
                <Col span={12}>A</Col>
                <Col span={12}>B</Col>
            </Row>
        );
        const row = container.querySelector('.ant-row') as HTMLElement;
        expect(row.style.marginLeft).toBe('-8px');
        const col = container.querySelector('.ant-col') as HTMLElement;
        expect(col.style.paddingLeft).toBe('8px');
    });

    test('responsive classes', () => {
        const { container } = render(
            <Row>
                <Col xs={24} md={12}>A</Col>
                <Col xs={24} md={12}>B</Col>
            </Row>
        );
        expect(container.querySelector('.ant-col-xs-24')).toBeInTheDocument();
        expect(container.querySelector('.ant-col-md-12')).toBeInTheDocument();
    });

    test('justify and align classes', () => {
        const { container } = render(
            <Row justify="space-between" align="middle">
                <Col span={12}>A</Col>
                <Col span={12}>B</Col>
            </Row>
        );
        expect(container.querySelector('.ant-row-justify-space-between')).toBeInTheDocument();
        expect(container.querySelector('.ant-row-align-middle')).toBeInTheDocument();
    });
});
