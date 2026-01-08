import styles from './styles.module.scss';
import { Button } from '@/components/shared/Button';
import classNames from 'classnames';

const ServerError = ({ error }: { error?: Error & { digest?: string } }) => {
  if (error) {
    console.error('Error occurred: ', error);
  }
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.bgCode}>500</h1>
      <div className={styles.text}>
        <h2 className={styles.heading}>Server error</h2>
        <p>Our team is working on it, please try again shortly</p>
        <address className={styles.contacts}>
          <Button
            variant='transparent-primary-text'
            className={classNames(styles.contactBtn, styles.telephone)}
            href="tel:+97145693248"
          >
            <span>+971 4 569 3248</span>
          </Button>
          <Button
            variant='transparent-primary-text'
            className={styles.contactBtn}
            href="mailto:sales@visionlabs.ai"
          >
            <span>sales@visionlabs.ai</span>
          </Button>
        </address>
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

export default ServerError;
