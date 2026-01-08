'use client';

import { ToastContainer } from 'react-toastify';
import styles from './styles.module.scss';

export const ToastsContainer = () => {
  return (
    <ToastContainer
      className={styles.toastContainer}
      position="bottom-left"
    />
  );
};
