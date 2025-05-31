import { FC } from 'react';
import { Book } from '../../entities/book/types.ts';

export interface CustomTableProps {
  rows: Book[];
}

const CustomTable: FC<CustomTableProps> = ({ rows }: CustomTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Есть</th>
          <th>ID</th>
          <th>Название</th>
          <th>Автор</th>
          <th>Жанр</th>
          <th>Язык</th>
          <th>Год выпуска</th>
          <th>Свободны</th>
          <th>Всего</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((book) => (
          <tr key={book.id}>
            <td>{book.isAvailable}</td>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>{book.language}</td>
            <td>{book.year}</td>
            <td>{book.totalCopies}</td>
            <td>{book.availableCopies}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
