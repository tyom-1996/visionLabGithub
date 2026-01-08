'use client';

import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { cleanHTML, handleCopyToClipboard } from '@/utils/helpers';
import { ComplianceContactType } from '@/types/components/compliance';
import styles from './styles.module.scss';

const ContactBtn = ({ contact }: {contact: ComplianceContactType}) => {
  const { value } = contact;

  const handleClick = () => {
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

  if (contact.is_email) {
    return (
      <Button
        variant="transparent-primary-text"
        svgId="arrow-down-small"
        className={styles.contactItemBtn}
        href={`mailto:${value}`}
      >
        <span>{value}</span>
      </Button>
    );
  }

  if (contact.is_site) {
    return (
      <Button
        variant="transparent-primary-text"
        svgId="arrow-down-small"
        className={styles.contactItemBtn}
        href={value}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{value}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="transparent-primary-text"
      className={styles.contactItemBtn}
      onClick={handleClick}
    >
      <span>{value}</span>
    </Button>
  );
};

const ComplianceContacts = ({
  contacts,
  email,
  texts,
}: {
  contacts: ComplianceContactType[],
  email: string
  texts: {
    contacts_text: string,
    hotline_title: string,
    hotline_text: string,
    secondary_text: string,
  }
}) => {
  const primaryDescription = texts.contacts_text || 'If you have any questions regarding compliance or business ethics, please do not hesitate to contact us';
  const infoBoldText = texts.hotline_title || 'MTS Group Hotline';
  const infoPrimaryText = texts.hotline_text || "You can report any violations to the MTS Group's dedicated hotline.";
  const infoSecondaryText = texts.secondary_text || 'The unified hotline is supported by an independent third party.<br /><br />We guarantee confidentiality and non-disclosure of personal data and do not allow any retaliatory actions against those who report violations. Reports can also be made anonymously. It is not allowed to intentionally provide false or misleading information.';

  return (
    <div className={styles.wrapper}>
      <div className={styles.headingWrapper}>
        <AdvancedTextBlock
          title="Where to direct questions"
          titleVariant="h2"
          descriptionLabel="Contacts"
          isLabelInParentheses
          description={`${primaryDescription}<a href="mailto:${email}">${email}</a><span class="uselectable">.</span>`}
          descriptionVariant="md"
        />
      </div>
      <div className={styles.infoTextBlock}>
        <h3 className={styles.infoBoldText}>{infoBoldText}</h3>
        <p className={styles.infoPrimaryText} dangerouslySetInnerHTML={{ __html: cleanHTML(infoPrimaryText) }} />
      </div>
      <div className={styles.contactWrapper}>
        {contacts.map((contactData, index) =>
          <div key={contactData.name + index} className={styles.contactItem}>
            <p
              className={styles.contactItemTitle}
              dangerouslySetInnerHTML={{ __html: cleanHTML(contactData.name) }}
            />
            <div className={styles.contactItemDetails}>
              <ContactBtn contact={contactData} />
            </div>
          </div>
        )}
      </div>
      <div className={styles.infoTextBlock}>
        <p className={styles.infoSecondaryText} dangerouslySetInnerHTML={{ __html: cleanHTML(infoSecondaryText) }} />
      </div>
    </div>
  );
};

export default withErrorBoundary(ComplianceContacts);
