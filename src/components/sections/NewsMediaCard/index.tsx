'use client';

import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Sprite from '@/components/shared/Sprite';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { RoutePath } from '@/consts/routes';
import { ApiUrl } from '@/consts/apiUrl';
import { NewsMediaPreviewType } from '@/types/components/newsMedia';
import styles from './styles.module.scss';
import { cleanHTML } from '@/utils/helpers';

const NewsMediaCard = ({ data }: { data: NewsMediaPreviewType }) => {
  const router = useRouter();
  const isThirdPartyResource = data?.href?.startsWith('http');

  const onCardClick = () => {
    if (!data?.href) {
      toast.error('Unfortunately, the news is not available. Please try again laterю');
      return;
    }

    if (isThirdPartyResource) {
      window.open(data.href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(`${RoutePath.NEWS_MEDIA}/${data.href}`);
    }
  };

  return (
    <div
      itemScope
      itemType="https://schema.org/NewsArticle"
      role="link"
      tabIndex={0}
      className={styles.cardWrapper}
      onClick={onCardClick}
    >
      <div className={styles.cardImagesWrapper}>
        {data.logo &&
          <Image
            itemProp="publisher"
            src={ApiUrl.MAIN + data.logo}
            alt={data.logo_alt}
            title={data.logo_title}
            width={72}
            height={72}
            className={styles.cardLogo}
          />
        }
        {data.image &&
          <div itemScope itemType="https://schema.org/ImageObject" className={styles.cardImageWrapper}>
            <Image
              itemProp="contentUrl"
              src={ApiUrl.MAIN + data.image}
              alt={data.image_alt || ''}
              title={data.image_title || ''}
              fill
              quality={100}
            />
          </div>
        }
      </div>
      <div className={styles.cardTextWrapper}>
        <p itemProp="datePublished" className={styles.cardDetails}>
          {data.publish_at} // <span itemProp="publisher">{data.resource}</span>
        </p>
        <p itemProp="headline" className={styles.cardDescription}>
          <span dangerouslySetInnerHTML={{ __html: cleanHTML(data.title) }}/>
          {isThirdPartyResource &&
            <span className={styles.cardDescriptionSvg}>
              <Sprite svgId='redirect' />
            </span>
          }
        </p>
      </div>
    </div>
  );
};

export default withErrorBoundary(NewsMediaCard);
