'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/shared/Modal';
import ApplicationForm from '@/components/shared/ApplicationForm';
import { getApplicationForm } from '@/api/form';
import { ApiUrl } from '@/consts/apiUrl';
import { ApplicationFormResponse } from '@/types/components/applicationForm';

type Props = {
  onClose: () => void,
  initialCategory?: string,
}

const FormModal = ({ onClose, initialCategory }: Props) => {
  const [formData, setFormData] = useState<ApplicationFormResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const getFormData = async () => {
    try {
      setIsLoading(true);
      const formData = await getApplicationForm();
      setFormData(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <Modal
      title='Submit request'
      onClose={onClose}
      isLoading={isLoading}
      image={formData?.image
        ? {
          src: ApiUrl.MAIN + formData.image,
          alt: formData?.image_alt || '',
          title: formData?.image_title || '',
          width: 442,
          height: 796,
        }
        : undefined
      }
    >
      <ApplicationForm formData={formData} isSubmitBtnLong initialCategory={initialCategory} classNameSubmitBtn="button-in-modal" />
    </Modal>
  );
};

export default FormModal;
