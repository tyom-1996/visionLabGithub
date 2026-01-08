import { Button } from '@/components/shared/Button';
import SuccessStoriesList from '@/components/sections/SuccessStoriesList';
import { SuccessStoryType } from '@/types/components/successStories';
import styles from './styles.module.scss';
import { RoutePath } from '@/consts/routes';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import classNames from 'classnames';

const OurPartners = ({ partners, titleLabel }: { partners: SuccessStoryType[], titleLabel?: string }) => {
  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.titleWrapper, { [styles.withTitleLabel]: titleLabel })}>
        {titleLabel &&
          <div className={styles.label}>{titleLabel}</div>
        }
        <h2 className="section-title">Our Partners</h2>
      </div>
      <SuccessStoriesList successStories={partners.slice(0, 6)} isImageGrayscale={false} />
      <div className={styles.allStories}>
        <Button
          variant="white-primary-text"
          lottieIconId="dash-with-dots"
          href={RoutePath.PARTNERS}
          animatedText
        >
          All Partners
        </Button>
      </div>
    </div>
  );
};

export default withErrorBoundary(OurPartners);
