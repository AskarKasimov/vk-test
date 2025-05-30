import ReactLogo from '@/assets/react.svg?react';
import ViteLogo from '@/assets/vite.svg?react';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { countStore } from './shared/store';

const App = observer(() => {
  return (
    <>
      <div>
        <a
          href="https://vite.dev"
          target="_blank"
          className={styles.logoContainer}
        >
          <div className={styles.logoWrapper}>
            <ViteLogo className={styles.logo} />
          </div>
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className={styles.logoContainer}
        >
          <div className={styles.logoWrapper}>
            <ReactLogo className={`${styles.logo} ${styles.react}`} />
          </div>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button onClick={() => countStore.increment()}>
          count is {countStore.count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
      <Outlet />
    </>
  );
});

export default App;
