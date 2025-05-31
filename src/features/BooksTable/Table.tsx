import { FC } from 'react';
import styles from './BooksTable.module.scss';
import { Book } from '../../entities/book/types.ts';

interface BooksTableProps {
  books: Book[];
  isFetchingNextPage: boolean;
  isSuccess: boolean;
}

const BooksTable: FC<BooksTableProps> = ({
  books,
  isFetchingNextPage,
  isSuccess,
}: BooksTableProps) => {
  return (
    <table className={styles.table}>
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
          <th>Заняты</th>
          <th>Всего</th>
        </tr>
      </thead>
      <tbody>
        {isSuccess
          ? books.map((book) => (
              <tr key={book.id}>
                <td>{book.isAvailable ? '✅' : '❌'}</td>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.language}</td>
                <td>{book.year}</td>
                <td>{book.availableCopies}</td>
                <td>{book.occupiedCopies}</td>
                <td>{book.totalCopies}</td>
              </tr>
            ))
          : null}
        {isFetchingNextPage
          ? Array.from(Array(4).keys()).map((tr) => (
              <tr key={tr}>
                {Array.from(Array(10).keys()).map((td) => (
                  <td key={td}>
                    <div className={styles.skeleton} />
                  </td>
                ))}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default BooksTable;
