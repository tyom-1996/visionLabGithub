import styles from './styles.module.scss';
import { Button } from '@/components/shared/Button';

const NotFounf = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading404}>404</div>
      <div className={styles.label}>Error</div>
      <div className={styles.text}>
        <h2 className={styles.heading}>Page not found</h2>
        <p>The page may have been deleted, moved, or you have entered an incorrect address.</p>
      </div>
      <Button
        href="/"
        type="submit"
        variant="secondary"
        svgId="arrow-right"
        className={`${styles.actionBtn} button-icon-to-right`}
        animatedText
        isSmallSize
      >
        Go to home page
      </Button>
    </div>
  );
};

export default NotFounf;
