import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateBookModal from './CreateBookModal.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mutate = vi.fn();
vi.mock('../../entities/book/queries', () => ({
  useCreateBook: () => ({
    mutate,
  }),
}));

describe('CreateBookModal', () => {
  const onRequestClose = vi.fn();

  beforeEach(() => {
    onRequestClose.mockClear();
    mutate.mockClear();
  });
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
  it('submit form and check mutate input args', async () => {
    render(
      <>
        <CreateBookModal isOpen={true} onRequestClose={onRequestClose} />
      </>
    );

    fireEvent.change(screen.getByLabelText('ID'), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByLabelText('Название'), {
      target: { value: 'типа название' },
    });
    fireEvent.change(screen.getByLabelText('Автор'), {
      target: { value: 'типа автор' },
    });
    fireEvent.change(screen.getByLabelText('Жанр'), {
      target: { value: 'какой-то жанр' },
    });
    fireEvent.change(screen.getByLabelText('Язык'), {
      target: { value: 'русский' },
    });
    fireEvent.change(screen.getByLabelText('Год издания'), {
      target: { value: '2025' },
    });
    fireEvent.change(screen.getByLabelText('Свободные копии'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText('Занятые копии'), {
      target: { value: '3' },
    });

    fireEvent.click(screen.getByText('Сохранить'));

    await waitFor(() => {
      expect(mutate.mock.calls[0][0]).toEqual({
        id: '123',
        title: 'типа название',
        author: 'типа автор',
        genre: 'какой-то жанр',
        language: 'русский',
        year: 2025,
        availableCopies: 2,
        occupiedCopies: 3,
      });
    });
  });
});
