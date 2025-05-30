import { Book, BookDTO } from './types';

export const adaptBook = (dto: BookDTO): Book => ({
  id: Number(dto.id),
  title: dto.title,
  author: dto.author,
  genre: dto.genre,
  language: dto.language,
  year: dto.year,
  availableCopies: dto.availableCopies,
  totalCopies: dto.totalCopies,
  // вычисляемое поле, проверка доступности книжки
  isAvailable: dto.availableCopies > 0,
});
