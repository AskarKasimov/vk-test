// DTO
export type BookDTO = {
  id: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  year: number;
  availableCopies: number;
  totalCopies: number;
};

// внутрянка
export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  language: string;
  year: number;
  availableCopies: number;
  totalCopies: number;
  isAvailable: boolean;
};
