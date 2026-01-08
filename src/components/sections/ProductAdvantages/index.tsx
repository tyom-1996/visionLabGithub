import Image from 'next/image';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { MAX_WIDTH_PAGE_CONTENT } from '@/consts';
import { ApiUrl } from '@/consts/apiUrl';
import styles from './styles.module.scss';
import Sprite from '@/components/shared/Sprite';
import { cleanHTML } from '@/utils/helpers';

type Props = {
  advantages: {
    image?: string,
    imageAlt?: string,
    imageTitle?: string,
    list?: string[],
  },
  titleLabel: string,
};

const ProductAdvantages = ({ advantages, titleLabel }: Props) => {
  return (
    <div className={styles.wrapper}>
      <AdvancedTextBlock
        title="Advantages"
        titleVariant="h2"
        titleLabel={titleLabel}
      />
      <div className={styles.contentWrapper}>
        <div
          itemScope
          itemType="https://schema.org/ImageObject"
          className={styles.contentImageWrapper}
        >
          {advantages.image &&
            <>
              <Image
                itemProp="contentUrl"
                src={ApiUrl.MAIN + advantages.image}
                alt={advantages.imageAlt || ''}
                title={advantages.imageTitle}
                height={443}
                width={MAX_WIDTH_PAGE_CONTENT}
                quality={100}
                className={styles.contentImage}
              />
              <meta itemProp="name" content={advantages.imageTitle} />
              <meta itemProp="description" content={advantages.imageAlt} />
            </>
          }
        </div>
        <div className={styles.advantagesList}>
          {advantages?.list?.slice(0, 4).map((advantageText, index) =>
            <div key={advantageText + index} className={styles.advantageWrapper}>
              <div className={styles.advantageSvgWrapper}>
                <Sprite svgId='arrow-split-x' />
              </div>
              <p className={styles.advantageText} dangerouslySetInnerHTML={{ __html: cleanHTML(advantageText) }}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(ProductAdvantages);
