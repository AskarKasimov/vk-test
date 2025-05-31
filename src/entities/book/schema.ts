import { z } from 'zod';

export const bookDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  language: z.string(),
  year: z.number(),
  availableCopies: z.number(),
  occupiedCopies: z.number(),
});
