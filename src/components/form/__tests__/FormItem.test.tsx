import { render, screen } from '@testing-library/react';
import Form from '../src/Form';
import FormItem from '../src/FormItem';

describe('FormItem', () => {
  it('should render label correctly', () => {
    render(
      <Form>
        <FormItem label="Test Label" name="test">
          <input type="text" />
        </FormItem>
      </Form>
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render required mark when required is true', () => {
    render(
      <Form>
        <FormItem label="Required Label" name="test" required>
          <input type="text" />
        </FormItem>
      </Form>
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should render help text correctly', () => {
    const helpText = 'This is help text';
    
    render(
      <Form>
        <FormItem label="Test Label" name="test" help={helpText}>
          <input type="text" />
        </FormItem>
      </Form>
    );
    
    expect(screen.getByText(helpText)).toBeInTheDocument();
  });

  it('should render extra content correctly', () => {
    const extraContent = 'This is extra content';
    
    render(
      <Form>
        <FormItem label="Test Label" name="test" extra={extraContent}>
          <input type="text" />
        </FormItem>
      </Form>
    );
    
    expect(screen.getByText(extraContent)).toBeInTheDocument();
  });

  it('should associate label with input using htmlFor', () => {
    render(
      <Form>
        <FormItem label="Test Label" name="testField">
          <input type="text" />
        </FormItem>
      </Form>
    );
    
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'testField');
  });

  it('should handle array name for nested fields', () => {
    const nameArray = ['user', 'profile', 'name'];
    
    render(
      <Form>
        <FormItem label="Nested Field" name={nameArray}>
          <input type="text" />
        </FormItem>
      </Form>
    );
    
    const label = screen.getByText('Nested Field');
    expect(label).toHaveAttribute('for', nameArray.join('_'));
  });
});