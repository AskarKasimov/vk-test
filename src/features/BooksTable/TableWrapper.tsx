import { FC, useEffect, useRef } from 'react';
import styles from './BooksTable.module.scss';
import { useGetInfinityBooks } from '../../entities/book/queries.ts';
import Table from './Table.tsx';
import Loader from '../../shared/ui/Loader';

const TableWrapper: FC = () => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfinityBooks();

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = loaderRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          // нужно проверить, что есть следующая страница, и при этом загрузка уже не происходит
          fetchNextPage();
        }
      },
      {
        root: document.querySelector(`.${styles.tableWrapper}`),
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage]);

  if (isError) {
    return (
      <div className={styles.loader}>
        <h2>⛔</h2>
        <h2>Произошла ошибка при загрузке данных</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader />
        <h2>Загрузка данных...</h2>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <Table
        books={data?.pages.flatMap((page) => page.books) || []}
        isFetchingNextPage={isFetchingNextPage}
        isSuccess={isSuccess}
      />
      <div ref={loaderRef} className={styles.loader}>
        <h2>*конец таблицы*</h2>
        {hasNextPage ? (
          !isFetchingNextPage && (
            <p>Ничего страшного, ещё парочка книг на подходе</p>
          )
        ) : (
          <p>Что ж, на этом пока всё :(</p>
        )}
      </div>
    </div>
  );
};
export default TableWrapper;
