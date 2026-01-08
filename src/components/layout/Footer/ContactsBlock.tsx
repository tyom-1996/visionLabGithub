'use client';

import { Button } from '@/components/shared/Button';
import { handleCopyToClipboard } from '@/utils/helpers';
import styles from './styles.module.scss';
import classNames from 'classnames';

const ContactsBlock = ({ telephone, email, className }: { telephone: string, email: string, className?: string }) => {
  const handlePhoneCLick = () => {
    handleCopyToClipboard({ info: telephone, title: 'Telephone' });

    if (typeof window !== 'undefined' && window.ym) {
      window.ym(102944320, 'reachGoal', 'click_phone',
        {
          event:
          {
            eventCategory: 'phone',
            eventAction: 'element_click',
            eventLabel: 'copy',
            eventContent: 'null',
            eventContext: 'null',
            url: window.location.pathname,
          },
        }
      );
    }
  };

  return (
    <address className={classNames(styles.contacts, className)}>
      <Button
        variant='transparent-primary-text'
        className={classNames(styles.contactBtn, styles.telephone)}
        onClick={handlePhoneCLick}
      >
        <span>{telephone}</span>
      </Button>
      <Button
        variant='transparent-primary-text'
        className={styles.contactBtn}
        href={`mailto:${email}`}
      >
        <span>{email}</span>
      </Button>
    </address>
  );
};

export default ContactsBlock;
