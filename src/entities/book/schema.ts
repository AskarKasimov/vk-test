import { z } from 'zod';

const zParsedInt = (
  min: number,
  minMessage?: string,
  max?: number,
  maxMessage?: string
) =>
  z.preprocess(
    (val: unknown) => {
      const num = Number(val);
      return isNaN(num) ? val : num;
    },
    z
      .number({ message: 'Должно быть числом' })
      .int('Должно быть целым числом')
      .min(min, minMessage || `Значение не может быть меньше ${min}`)
      .max(
        max ?? Number.MAX_SAFE_INTEGER,
        maxMessage ||
          `Значение не может быть больше ${max ?? Number.MAX_SAFE_INTEGER}`
      )
  );

export const bookDTOSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Название обязательно'),
  author: z.string().min(1, 'Автор обязателен'),
  genre: z.string().min(1, 'Жанр обязателен'),
  language: z.string().min(1, 'Язык обязателен'),
  year: zParsedInt(
    0,
    'Только наша эра',
    new Date().getFullYear(),
    'Год из будущего недопустим'
  ),
  availableCopies: zParsedInt(
    0,
    'Количество доступных копий не может быть меньше 0'
  ),
  occupiedCopies: zParsedInt(
    0,
    'Количество занятых копий не может быть меньше 0'
  ),
});
