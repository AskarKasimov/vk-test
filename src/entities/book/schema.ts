import { z } from 'zod';

const zParsedInt = (
  fieldName: string,
  min?: number,
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
      .number({ message: `Поле "${fieldName}" должно быть числом` })
      .int(`Поле "${fieldName}" должно быть целым числом`)
      .min(
        min ?? Number.MIN_SAFE_INTEGER,
        minMessage ||
          `Значение поля "${fieldName}" не может быть меньше ${min ?? Number.MIN_SAFE_INTEGER}`
      )
      .max(
        max ?? Number.MAX_SAFE_INTEGER,
        maxMessage ||
          `Значение поля "${fieldName}" не может быть больше ${max ?? Number.MAX_SAFE_INTEGER}`
      )
  );

export const bookDTOSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Поле "Название" обязательно'),
  author: z.string().min(1, 'Поле "Автор" обязательно'),
  genre: z.string().min(1, 'Поле "Жанр" обязательно'),
  language: z.string().min(1, 'Поле "Язык" обязательно'),
  year: zParsedInt(
    'Год',
    0,
    'Только наша эра',
    new Date().getFullYear(),
    'Год из будущего недопустим'
  ),
  availableCopies: zParsedInt(
    'Кол-во доступных копий',
    0,
    'Количество доступных копий не может быть меньше 0'
  ),
  occupiedCopies: zParsedInt(
    'Кол-во занятых копий',
    0,
    'Количество занятых копий не может быть меньше 0'
  ),
});

export type BookDTO = z.infer<typeof bookDTOSchema>;
