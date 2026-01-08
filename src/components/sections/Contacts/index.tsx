'use client';

import { Button } from '@/components/shared/Button';
import { cleanHTML, handleCopyToClipboard } from '@/utils/helpers';
import { ContactsType } from '@/types/components/contacts';
import styles from './styles.module.scss';

const Contacts = ({ contactsData }: { contactsData?: ContactsType}) => {
  const handleClick = (value: string) => {
    handleCopyToClipboard({ info: value });

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
    <div className={styles.contactsWrapper}>
      <div className={styles.contactsListWrapper}>
        <div className={styles.contactsList}>
          {contactsData?.contacts.map((contactData, i) => (
            <div key={contactData.name + i} className={styles.contactItem}>
              <p className={styles.contactItemTitle} dangerouslySetInnerHTML={{ __html: cleanHTML(contactData.name) }} />
              <div className={styles.contactItemDetails}>
                {contactData.text.map((detail, index) => {
                  if (detail?.is_email) {
                    return (
                      <Button
                        key={detail.value + index}
                        variant="transparent-primary-text"
                        svgId="arrow-down-small"
                        className={styles.contactItemBtn}
                        href={`mailto:${detail.value}`}
                      >
                        <span>{detail.value}</span>
                      </Button>
                    );
                  }

                  if (detail.description) {
                    return (
                      <Button
                        key={detail.value + index}
                        variant="transparent-primary-text"
                        svgId="arrow-down-small"
                        className={styles.contactItemBtn}
                        href={detail.description}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{detail.value}</span>
                      </Button>
                    );
                  }

                  return (
                    <Button
                      key={detail.value + index}
                      variant="transparent-primary-text"
                      svgId="arrow-down-small"
                      className={styles.contactItemBtn}
                      onClick={() => handleClick(detail.value)}
                    >
                      <span>{detail.value}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
