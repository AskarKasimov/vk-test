import { FC, useEffect, useRef } from 'react';
import styles from './TableWrapper.module.scss';
import { useGetInfinityBooks } from '../../entities/book/queries.ts';
import Table from './Table/Table.tsx';
import Loader from '../../shared/ui/Loader';
import TableControls from './TableControls/TableControls.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const TableWrapper: FC = () => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinityBooks();

  const queryClient = useQueryClient();
  const handleReset = async () => {
    // сброс таблицы
    queryClient.removeQueries({ queryKey: ['books'] });
    await refetch();
    toast.success('Таблица сброшена');
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const target = wrapperRef.current;

    if (target == null) return;

    const bottomReached =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 100;

    if (bottomReached && hasNextPage && !isFetchingNextPage) {
      // нужно проверить, что есть следующая страница, и при этом загрузка уже не происходит
      fetchNextPage();
    }
  };

  useEffect(() => {
    // вызов просчёта необходимости подгрузки в случае, если скролл статичен внизу страницы
    handleScroll();
  }, [data, hasNextPage, isFetchingNextPage]);

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
    <div className={styles.tableBlock}>
      <TableControls
        reset={handleReset}
        disabled={isLoading || isFetchingNextPage || !data}
      />
      <div
        className={styles.tableWrapper}
        onScroll={handleScroll}
        ref={wrapperRef}
      >
        <Table
          books={data?.pages.flatMap((page) => page.books) || []}
          isFetchingNextPage={isFetchingNextPage}
          isSuccess={isSuccess}
        />
        <div className={styles.loader}>
          <h2>*конец таблицы*</h2>
          {hasNextPage ? (
            <p>Ничего страшного, ещё парочка книг на подходе</p>
          ) : (
            <p>Что ж, на этом пока всё :(</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableWrapper;
