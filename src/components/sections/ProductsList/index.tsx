import Image from 'next/image';
import DualStyledText from '@/components/shared/DualStyledText';
import MediaContent from './MediaContent';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { ProductType } from '@/types/components/product';
import { ApiUrl } from '@/consts/apiUrl';
import classNames from 'classnames';
import styles from './styles.module.scss';
import stylesGeneral from '@/components/layout/GeneralWrapper/styles.module.scss';
import { cleanHTML } from '@/utils/helpers';

const ProductsList = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={classNames(stylesGeneral.centerBorders, styles.productsListWrapper)}>
      {products.map((product, index) =>
        <div
          itemScope
          itemType="https://schema.org/Product"
          key={product.id + index}
          className={styles.productWrapper}
        >
          <div>
            <div className={styles.productTitle}>
              {product.image_logo &&
                <div itemScope itemType="https://schema.org/ImageObject">
                  <Image
                    itemProp="contentUrl"
                    src={ApiUrl.MAIN + product.image_logo}
                    alt={product.alt_logo || ''}
                    title={product.title_logo || ''}
                    width={48}
                    height={48}
                  />
                </div>
              }
              <DualStyledText
                itemProp="name"
                name={product.name_logo || ''}
                colorVariant="dark"
                sizeVariant="md"
              />
            </div>
            <p itemProp="description" className={styles.productDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(product.preview_text) }}/>
          </div>
          <MediaContent product={product} />
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(ProductsList);
