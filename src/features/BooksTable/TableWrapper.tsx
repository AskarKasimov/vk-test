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

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className={styles.tableWrapper}>
      <Table
        books={data?.pages.flatMap((page) => page.books) || []}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />
      <div ref={loaderRef} className={styles.loader}>
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
};
export default TableWrapper;
