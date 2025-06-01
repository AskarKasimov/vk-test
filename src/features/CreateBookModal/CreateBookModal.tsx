import Modal from 'react-modal';
import styles from './CreateBookModal.module.scss';
import { FormEvent, useState } from 'react';
import { BookDTO } from '../../entities/book/types.ts';
import { toast } from 'react-toastify';
import { useCreateBook } from '../../entities/book/queries.ts';
import Button from '../../shared/ui/Button/Button.tsx';

interface CreateBookModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CreateBookModal = ({ isOpen, onRequestClose }: CreateBookModalProps) => {
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [availableCopies, setAvailableCopies] = useState<string>('');
  const [occupiedCopies, setOccupiedCopies] = useState<string>('');

  const { mutate } = useCreateBook();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsedYear = parseInt(year);
    if (isNaN(parsedYear)) {
      toast.error('Год должен быть числом');
      return;
    }
    const parsedAvailableCopies = parseInt(availableCopies);
    if (isNaN(parsedAvailableCopies)) {
      toast.error('Количество свободных копий должно быть числом');
      return;
    }
    const parsedOccupiedCopies = parseInt(occupiedCopies);
    if (isNaN(parsedOccupiedCopies)) {
      toast.error('Количество занятых копий должно быть числом');
      return;
    }
    const newBook: BookDTO = {
      id,
      title,
      author,
      genre,
      language,
      year: parsedYear,
      availableCopies: parsedAvailableCopies,
      occupiedCopies: parsedOccupiedCopies,
    };
    mutate(newBook, {
      onSuccess: () => {
        toast.success('Книга успешно добавлена');
        onRequestClose();
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(`Ошибка при добавлении книги: ${error.message}`);
        } else {
          toast.error('Произошла неизвестная ошибка');
        }
      },
    });
  };

  return (
    <Modal
      appElement={document.getElementById('root')!}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Добавить книгу</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.labels}>
          <label>
            <span>ID</span>
            <input
              type="text"
              placeholder="1"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <label>
            <span>Название</span>
            <input
              type="text"
              placeholder="Война и мир"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Автор</span>
            <input
              type="text"
              placeholder="Лев Толстой"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label>
            <span>Жанр</span>
            <input
              type="text"
              placeholder="Роман"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>
          <label>
            <span>Язык</span>
            <input
              type="text"
              placeholder="Русский"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </label>
          <label>
            <span>Год издания</span>
            <input
              type="number"
              min="0"
              placeholder="2016"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label>
            <span>Кол-во свободных копий</span>
            <input
              type="number"
              min="0"
              placeholder="1"
              value={availableCopies}
              onChange={(e) => setAvailableCopies(e.target.value)}
            />
          </label>
          <label>
            <span>Кол-во занятых копий</span>
            <input
              type="number"
              min="0"
              placeholder="3"
              value={occupiedCopies}
              onChange={(e) => setOccupiedCopies(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.controls}>
          <Button additionalClassName={styles.saveButton} type="submit">
            Сохранить
          </Button>
          <Button
            additionalClassName={styles.cancelButton}
            onClick={onRequestClose}
          >
            Отмена
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBookModal;
