import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

/*
<body
      style="padding-right: 1024px; overflow: hidden;"
    >
      <div
        aria-hidden="true"
      />
      <div
        class="MuiDialog-root MuiModal-root css-zw3mfo-MuiModal-root-MuiDialog-root"
        role="presentation"
      >
        <div
          aria-hidden="true"
          class="MuiBackdrop-root MuiModal-backdrop css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop"
          style="opacity: 1; webkit-transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"
        />
        <div
          data-testid="sentinelStart"
          tabindex="0"
        />
        <div
          class="MuiDialog-container MuiDialog-scrollPaper css-hz1bth-MuiDialog-container"
          role="presentation"
          style="opacity: 1; webkit-transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"
          tabindex="-1"
        >
          <div
            aria-labelledby=":r4:"
            class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-1t1j96h-MuiPaper-root-MuiDialog-paper"
            role="dialog"
          >
            <h2
              class="MuiTypography-root MuiTypography-h6 MuiDialogTitle-root css-bdhsul-MuiTypography-root-MuiDialogTitle-root"
              id=":r4:"
            >
              My Title
            </h2>
            <div
              class="MuiDialogContent-root css-ypiqx9-MuiDialogContent-root"
            >
              My Children
            </div>
            <div
              class="MuiDialogActions-root MuiDialogActions-spacing css-hlj6pa-MuiDialogActions-root"
            >
              <button
                class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium css-zcbmsk-MuiButtonBase-root-MuiButton-root"
                tabindex="0"
                type="button"
              >
                Close
                <span
                  class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                />
              </button>
              <button
                class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-sghohy-MuiButtonBase-root-MuiButton-root"
                tabindex="0"
                type="button"
              >
                Accept
                <span
                  class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          data-testid="sentinelEnd"
          tabindex="0"
        />
      </div>
    </body>
*/

describe('common/components/ConfirmationDialogComponent', () => {

  it('Si isOpen es TRUE debe de existir el componente', () => {
    // Arrange
    const props = {
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
    // Act
    const renderedComponent = render(< ConfirmationDialogComponent {...props} />);
    const dialog = screen.queryByRole('dialog');
    // Assert
    expect(dialog).toBeInTheDocument();
  });

  it('Si isOpen es FALSE no debe de existir el componente', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'My Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: 'My Children',
    };
    // Act
    const renderedComponent = render(< ConfirmationDialogComponent {...props} />);
    const dialog = screen.queryByRole('dialog');
    // Assert
    expect(dialog).not.toBeInTheDocument();
  });

  it('El título se debe corresponder con el texto de las props', () => {
    // Arrange
    const props = {
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
    // Act
    const renderedComponent = render(< ConfirmationDialogComponent {...props} />);
    const dialog = screen.queryByRole('dialog');
    const component = within(dialog).getByRole('heading', {level:2});
    // Assert
    expect(component).toHaveTextContent(props.title);
  });

  it('El texto del botón CLOSE debe corresponderse con la label de las props', () => {
    // Arrange
    const props = {
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
    // Act
    const renderedComponent = render(< ConfirmationDialogComponent {...props} />);
    const dialog = screen.queryByRole('dialog');
    const component = within(dialog).getByRole('button', {name: props.labels.closeButton});
    // Assert
    expect(component).toBeInTheDocument();
  });

  it('Si se pulsa sobre el botón CLOSE debe de activarse dicho botón (onClose)', () => {
    // Arrange
    const props = {
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
    // Act
    const { getByText } = render(< ConfirmationDialogComponent {...props} />);
    const element = getByText(props.labels.closeButton);
    fireEvent.click(element);
    // Assert
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('El texto del botón OPEN debe corresponderse con la label de las props', () => {
    // Arrange
    const props = {
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
    // Act
    const renderedComponent = render(< ConfirmationDialogComponent {...props} />);
    const dialog = screen.queryByRole('dialog');
    const component = within(dialog).getByRole('button', {name: props.labels.acceptButton});
    // Assert
    expect(component).toBeInTheDocument();
  });

  it('Si se pulsa sobre el botón OPEN debe de activarse dicho botón (handleAccept)', () => {
    // Arrange
    const props = {
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
    // Act
    const { getByText } = render(< ConfirmationDialogComponent {...props} />);
    const element = getByText(props.labels.acceptButton);
    fireEvent.click(element);
    // Assert
    expect(getByText('Accept')).toBeInTheDocument();
  });

  it('El CONTENT dentro del DialogContent deben corresponderse con los de las props', () => {
    // Arrange
    const props = {
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
    // Act
    const { getByText } = render(< ConfirmationDialogComponent {...props} />);
    const element = getByText(props.children);
    // Assert
    expect(getByText('My Children')).toBeInTheDocument();
  });
});
