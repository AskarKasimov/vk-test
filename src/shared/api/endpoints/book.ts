import { http } from '../http.ts';
import { BookDTO } from '@/entities/book/types';

export const bookApi = {
  getBooksByPage: async (page: number): Promise<BookDTO[]> => {
    return http.get<BookDTO[]>(`/books?_start=${page * 10}&_limit=10`);
  },
};
