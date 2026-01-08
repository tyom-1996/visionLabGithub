import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode
};

const GeneralWrapper = ({ children }: Props) => {
  return (
    <div className={classNames(styles.wrapper, styles.sideBorders, styles.centerBorders)}>
      {children}
    </div>
  );
};

export default GeneralWrapper;
