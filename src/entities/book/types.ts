// DTO
export type BookDTO = {
  id: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  year: number;
  availableCopies: number;
  occupiedCopies: number;
};

// внутрянка
export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  year: number;
  availableCopies: number;
  occupiedCopies: number;
  totalCopies: number;
  isAvailable: boolean;
};
