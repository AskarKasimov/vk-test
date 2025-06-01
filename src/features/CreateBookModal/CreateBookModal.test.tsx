import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateBookModal from './CreateBookModal.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('CreateBookModal', () => {
  it('summing copies to total copies field', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookModal isOpen={true} onRequestClose={() => {}} />
      </QueryClientProvider>
    );

    const availableInput = screen.getByLabelText('Свободные копии');
    const occupiedInput = screen.getByLabelText('Занятые копии');

    fireEvent.change(availableInput, { target: { value: '2' } });
    fireEvent.change(occupiedInput, { target: { value: '5' } });

    await waitFor(() => {
      const totalInput = screen.getByDisplayValue('7');
      expect(totalInput).toBeInTheDocument();
    });
  });
});
