import { useRef, useState } from 'react';
import { useField } from 'formik';
import Sprite from '@/components/shared/Sprite';
import useOutsideClick from '@/hooks/useOutsideClick';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  name: string,
  label: string,
  options: { value: string; label: string }[],
  className?: string,
}

export const FormSelect = ({ name, label, options, className }: Props) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const error = meta.touched && meta.error;

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSelect = (optionValue: string) => {
    setValue(optionValue);
    closeDropdown();
  };

  useOutsideClick({ ref: dropdownRef, callback: closeDropdown });

  return (
    <div className={classNames(styles.selectWrapper, className)}>
      <div
        tabIndex={0}
        className={classNames(styles.customSelect, {
          [styles.filled]: value !== '',
          [styles.open]: isOpen,
          [styles.error]: error,
        })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {
          value
            ? options.find((opt) => opt.value === value)?.label
            : `Select ${label}`
        }
        <div className={styles.customArrow}>
          <Sprite svgId="arrow-down-small" />
        </div>
      </div>
      <ul
        ref={dropdownRef}
        className={classNames(
          styles.dropdown,
          { [styles.dropdownOpen]: isOpen }
        )}
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
      >
        {options.map((option) =>
          <li
            key={option.value}
            className={classNames(
              styles.option,
              { [styles.selected]: option.value === value }
            )}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </li>
        )}
      </ul>
    </div>
  );
};
