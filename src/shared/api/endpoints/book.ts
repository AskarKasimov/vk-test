import { http } from '../http.ts';
import { BookDTO } from '@/entities/book/types';

export const bookApi = {
  getAllBooks: (): Promise<BookDTO[]> => http.get<BookDTO[]>(`/books`),
};
