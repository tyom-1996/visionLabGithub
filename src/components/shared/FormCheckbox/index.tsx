import { FieldProps } from 'formik';
import Sprite from '@/components/shared/Sprite';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  text: string,
  highlightWord?: string,
  pdfLink?: string,
  description?: string,
  isDescriptionSkip?: boolean,
} & FieldProps;

type TextProps = {
  text: string,
  highlightWord?: string,
  pdfLink?: string,
}

const Text = ({ text, highlightWord, pdfLink }: TextProps) => {
  if (highlightWord && pdfLink) {
    // Разбиваем текст на части, чтобы выделить слово
    const textParts = text.split(highlightWord);

    return (
      <span className={styles.text}>
        {textParts[0]}
        <a
          onClick={(e) => e.stopPropagation()}
          href={pdfLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.highlightedWord}
        >
          {highlightWord}
        </a>
        {textParts[1]}
      </span>
    );
  }

  return <span className={styles.text}>{text}</span>;
};

export const FormCheckbox = ({
  field,
  form,
  text,
  highlightWord,
  pdfLink,
  description,
  isDescriptionSkip,
}: Props) => {
  const { touched, errors } = form;
  const error = touched[field.name] && errors[field.name];

  return (
    <div className={classNames(styles.checkboxContainer, {
      [styles.unfilled]: !field.value,
      [styles.error]: error,
    })}>
      <label className={classNames(styles.checkboxWrapper)}>
        <input
          type="checkbox"
          {...field}
          checked={field.value}
          onChange={() => form.setFieldValue(field.name, !field.value)}
          className={styles.hiddenCheckbox}
        />
        <span className={styles.svgWrapper}>
          <Sprite svgId={field.value ? 'checkbox-filled' : 'checkbox-unfilled'} />
        </span>
        <Text text={text} highlightWord={highlightWord} pdfLink={pdfLink} />
      </label>
      {!isDescriptionSkip &&
        <p className={styles.description}>
          {description && description}
          {error && `${error}`}
        </p>
      }
    </div>
  );
};
