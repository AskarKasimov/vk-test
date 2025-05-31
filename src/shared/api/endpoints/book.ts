import { http } from '../http.ts';
import { BookDTO } from '@/entities/book/types';

export const bookApi = {
  getBooksByPage: async (page: number): Promise<BookDTO[]> => {
    return http.get<BookDTO[]>(`/books?_start=${page * 5}&_limit=5`);
  },
};
