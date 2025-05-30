import { useQuery } from '@tanstack/react-query';
import { Book, BookDTO } from './types.ts';
import { bookApi } from '../../shared/api/endpoints/book.ts';
import { bookDTOSchema } from './schema.ts';
import { adaptBook } from './adapter.ts';

export const useGetAllBooksQuery = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: async (): Promise<Book[]> => {
      const rawDTO: BookDTO[] = await bookApi.getAllBooks();
      const safeParsedBooks = rawDTO.map((book) => {
        const result = bookDTOSchema.safeParse(book);
        if (!result.success) {
          console.warn('Invalid book data:', result.error);
        }
        return result;
      });
      return safeParsedBooks
        .filter((r) => r.success)
        .map((r) => adaptBook(r.data));
    },
  });
};
