import { FC } from 'react';
import { useGetBooksByPageQuery } from '../../entities/book/queries.ts';
import Loader from '../../shared/ui/Loader';

const BooksTable: FC = () => {
  const { data, isSuccess, isLoading, isError } = useGetBooksByPageQuery();

  if (isLoading) return <Loader />;

  if (isError) return <>Ошибка связи с сервером</>;

  if (isSuccess)
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
          {data.pages
            .flatMap((page) => page.books)
            .map((book) => (
              <tr key={book.id}>
                <td>{book.isAvailable ? '✅' : '❌'}</td>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.language}</td>
                <td>{book.year}</td>
                <td>{book.availableCopies}</td>
                <td>{book.totalCopies}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
};

export default BooksTable;
