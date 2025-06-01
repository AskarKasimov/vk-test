import { FC, useState } from 'react';
import styles from './TableControls.module.scss';
import CreateBookModal from '../../CreateBookModal/CreateBookModal.tsx';

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
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <CreateBookModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
      <div className={styles.controls}>
        <button
          className={styles.createButton}
          disabled={disabled}
          onClick={() => setModalOpen(!isModalOpen)}
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
    </>
  );
};

export default TableControls;
