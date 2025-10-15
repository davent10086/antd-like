import { renderHook, act } from '@testing-library/react';
import useDatePicker from '../src/hooks/useDatePicker';

describe('useDatePicker', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDatePicker({}));
    
    expect(result.current.dateValue).toBeNull();
    expect(result.current.isOpen).toBe(false);
  });

  it('should handle initial value', () => {
    const initialValue = new Date(2023, 11, 25);
    const { result } = renderHook(() => useDatePicker({ 
      value: initialValue 
    }));
    
    expect(result.current.dateValue).toEqual(initialValue);
  });

  it('should handle default value', () => {
    const defaultValue = new Date(2023, 11, 25);
    const { result } = renderHook(() => useDatePicker({ 
      defaultValue 
    }));
    
    expect(result.current.dateValue).toEqual(defaultValue);
  });

  it('should handle date selection', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useDatePicker({ 
      onChange 
    }));
    
    const newDate = new Date(2023, 11, 25);
    
    act(() => {
      result.current.handleSelect(newDate);
    });
    
    expect(result.current.dateValue).toEqual(newDate);
    expect(onChange).toHaveBeenCalledWith(newDate);
  });

  it('should handle opening and closing', () => {
    const onOpenChange = jest.fn();
    const { result } = renderHook(() => useDatePicker({ 
      onOpenChange 
    }));
    
    // Toggle open
    act(() => {
      result.current.toggleOpen();
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    
    // Toggle close
    act(() => {
      result.current.toggleOpen();
    });
    
    expect(result.current.isOpen).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should handle setting open state', () => {
    const onOpenChange = jest.fn();
    const { result } = renderHook(() => useDatePicker({ 
      onOpenChange 
    }));
    
    act(() => {
      result.current.setOpen(true);
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('should not change state when disabled', () => {
    const onChange = jest.fn();
    const onOpenChange = jest.fn();
    const { result } = renderHook(() => useDatePicker({ 
      disabled: true,
      onChange,
      onOpenChange
    }));
    
    const newDate = new Date(2023, 11, 25);
    
    act(() => {
      result.current.handleSelect(newDate);
    });
    
    act(() => {
      result.current.toggleOpen();
    });
    
    expect(result.current.dateValue).toBeNull();
    expect(result.current.isOpen).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('should not change state when readonly', () => {
    const onChange = jest.fn();
    const onOpenChange = jest.fn();
    const { result } = renderHook(() => useDatePicker({ 
      readonly: true,
      onChange,
      onOpenChange
    }));
    
    const newDate = new Date(2023, 11, 25);
    
    act(() => {
      result.current.handleSelect(newDate);
    });
    
    act(() => {
      result.current.toggleOpen();
    });
    
    expect(result.current.dateValue).toBeNull();
    expect(result.current.isOpen).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('should clear value', () => {
    const onChange = jest.fn();
    const initialValue = new Date(2023, 11, 25);
    const { result } = renderHook(() => useDatePicker({ 
      value: initialValue,
      onChange 
    }));
    
    // Ensure initial value is set
    expect(result.current.dateValue).toEqual(initialValue);
    
    // Clear value
    act(() => {
      // Mock the event parameter
      result.current.clearValue({ stopPropagation: jest.fn() } as unknown as React.MouseEvent);
    });
    
    expect(result.current.dateValue).toBeNull();
    expect(onChange).toHaveBeenCalledWith(null);
  });
});