import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import { CompliancePageMiscType } from '@/types/components/compliance';
import styles from './styles.module.scss';

type Props = {
  title: string,
  misc: CompliancePageMiscType,
}

const ComplianceBusinessStandards = ({ title, misc }: Props) => {
  return (
    <div className={styles.wrapper}>
      <AdvancedTextBlock
        title={title}
        titleVariant="h1"
        descriptionLabel="Our Standards"
        description={misc.text}
        descriptionVariant="md"
      />
      <div className={styles.greyTextWrapper}>
        <p>{misc.subtext}</p>
      </div>
    </div>
  );
};

export default ComplianceBusinessStandards;
