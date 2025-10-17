import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../index';

describe('Modal', () => {
  beforeEach(() => {
    // 清理DOM
    document.body.innerHTML = '';
  });

  it('should render correctly when visible is true', () => {
    render(
      <Modal visible title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should not render when visible is false', () => {
    const { container } = render(
      <Modal visible={false} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render with custom width', () => {
    render(
      <Modal visible width={600} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveStyle({ width: '600px' });
  });

  it('should call onCancel when close button is clicked', () => {
    const onCancel = jest.fn();
    render(
      <Modal visible onCancel={onCancel} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it('should call onCancel when mask is clicked', () => {
    const onCancel = jest.fn();
    render(
      <Modal visible onCancel={onCancel} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const mask = screen.getByRole('dialog').closest('.ant-modal-wrap');
    if (mask) {
      fireEvent.click(mask);
      expect(onCancel).toHaveBeenCalled();
    }
  });

  it('should call onOk when ok button is clicked', () => {
    const onOk = jest.fn();
    render(
      <Modal visible onOk={onOk} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const okButton = screen.getByText('确定');
    fireEvent.click(okButton);
    expect(onOk).toHaveBeenCalled();
  });
});