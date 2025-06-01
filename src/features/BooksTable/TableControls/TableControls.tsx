import { FC } from 'react';
import styles from './TableControls.module.scss';

interface TableControlsProps {
  refetch: () => void;
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
        className={styles.createButton}
        disabled={disabled}
        onClick={() => refetch()}
      >
        ✏️ Внести новую книгу
      </button>
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
