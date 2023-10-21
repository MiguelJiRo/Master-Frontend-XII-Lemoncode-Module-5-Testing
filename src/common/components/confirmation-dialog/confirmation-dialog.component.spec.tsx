import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/components/ConfirmationDialogComponent', () => {
  let props: any;

  beforeEach(() => {
    props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'My Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: 'My Children',
    };
  });

  it('Si isOpen es TRUE debe de existir el componente', () => {
    // Arrange
    // Act
    const renderedComponent = render(
      <ConfirmationDialogComponent {...props} />
    );
    const dialog = screen.queryByRole('dialog');
    // Assert
    expect(dialog).toBeInTheDocument();
  });

  it('Si isOpen es FALSE no debe de existir el componente', () => {
    // Arrange
    props.isOpen = false;
    // Act
    const renderedComponent = render(
      <ConfirmationDialogComponent {...props} />
    );
    const dialog = screen.queryByRole('dialog');
    // Assert
    expect(dialog).not.toBeInTheDocument();
  });

  it('El título se debe corresponder con el texto de las props', () => {
    // Arrange
    // Act
    const renderedComponent = render(
      <ConfirmationDialogComponent {...props} />
    );
    const dialog = screen.queryByRole('dialog');
    const component = within(dialog).getByRole('heading', { level: 2 });
    // Assert
    expect(component).toHaveTextContent(props.title);
  });

  it('El texto del botón CLOSE debe corresponderse con la label de las props', () => {
    // Arrange
    // Act
    const renderedComponent = render(
      <ConfirmationDialogComponent {...props} />
    );
    const dialog = screen.queryByRole('dialog');
    const component = within(dialog).getByRole('button', {
      name: props.labels.closeButton,
    });
    // Assert
    expect(component).toBeInTheDocument();
  });

  it('Si se pulsa sobre el botón CLOSE debe de activarse dicho botón (onClose)', () => {
    // Arrange
    // Act
    const { getByText } = render(<ConfirmationDialogComponent {...props} />);
    const element = getByText(props.labels.closeButton);
    fireEvent.click(element);
    // Assert
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('El texto del botón OPEN debe corresponderse con la label de las props', () => {
    // Arrange
    // Act
    const renderedComponent = render(
      <ConfirmationDialogComponent {...props} />
    );
    const dialog = screen.queryByRole('dialog');
    const component = within(dialog).getByRole('button', {
      name: props.labels.acceptButton,
    });
    // Assert
    expect(component).toBeInTheDocument();
  });

  it('Si se pulsa sobre el botón OPEN debe de activarse dicho botón (handleAccept)', () => {
    // Arrange
    // Act
    const { getByText } = render(<ConfirmationDialogComponent {...props} />);
    const element = getByText(props.labels.acceptButton);
    fireEvent.click(element);
    // Assert
    expect(getByText('Accept')).toBeInTheDocument();
  });

  it('El CONTENT dentro del DialogContent deben corresponderse con los de las props', () => {
    // Arrange
    // Act
    const { getByText } = render(<ConfirmationDialogComponent {...props} />);
    const element = getByText(props.children);
    // Assert
    expect(getByText('My Children')).toBeInTheDocument();
  });
});
