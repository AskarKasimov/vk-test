import { FC } from 'react';
import styles from './App.module.scss';
import TableWrapper from './features/BooksTable/TableWrapper.tsx';

const App: FC = () => {
  return (
    <main className={styles.main}>
      <TableWrapper />
    </main>
  );
};

export default App;
