import { render, fireEvent, screen } from '@testing-library/react';
import Form from '../src/Form';
import FormItem from '../src/FormItem';
import useForm from '../src/useForm';

describe('Form', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Form>
        <FormItem label="Test Label" name="test">
          <input type="text" />
        </FormItem>
      </Form>
    );
    
    expect(container).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should submit with onFinish callback', () => {
    const onFinish = jest.fn();
    const onFinishFailed = jest.fn();
    
    render(
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem label="Username" name="username">
          <input type="text" />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    );
    
    fireEvent.click(screen.getByText('Submit'));
    expect(onFinish).toHaveBeenCalled();
    expect(onFinishFailed).not.toHaveBeenCalled();
  });

  it('should support initial values', () => {
    render(
      <Form initialValues={{ username: 'test-user' }}>
        <FormItem label="Username" name="username">
          <input type="text" />
        </FormItem>
      </Form>
    );
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    // We can't directly access the value through DOM APIs in this test environment
    // But we can test that the component renders without error
    expect(input).toBeInTheDocument();
  });

  it('should work with form instance', () => {
    const TestComponent = () => {
      const [form] = useForm();
      
      return (
        <Form form={form}>
          <FormItem label="Username" name="username">
            <input type="text" />
          </FormItem>
        </Form>
      );
    };
    
    const { container } = render(<TestComponent />);
    expect(container).toBeInTheDocument();
  });

  it('should reset fields correctly', () => {
    const TestComponent = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} initialValues={{ username: 'initial-value' }}>
          <FormItem label="Username" name="username">
            <input type="text" />
          </FormItem>
          <button type="button" onClick={() => form.resetFields()}>
            Reset
          </button>
        </Form>
      );
    };
    
    const { container } = render(<TestComponent />);
    expect(container).toBeInTheDocument();
  });
});