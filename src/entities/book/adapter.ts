import { Book } from './types';
import { BookDTO } from './schema.ts';

export const adaptBook = (dto: BookDTO): Book => ({
  id: dto.id,
  title: dto.title,
  author: dto.author,
  genre: dto.genre,
  language: dto.language,
  year: dto.year,
  availableCopies: dto.availableCopies,
  occupiedCopies: dto.occupiedCopies,
  // вычисляемые поля
  totalCopies: dto.availableCopies + dto.occupiedCopies,
  isAvailable: dto.availableCopies > 0,
});
