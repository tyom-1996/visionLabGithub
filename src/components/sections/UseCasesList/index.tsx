import UseCaseCard from '@/components/sections/UseCaseCard/CardWrapper';
import { UseCaseType } from '@/types/components/useCases';
import stylesGeneral from '@/components/layout/GeneralWrapper/styles.module.scss';
import classNames from 'classnames';
import styles from './styles.module.scss';

const UseCasesList = ({ useCases }: { useCases: UseCaseType[] }) => {
  return (
    <div className={classNames(stylesGeneral.centerBorders, styles.useCasesList)}>
      {useCases.map((useCase, index) => (
        <div key={`${useCase?.id}${index}`} className={styles.cardWrapper}>
          <UseCaseCard card={useCase} />
        </div>
      ))}
    </div>
  );
};

export default UseCasesList;
