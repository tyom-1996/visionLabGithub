import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import styles from './menuFooter.module.scss';

type Props = {
  openModal: () => void,
}

const MenuFooter = ({ openModal }: Props) => {
  return (
    <div className={styles.menuFooterWrapper} onClick={openModal}>
      <div className={styles.menuFooterContent}>
        <div className={styles.menuFooterImageWrapper}>
          <Image
            src="/content/icons/triangle-in-circle.svg"
            alt=""
            width={72}
            height={56}
          />
        </div>
        <p className={styles.menuFooterText}>Discover how our products perform in real-world applications</p>
      </div>
      <div className={styles.menuFooterBtnWrapper}>
        <Button
          variant="secondary"
          svgId="arrow-right"
        />
      </div>
    </div>
  );
};

export default MenuFooter;
