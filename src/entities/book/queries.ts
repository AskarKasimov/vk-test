import { useInfiniteQuery } from '@tanstack/react-query';
import { Book, BookDTO } from './types.ts';
import { bookApi } from '../../shared/api/endpoints/book.ts';
import { bookDTOSchema } from './schema.ts';
import { adaptBook } from './adapter.ts';

export const useGetBooksByPageQuery = () => {
  return useInfiniteQuery({
    queryKey: ['books'],
    queryFn: async ({
      pageParam = 0,
    }): Promise<{ books: Book[]; hasMore: boolean }> => {
      const rawDTO: BookDTO[] = await bookApi.getBooksByPage(pageParam);
      const booksCount = rawDTO.length;
      const safeParsedBooks = rawDTO.map((book) => {
        const result = bookDTOSchema.safeParse(book);
        if (!result.success) {
          console.warn('Invalid book data:', result.error);
        }
        return result;
      });
      return {
        books: safeParsedBooks
          .filter((r) => r.success)
          .map((r) => adaptBook(r.data)),
        hasMore: booksCount > 0,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
  });
};
