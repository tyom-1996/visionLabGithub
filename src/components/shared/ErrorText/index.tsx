import { Button } from '../Button';
import classNames from 'classnames';
import styles from './styles.module.scss';

const ErrorText = ({
  error,
  reset,
  isFullHeight,
}: {
  error?: Error & { digest?: string },
  reset?: () => void,
  isFullHeight?: boolean,
}) => {
  if (error) {
    console.error('Error occurred: ', error);
  }

  return (
    <div className={classNames(styles.errorWrapper, { [styles.fullHeight]: isFullHeight })}>
      <div className={styles.textWrapper}>
        <h2>Oops, something went wrong.</h2>
        <p>
          Try refresh the page
          {isFullHeight &&
            <span> or return to the main page.</span>
          }
        </p>
      </div>
      {isFullHeight &&
        <div className={styles.buttonWrapper}>
          <Button variant="primary" onClick={() => reset?.()} animatedText>
            Refresh the page
          </Button>
        </div>
      }
    </div>
  );
};

export default ErrorText;
