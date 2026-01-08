import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import MediaAccordion from '@/components/shared/MediaAccordion';
import { PartnersType } from '@/types/components/partners';
import styles from './styles.module.scss';

const PartnersReasons = ({ reasons, label }: { reasons: PartnersType['reasons'], label?: string }) => {
  return (
    <section className={styles.wrapper}>
      <AdvancedTextBlock
        title={reasons.title}
        titleVariant="h2"
        titleLabel={label || reasons?.list?.length}
        isLabelInParentheses={!label}
      />
      <MediaAccordion
        elementsList={reasons?.list || []}
        isLongDescription
      />
    </section>
  );
};

export default PartnersReasons;
