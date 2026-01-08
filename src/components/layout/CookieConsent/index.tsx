'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/shared/Button';
import InfoIcon from './InfoIcon';
import classNames from 'classnames';

const COOKIE_KEY = 'cookie_consent_choice';
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

type ConsentChoice = 'all' | 'essential' | 'decline';

export const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);

    if (!saved) {
      setIsOpen(true);
    }
  }, []);

  const saveChoice = useCallback((choice: ConsentChoice) => {
    const expires = Date.now() + ONE_YEAR_MS;
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({ choice, expires })
    );

    switch (choice) {
      case 'all':
        console.log('Cookies accepted: all');
        break;
      case 'essential':
        console.log('Cookies accepted: essential');
        break;
      case 'decline':
        console.log('Cookies declined');
        break;
    }

    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);


  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTrapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTrapFocus);
    first?.focus();

    return () => window.removeEventListener('keydown', handleTrapFocus);
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className={styles.container} role="presentation">
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
      >
        <div className={styles.infoIcon}>
            <InfoIcon  />
        </div>

        <h2 id="cookie-title" className={styles.title}>
          Использование Cookies
        </h2>

        <p id="cookie-desc" className={styles.text}>
          Мы используем файлы cookies для улучшения работы сайта и вашего опыта взаимодействия. Вы можете согласиться на использование всех cookies, принять только обязательные или отказаться от необязательных cookies.
        </p>

        <div className={styles.buttons}>
            <button
                onClick={() => saveChoice('all')}
                className={classNames(styles.consentBtn, styles.accept)}
            >
                Принять все
            </button>
            <button
                onClick={() => saveChoice('decline')}
                className={classNames(styles.consentBtn, styles.decline)}
            >
                Отказаться
            </button>
            <button
                onClick={() => saveChoice('essential')}
                className={classNames(styles.consentBtn, styles.essential)}
            >
                Только обязательные
            </button>
        </div>
      </div>
    </div>
  );
};
