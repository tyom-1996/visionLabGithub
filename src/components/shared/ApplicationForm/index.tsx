'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormInput } from '@/components/shared/FormInput';
import { FormCheckbox } from '@/components/shared/FormCheckbox';
import { FormSelect } from '@/components/shared/FormSelect';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { ERROR_TEXT } from '@/consts';
import { getApplicationForm, postApplicationForm } from '@/api/form';
import { MOCK_FORM_DATA } from './mock';
import { BooleanStatus } from '@/types/api';
import { ApplicationFormResponse } from '@/types/components/applicationForm';
import { CurrentData, FormDataType, FormikActions } from './types';
import classNames from 'classnames';
import styles from './styles.module.scss';
import useInViewport from '@/hooks/useInViewport';
import { textAnimationV2 } from '@/utils/helpers';
// @ts-expect-error - для пакета нет типизации
import translitRusEng from 'translit-rus-eng';

type Props = {
  isSubmitBtnLong?: boolean,
  isAdCheckboxHide?: boolean,
  initialCategory?: string,
  formData?: ApplicationFormResponse,
  classNameSubmitBtn?: string,
}

const initialValues: FormDataType = {
  name: '',
  phoneNumber: '',
  email: '',
  agreePolicy: false,
  advertisement: true,
  category: '',
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required(ERROR_TEXT.NAME),
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9-()\s]+$/, ERROR_TEXT.PHONE)
    .min(10, ERROR_TEXT.PHONE),
  email: yup
    .string()
    .email(ERROR_TEXT.EMAIL)
    .required(ERROR_TEXT.EMAIL),
  agreePolicy: yup
    .boolean()
    .oneOf([true], ERROR_TEXT.AGREE),
  category: yup
    .string()
    .required(ERROR_TEXT.CATEGORY),
});

const ApplicationForm = ({ formData, isSubmitBtnLong, isAdCheckboxHide, initialCategory, classNameSubmitBtn }: Props) => {
  const { agreementText, advertisementText } = MOCK_FORM_DATA;
  const [currentData, setCurrentData] = useState<CurrentData>();

  const formButtonRef = useRef<HTMLDivElement>(null);
  const animatedTextRef = useRef<HTMLElement | null>(null);
  const isBlockAnimated = useInViewport({ ref: formButtonRef, area: 0 });

  const handleSubmit = async (values: FormDataType, { setSubmitting, resetForm }: FormikActions) => {
    const { name, phoneNumber, email, agreePolicy, category, advertisement } = values;

    if (category === '') {
      return;
    }
    const body = {
      name,
      phone_number: phoneNumber,
      email,
      agree_policy: agreePolicy ? BooleanStatus.YES : BooleanStatus.NO,
      category,
      consent_to_advertising_information: advertisement ? BooleanStatus.YES : BooleanStatus.NO,
    };

    const response = await postApplicationForm(body);

    if (response) {
      setSubmitting(false);
      resetForm();

      if (typeof window !== 'undefined' && window.ym) {
        window.ym(102944320, 'reachGoal', 'form',
          {
            event:
            {
              eventCategory: 'form',
              eventAction: 'send',
              eventLabel: 'success',
              eventContent: translitRusEng(category, { slugify: true }),
              eventContext: 'null',
              url: window.location.pathname,
            },
          }
        );
      }
    }
  };

  const writeCurrentData = (currentFormData: ApplicationFormResponse) => {
    const { categories } = currentFormData;
    let selectedCategory;

    const selectOptions = categories.map((categoryName) => ({
      value: categoryName,
      label: categoryName,
    }));

    if (initialCategory) {
      selectedCategory = categories.find((categoryName) =>
        categoryName.toLowerCase().includes(initialCategory.toLowerCase())
      );
    }

    setCurrentData({ ...currentFormData, selectOptions, selectedCategory });
  };

  const getFormData = async () => {
    try {
      const newFormData = await getApplicationForm();
      if (newFormData) {
        writeCurrentData(newFormData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonHover = () => {
    if (animatedTextRef?.current) {
      textAnimationV2(animatedTextRef.current);
    }
  };

  useEffect(() => {
    if (formData) {
      writeCurrentData(formData);
    }
    if (!formData) {
      getFormData();
    }
  }, [formData]);

  return (
    <Formik
      initialValues={{
        ...initialValues,
        ...(currentData?.selectedCategory && { category: currentData?.selectedCategory }),
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className={classNames(styles.form, { [styles.loading]: isSubmitting })}>
          <div className={styles.formGroup}>
            <FormSelect className={styles.select} name="category" label='category' options={currentData?.selectOptions || []} />
            <Field
              name="name"
              placeholder="Name*"
              component={FormInput}
            />
            <Field
              name="email"
              type="email"
              placeholder="E-mail*"
              component={FormInput}
            />
            <Field
              name="phoneNumber"
              placeholder="Phone number"
              isPhoneType
              component={FormInput}
            />
            <div>
              <Field
                name="agreePolicy"
                text={agreementText}
                // highlightWord="consent"
                // pdfLink="/docs/personal_data_policy.pdf"
                component={FormCheckbox}
              />
              {!isAdCheckboxHide &&
                <Field
                  name="advertisement"
                  text={advertisementText}
                  component={FormCheckbox}
                  isDescriptionSkip
                />
              }
            </div>
          </div>
          <div className={isBlockAnimated ? styles.visible : ''} ref={formButtonRef}>
            <Button
              type="submit"
              variant="secondary"
              svgId={isSubmitting ? '' : 'arrow-right'}
              className={classNames(
                styles.actionBtn,
                { [styles.longBtn]: isSubmitBtnLong },
                classNameSubmitBtn,
                isSubmitting ? '' : 'button-icon-to-right'
              )}
              isDisabled={isSubmitting}
              onMouseEnter={handleButtonHover}
            >
              {
                isSubmitting
                  ? <Image src={'/content/icons/spinner.svg'} alt="" width={24} height={24} />
                  : <span ref={animatedTextRef}>Submit request</span>
              }
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default withErrorBoundary(ApplicationForm);
