import ImageWithStackedCards from '@/components/sections/ImageWithStackedCards';
import { ProductDetailsType } from '@/types/components/product';
import styles from './styles.module.scss';
import { cleanHTML } from '@/utils/helpers';

type ProductModulesProps = {
  titleLabel: string | number,
  modules: ProductDetailsType['modules'],
};

const ModulesList = ({ modules }: { modules: ProductDetailsType['modules'] }) => {
  return (
    <div className={styles.modulesList}>
      {modules.map(moduleData =>
        <div key={moduleData.value} className={styles.moduleWrapper}>
          <p className={styles.moduleName}>{moduleData.value}</p>
          <p className={styles.moduleDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(moduleData.description) }}/>
        </div>
      )}
    </div>
  );
};

const ProductModules = ({ modules, titleLabel }: ProductModulesProps) => {
  return (
    <ImageWithStackedCards
      title="Process model"
      titleLabel={titleLabel}
      content={<ModulesList modules={modules} />}
    />
  );
};

export default ProductModules;
