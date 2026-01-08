import { FieldProps } from 'formik';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  placeholder?: string,
  className?: string,
  description?: string,
  isPhoneType?: boolean,
} & FieldProps;

export const FormInput = ({
  field,
  form: { touched, errors },
  placeholder,
  description,
  className,
  isPhoneType,
  ...props
}: Props) => {
  const error = touched[field.name] && errors[field.name];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '');
    field.onChange({ target: { name: field.name, value: onlyNumbers } });
  };

  return (
    <div className={classNames(styles.inputContainer, className, { [styles.error]: error })}>
      <label className={classNames(styles.inputWrapper, { [styles.filled]: field.value })}>
        <span className={styles.label}>{placeholder}</span>
        {isPhoneType
          ? <input
            {...field}
            {...props}
            type="tel"
            className={styles.input}
            placeholder={placeholder}
            onChange={handlePhoneChange}
            maxLength={18}
          />
          : <input className={styles.input} {...field} {...props} placeholder={placeholder} />
        }
      </label>
      <p className={styles.description}>
        {description && description}
        {error && `${error}`}
      </p>
    </div>
  );
};
