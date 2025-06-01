import Modal from 'react-modal';
import styles from './CreateBookModal.module.scss';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateBook } from '../../entities/book/queries.ts';
import Button from '../../shared/ui/Button/Button.tsx';
import { bookDTOSchema } from '../../entities/book/schema.ts';

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

  const resetForm = () => {
    setId('');
    setTitle('');
    setAuthor('');
    setGenre('');
    setLanguage('');
    setYear('');
    setAvailableCopies('');
    setOccupiedCopies('');
  };

  const [disabled, setDisabled] = useState<boolean>(false);

  const { mutate } = useCreateBook();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);

    const rawData = {
      id,
      title,
      author,
      genre,
      language,
      year,
      availableCopies,
      occupiedCopies,
    };

    const parsed = bookDTOSchema.safeParse(rawData);

    if (!parsed.success) {
      setDisabled(false);
      parsed.error.errors.forEach((err) => {
        toast.error(err.message);
      });
    } else
      mutate(parsed.data, {
        onSuccess: () => {
          toast.success('Книга успешно добавлена');
          resetForm();
          onRequestClose();
        },
        onError: (error: Error) => {
          toast.error(`Ошибка при добавлении книги: ${error.message}`);
        },
        onSettled: () => {
          setDisabled(false);
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
              disabled={disabled}
              type="text"
              placeholder="1"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <label>
            <span>Название</span>
            <input
              disabled={disabled}
              type="text"
              placeholder="Война и мир"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Автор</span>
            <input
              disabled={disabled}
              type="text"
              placeholder="Лев Толстой"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label>
            <span>Жанр</span>
            <input
              disabled={disabled}
              type="text"
              placeholder="Роман"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>
          <label>
            <span>Язык</span>
            <input
              disabled={disabled}
              type="text"
              placeholder="Русский"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </label>
          <label>
            <span>Год издания</span>
            <input
              disabled={disabled}
              type="text"
              placeholder="2016"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label>
            <span>Кол-во свободных копий</span>
            <input
              disabled={disabled}
              type="text"
              placeholder="1"
              value={availableCopies}
              onChange={(e) => setAvailableCopies(e.target.value)}
            />
          </label>
          <label>
            <span>Кол-во занятых копий</span>
            <input
              disabled={disabled}
              type="text"
              placeholder="3"
              value={occupiedCopies}
              onChange={(e) => setOccupiedCopies(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.controls}>
          <Button
            disabled={disabled}
            additionalClassName={styles.saveButton}
            type="submit"
          >
            Сохранить
          </Button>
          <Button
            disabled={disabled}
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
