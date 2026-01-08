import MediaContent from './MediaContent';
import { cleanHTML, formatToTwoDigits } from '@/utils/helpers';
import { SolutionType } from '@/types/components/solutions';
import styles from './styles.module.scss';

const SolutionsList = ({ solutions }: { solutions: SolutionType[] }) => {
  return (
    <div className={styles.solutionsListWrapper}>
      {solutions?.map((solution, index) =>
        <div
          itemScope
          itemType="https://schema.org/Service"
          key={solution.id + index}
          className={styles.solutionWrapper}
        >
          <div className={styles.solutionTextWrapper}>
            <p className={styles.solutionNumber}>
              {formatToTwoDigits(index + 1)}
            </p>
            <div className={styles.solutionTitleAndDescription}>
              <p itemProp="name" className={styles.solutionTitle}>
                {solution.name}
              </p>
              <p itemProp="description" className={styles.solutionDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(solution.preview_text) }}/>
            </div>
          </div>
          <MediaContent solution={solution} />
        </div>
      )}
    </div>
  );
};

export default SolutionsList;
