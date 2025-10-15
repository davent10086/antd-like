import { render, fireEvent, screen } from '@testing-library/react';
import Input from '../index';

describe('Input', () => {
  it('should render correctly with default props', () => {
    const { container } = render(<Input />);
    
    expect(container).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display value in controlled mode', () => {
    render(<Input value="controlled-value" />);
    
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('controlled-value');
  });

  it('should trigger onChange callback when typing', () => {
    const handleChange = jest.fn();
    
    render(<Input onChange={handleChange} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new-value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('new-value');
  });

  it('should respect defaultValue in uncontrolled mode', () => {
    render(<Input defaultValue="default-value" />);
    
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('default-value');
  });

  it('should display placeholder', () => {
    render(<Input placeholder="enter text" />);
    
    const inputElement = screen.getByPlaceholderText('enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);
    
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBeDisabled();
  });

  it('should be readonly when readOnly prop is true', () => {
    render(<Input readOnly />);
    
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toHaveAttribute('readonly');
  });

  it('should respect maxLength', () => {
    render(<Input maxLength={10} />);
    
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toHaveAttribute('maxlength', '10');
  });

  it('should show clear button when allowClear is true and has value', () => {
    render(<Input allowClear value="has-value" />);
    
    const clearButton = screen.getByText('×');
    expect(clearButton).toBeInTheDocument();
  });

  it('should clear value when clear button is clicked', () => {
    const handleChange = jest.fn();
    
    render(<Input allowClear value="has-value" onChange={handleChange} />);
    
    const clearButton = screen.getByText('×');
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('should not show clear button when disabled', () => {
    render(<Input allowClear value="has-value" disabled />);
    
    const clearButton = screen.queryByText('×');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should not show clear button when readOnly', () => {
    render(<Input allowClear value="has-value" readOnly />);
    
    const clearButton = screen.queryByText('×');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should show character count when showCount and maxLength are set', () => {
    render(<Input showCount maxLength={20} value="hello" />);
    
    const countElement = screen.getByText('5/20');
    expect(countElement).toBeInTheDocument();
  });

  it('should trigger onPressEnter when Enter key is pressed', () => {
    const handlePressEnter = jest.fn();
    
    render(<Input onPressEnter={handlePressEnter} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    
    expect(handlePressEnter).toHaveBeenCalledTimes(1);
  });

  it('should trigger onFocus when focused', () => {
    const handleFocus = jest.fn();
    
    render(<Input onFocus={handleFocus} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.focus(inputElement);
    
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should trigger onBlur when blurred', () => {
    const handleBlur = jest.fn();
    
    render(<Input onBlur={handleBlur} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.blur(inputElement);
    
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should trigger onKeyDown when any key is pressed', () => {
    const handleKeyDown = jest.fn();
    
    render(<Input onKeyDown={handleKeyDown} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.keyDown(inputElement, { key: 'a', code: 'KeyA' });
    
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});