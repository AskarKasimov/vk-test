import { FC, useState } from 'react';
import styles from './TableControls.module.scss';
import CreateBookModal from '../../CreateBookModal/CreateBookModal.tsx';
import Button from '../../../shared/ui/Button/Button.tsx';

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
        <Button
          disabled={disabled}
          onClick={() => setModalOpen(!isModalOpen)}
          additionalClassName={styles.createButton}
        >
          ✏️ Внести новую книгу
        </Button>
        <Button
          disabled={disabled}
          onClick={reset}
          additionalClassName={styles.resetButton}
        >
          🔄 Обновить
        </Button>
      </div>
    </>
  );
};

export default TableControls;
