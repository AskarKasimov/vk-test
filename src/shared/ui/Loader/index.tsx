import { FC } from 'react';
import styles from './Loader.module.scss';

const Loader: FC = () => {
  return (
    <div className={styles.dotSpinner}>
      <div className={styles.dotSpinnerDot} />
      <div className={styles.dotSpinnerDot} />
      <div className={styles.dotSpinnerDot} />
      <div className={styles.dotSpinnerDot} />
      <div className={styles.dotSpinnerDot} />
      <div className={styles.dotSpinnerDot} />
      <div className={styles.dotSpinnerDot} />
      <div className={styles.dotSpinnerDot} />
    </div>
  );
};

export default Loader;
