import { ComputerVisionType } from '@/types/components/mainPage';
import ComputerVisionButtons from './Buttons';
import styles from './styles.module.scss';
import { cleanHTML } from '@/utils/helpers';

const ComputerVision = ({ texts }: { texts?: ComputerVisionType }) => {
  return (
    <section className={styles.wrapper} data-menu-visibility>
      <div className={styles.introWrapper}>
        <div className={styles.banner}>
          <video src="/content/video/main-banner.mp4" playsInline muted autoPlay loop >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles.introBlock}>
          <div className={styles.introText}>
            <h1 className={styles.introTitle} dangerouslySetInnerHTML={{ __html: cleanHTML(texts?.title || 'Technology that sees and understands') }}></h1>
            <p className={styles.introDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(texts?.text || 'We develop technologies for recognizing both humans and objects - of any complexity, for any industry.') }}></p>
          </div>
          <ComputerVisionButtons />
        </div>
      </div>
    </section>
  );
};

export default ComputerVision;
