import Image from 'next/image';
import DualStyledText from '@/components/shared/DualStyledText';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { ApiUrl } from '@/consts/apiUrl';
import { ProductDetailsType } from '@/types/components/product';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { formatToTwoDigits } from '@/utils/helpers';

type Props = {
  product: ProductDetailsType,
  titleLabel?: string | number,
  isLabelInParentheses?: boolean,
}

const ProductItemPageTitle = ({ product, titleLabel, isLabelInParentheses }: Props) => {
  const getLabelText = (label?: number | string) => {
    if (typeof label === 'number') {
      const countValue = formatToTwoDigits(label);
      return isLabelInParentheses ? `(${countValue})` : countValue;
    }
    return label;
  };

  return (
    <div
      itemScope itemType="https://schema.org/Product"
      className={classNames('section-wrapper', styles.wrapper)}
    >
      <div className={styles.titleWithLogo}>
        <div className={styles.titleLabelWrapper}>
          <p className={styles.label}>{getLabelText(titleLabel)}</p>
        </div>
        <div className={styles.titleWrapper}>
          <div
            itemScope itemType="https://schema.org/ImageObject"
            className={styles.logoWrapper}
          >
            <Image
              itemProp="contentUrl"
              src={ApiUrl.MAIN + product.detail_logo}
              alt={product.detail_logo_alt || ''}
              title={product.detail_logo_title}
              width={48}
              height={48}
            />
          </div>
          <DualStyledText
            name={product.detail_title}
            colorVariant="dark"
            sizeVariant="lg"
            tag="h1"
            itemProp="name"
          />
        </div>
      </div>
      <p itemProp="description" className={styles.description}>{product.detail_subtitle}</p>
    </div>
  );
};

export default withErrorBoundary(ProductItemPageTitle);
