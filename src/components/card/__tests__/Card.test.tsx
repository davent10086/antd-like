import { render, screen } from '@testing-library/react';
import Card from '../index';

describe('Card', () => {
  it('should render correctly', () => {
    const { container } = render(<Card>Card Content</Card>);
    expect(container).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('should render with title', () => {
    render(<Card title="Card Title">Card Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('should render with extra content', () => {
    const extraContent = <button>Extra Button</button>;
    render(<Card extra={extraContent}>Card Content</Card>);
    expect(screen.getByText('Extra Button')).toBeInTheDocument();
  });

  it('should render with cover', () => {
    const cover = <img src="test.jpg" alt="test" />;
    render(<Card cover={cover}>Card Content</Card>);
    expect(screen.getByAltText('test')).toBeInTheDocument();
  });

  it('should render with actions', () => {
    const actions = [<button key="1">Action 1</button>, <button key="2">Action 2</button>];
    render(<Card actions={actions}>Card Content</Card>);
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });

  it('should apply bordered class by default', () => {
    const { container } = render(<Card>Card Content</Card>);
    expect(container.firstChild).toHaveClass('ant-card-bordered');
  });

  it('should not apply bordered class when bordered is false', () => {
    const { container } = render(<Card bordered={false}>Card Content</Card>);
    expect(container.firstChild).not.toHaveClass('ant-card-bordered');
  });

  it('should apply hoverable class when hoverable is true', () => {
    const { container } = render(<Card hoverable>Card Content</Card>);
    expect(container.firstChild).toHaveClass('ant-card-hoverable');
  });

  it('should apply small size class when size is small', () => {
    const { container } = render(<Card size="small">Card Content</Card>);
    expect(container.firstChild).toHaveClass('ant-card-small');
  });

  it('should apply inner type class when type is inner', () => {
    const { container } = render(<Card type="inner">Card Content</Card>);
    expect(container.firstChild).toHaveClass('ant-card-type-inner');
  });

  it('should show loading state', () => {
    render(<Card loading>Card Content</Card>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
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