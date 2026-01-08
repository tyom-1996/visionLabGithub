import ApplicationForm from '@/components/shared/ApplicationForm';
import { FORM_CATEGORY_TEXT } from '@/consts';
import styles from './styles.module.scss';

const DemoRequest = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>Contact Us</h2>
      </div>
      <div className={styles.formWrapper}>
        <ApplicationForm
          isAdCheckboxHide
          initialCategory={FORM_CATEGORY_TEXT.DEMO}
          classNameSubmitBtn={styles.submitBtn}
        />
      </div>
    </section>
  );
};

export default DemoRequest;
