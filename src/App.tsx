import { FC } from 'react';
import BooksTable from './features/BooksTable';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <main className={styles.main}>
      <BooksTable />
    </main>
  );
};

export default App;
