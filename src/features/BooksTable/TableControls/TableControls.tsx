import { FC, useState } from 'react';
import styles from './TableControls.module.scss';
import CreateBookModal from '../../CreateBookModal/CreateBookModal.tsx';

interface TableControlsProps {
  reset: () => void;
  disabled?: boolean;
}

const TableControls: FC<TableControlsProps> = ({
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
          className={styles.resetButton}
          disabled={disabled}
          onClick={() => reset()}
        >
          🔄 Обновить
        </button>
      </div>
    </>
  );
};

export default TableControls;
