import { z } from 'zod';

const zParsedInt = z.preprocess((val: unknown) => {
  const num = Number(val);
  return isNaN(num) ? val : num;
}, z.number());

export const bookDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  language: z.string(),
  year: zParsedInt,
  availableCopies: zParsedInt,
  occupiedCopies: zParsedInt,
});
