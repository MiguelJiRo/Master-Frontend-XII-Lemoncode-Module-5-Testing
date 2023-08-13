import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup, Lookup } from 'common/models';

describe('common/components/ConfirmationDialogComponent hook', () => {

  it('isOpen debe de ser false cuando se renderiza el hook', () => {
    // Arrange
    
    // Act
    const hookRendered = renderHook(useConfirmationDialog);
    // Assert
    expect(hookRendered.result.current.isOpen).toEqual(false);
  });

  it('itemToDelete debe de tener el valor de createEmptyLookup cuando se renderiza el hook', () => {
    // Arrange
    
    // Act
    const hookRendered = renderHook(useConfirmationDialog);
    // Assert
    expect(hookRendered.result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('Cuando se llama onAccept se actualiza el valor de itemToDelete a un empty lookup', () => {
    // Arrange
    
    // Act
    const hookRendered = renderHook(useConfirmationDialog);
    const resulOption = createEmptyLookup();
    act(() => {
      hookRendered.result.current.onAccept();
    });
    // Assert
    expect(hookRendered.result.current.itemToDelete).toEqual(resulOption);
  });

  it('Cuando se llama onClose se actualiza el valor de isOpen a false', () => {
    // Arrange
    
    // Act
    const hookRendered = renderHook(useConfirmationDialog);
    act(() => {
      hookRendered.result.current.onClose();
    });
    // Assert
    expect(hookRendered.result.current.isOpen).toEqual(false);
  });

  it('Cuando se llama onOpenDialog se actualiza el valor de isOpen a true y el de itemToDelete al valor del ejemplo', () => {
    // Arrange
    const example: Lookup = {
      id: '111',
      name: 'AAA',
    };
    // Act
    const hookRendered = renderHook(useConfirmationDialog);
    act(() => {
      hookRendered.result.current.onOpenDialog(example);
    });
    // Assert
    expect(hookRendered.result.current.isOpen).toEqual(true);
    expect(hookRendered.result.current.itemToDelete).toEqual(example);
  });

  it('Cuando se llama onOpenDialog y después onAccept, el valor de itemToDelete es un emptyLookup', () => {
    // Arrange
    const example: Lookup = {
      id: '111',
      name: 'AAA',
    };
    const emptyLookup = createEmptyLookup();
    // Act
    const hookRendered = renderHook(useConfirmationDialog);
    act(() => {
      hookRendered.result.current.onOpenDialog(example);
      hookRendered.result.current.onAccept();
    });
    // Assert
    expect(hookRendered.result.current.isOpen).toEqual(true);
    expect(hookRendered.result.current.itemToDelete).toEqual(emptyLookup);
  });

  it('Cuando se llama onOpenDialog y después onClose, el valor de isOpen es false', () => {
    // Arrange
    const example: Lookup = {
      id: '111',
      name: 'AAA',
    };
    // Act
    const hookRendered = renderHook(useConfirmationDialog);
    act(() => {
      hookRendered.result.current.onOpenDialog(example);
      hookRendered.result.current.onClose();
    });
    // Assert
    expect(hookRendered.result.current.isOpen).toEqual(false);
    expect(hookRendered.result.current.itemToDelete).toEqual(example);
  });

  it('Cuando se llama onOpenDialog, después onAccept y onClose, el valor de isOpen es false y el valor de itemToDelete es un emptyLookup', () => {
    // Arrange
    const example: Lookup = {
      id: '111',
      name: 'AAA',
    };
    const emptyLookup = createEmptyLookup();
    // Act
    const hookRendered = renderHook(useConfirmationDialog);
    act(() => {
      hookRendered.result.current.onOpenDialog(example);
      hookRendered.result.current.onAccept();
      hookRendered.result.current.onClose();
    });
    // Assert
    expect(hookRendered.result.current.isOpen).toEqual(false);
    expect(hookRendered.result.current.itemToDelete).toEqual(emptyLookup);
  });
});
