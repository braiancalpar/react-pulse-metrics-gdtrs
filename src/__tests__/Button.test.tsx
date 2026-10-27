import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../components/common/Button';

describe('Button', () => {
  it('renders its label and invokes its click handler', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Save changes</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables interaction while disabled or loading', () => {
    const onClick = jest.fn();
    const { rerender } = render(<Button disabled onClick={onClick}>Disabled</Button>);

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Disabled' }));
    expect(onClick).not.toHaveBeenCalled();

    rerender(<Button loading onClick={onClick}>Saving</Button>);
    expect(screen.getByRole('button', { name: 'refresh Saving' })).toBeDisabled();
    expect(screen.getByText('refresh')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'refresh Saving' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('preserves the requested button type and accepts presentation options', () => {
    render(
      <Button type="submit" variant="danger" size="lg" fullWidth>
        Delete
      </Button>
    );

    expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute('type', 'submit');
    expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled();
  });
});
