import { FC } from 'react';
import styles from './TableControls.module.scss';
import { Book } from '@/entities/book/types';
import { InfiniteData, QueryObserverResult } from '@tanstack/react-query';

interface TableControlsProps {
  refetch: () => Promise<
    QueryObserverResult<
      InfiniteData<
        {
          books: Book[];
          hasMore: boolean;
        },
        unknown
      >,
      Error
    >
  >;
  reset: () => void;
  disabled?: boolean;
}

const TableControls: FC<TableControlsProps> = ({
  refetch,
  reset,
  disabled = false,
}: TableControlsProps) => {
  return (
    <div className={styles.controls}>
      <button
        className={styles.refetchButton}
        disabled={disabled}
        onClick={() => refetch()}
      >
        🔄 Обновить
      </button>
      <button
        className={styles.resetButton}
        disabled={disabled}
        onClick={() => reset()}
      >
        🧹 Сбросить
      </button>
    </div>
  );
};

export default TableControls;
