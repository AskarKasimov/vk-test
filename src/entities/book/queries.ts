import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Book, BookDTO } from './types.ts';
import { bookApi } from '../../shared/api/endpoints/book.ts';
import { bookDTOSchema } from './schema.ts';
import { adaptBook } from './adapter.ts';

interface BookPage {
  books: Book[];
  hasMore: boolean;
}

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createBooks'],
    mutationFn: async (book: BookDTO): Promise<Book> => {
      const rawBook: BookDTO = await bookApi.postBook(book);

      const parsed = bookDTOSchema.safeParse(rawBook);
      if (!parsed.success) {
        throw new Error('Сервер вернул некорректную книгу');
      }

      return adaptBook(parsed.data);
    },
    onSuccess: (newBook) => {
      queryClient.setQueryData<InfiniteData<BookPage>>(['books'], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: [
            // меняем первую страницу
            {
              ...oldData.pages[0],
              books: [newBook, ...oldData.pages[0].books],
            },
            // остальные страницы не трогаем
            ...oldData.pages.slice(1),
          ],
        };
      });
    },
  });
};

export const useGetInfinityBooks = () => {
  return useInfiniteQuery({
    queryKey: ['books'],
    queryFn: async ({ pageParam = 0 }): Promise<BookPage> => {
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
