import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../index';

describe('Card', () => {
  it('should render correctly', () => {
    const { container } = render(<Card>Card Content</Card>);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('should render with title and extra', () => {
    render(<Card title="Card Title" extra={<a href="#">More</a>}>Card Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('should render with border', () => {
    const { container } = render(<Card bordered>Card Content</Card>);
    expect(container.firstChild).toHaveClass('ant-card-bordered');
  });

  it('should render without border', () => {
    const { container } = render(<Card bordered={false}>Card Content</Card>);
    expect(container.firstChild).not.toHaveClass('ant-card-bordered');
  });

  it('should render with hoverable', () => {
    const { container } = render(<Card hoverable>Card Content</Card>);
    expect(container.firstChild).toHaveClass('ant-card-hoverable');
  });

  it('should render with different sizes', () => {
    const { container: smallContainer } = render(<Card size="small">Card Content</Card>);
    expect(smallContainer.firstChild).toHaveClass('ant-card-small');

    const { container: defaultContainer } = render(<Card size="default">Card Content</Card>);
    expect(defaultContainer.firstChild).not.toHaveClass('ant-card-small');
  });

  it('should show loading state', () => {
    render(<Card loading>Card Content</Card>);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = render(<Card className="custom-class">Card Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render Card.Meta component', () => {
    render(
      <Card>
        <Card.Meta title="Meta Title" description="Meta Description" />
      </Card>
    );
    expect(screen.getByText('Meta Title')).toBeInTheDocument();
    expect(screen.getByText('Meta Description')).toBeInTheDocument();
  });

  it('should render Card.Meta with avatar', () => {
    const avatar = <div>Avatar</div>;
    render(
      <Card>
        <Card.Meta avatar={avatar} title="Meta Title" />
      </Card>
    );
    expect(screen.getByText('Avatar')).toBeInTheDocument();
    expect(screen.getByText('Meta Title')).toBeInTheDocument();
  });
});