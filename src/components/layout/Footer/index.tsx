'use client';

import { Button } from '@/components/shared/Button';
import { NavigationChildDataType, NavigationDataType } from '@/types/components/navigation';
import styles from './styles.module.scss';
import ContactsBlock from './ContactsBlock';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { AdditionalInfo } from '@/types/components/additionalInfo';
import useInViewport from '@/hooks/useInViewport';
import { textAnimationV2 } from '@/utils/helpers';
import useArrayRef from '@/hooks/useArrayRef';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  additionalData: AdditionalInfo | undefined,
  navigation: NavigationDataType[],
  siteUrl: string,
}

const Footer = ({ additionalData, navigation, siteUrl }: Props) => {
  const container = useRef<HTMLDivElement | null>(null);
  const refSecondaryLinks = useRef<HTMLElement | null>(null);
  const [itemsRef, setItemRef] = useArrayRef<HTMLElement>();
  const pathname = usePathname();

  useInViewport({ ref: itemsRef, callback: textAnimationV2 });
  useInViewport({
    ref: refSecondaryLinks,
    area: 0.75,
    callback: (triggerElement) => {
      const linksDom = triggerElement.querySelectorAll<HTMLElement>('.scramb');

      linksDom.forEach((el, index) => {
        clearTimeout(el.dataset.timer);

        // Запуск трансформаций пунктов списка последовательно
        el.dataset.timer = String(setTimeout(() => {
          textAnimationV2(el);
        }, index * 100));
      });
    },
  });

  const rightNavList = (() => {
    if (!navigation) {
      return [];
    }
    const navList = navigation
      .filter(linkData => linkData?.can_located_separately)
      .reduce((acc: NavigationChildDataType[], navLink) => {
        if (navLink?.children.length > 0) {
          navLink.children.forEach((childLink) => {
            acc.push(childLink);
          });
        }

        return acc;
      }, []);
    return navList;
  })();

  const footerSchema = {
    '@context': 'https://schema.org',
    '@type': 'WPFooter',
    description: 'Website footer with contact details and navigation',
    publisher: {
      '@type': 'Organization',
      name: 'VisionLabs',
      url: siteUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: additionalData?.phone_number,
        email: additionalData?.email,
        contactType: 'sales',
      },
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: 'LLC "VisionLabs"',
      url: siteUrl,
    },
    copyrightYear: new Date().getFullYear(),
    hasPart: {
      '@type': 'WebPage',
      name: 'Cookies Policy',
      url: `${siteUrl}/docs/cookie_policy.pdf`,
    },
  };

  useGSAP(() => {
    const navList = gsap.utils.toArray<HTMLElement>('.gsapitem');

    navList.forEach((navItem) => {
      gsap.fromTo(navItem, {
        opacity: 0,
        transform: 'translate(0, 20px)',
      }, {
        scrollTrigger: {
          trigger: navItem,
          start: 'bottom bottom',
          end: 'bottom bottom-=100',
          scrub: true,
        },
        ease: 'cubic-bezier(0.85, 0.09, 0.15, 0.91)',
        opacity: 1,
        transform: 'translate(0, 0)',
      });
    });
  }, { scope: container, dependencies: [pathname] });

  return (
    <>
      <script
        id="footer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(footerSchema),
        }}
      />
      <footer className={styles.footer}>
        <div className={styles.footerLinks} ref={container}>
          <nav className={styles.primaryLinks}>
            <ul>
              {navigation
                .filter((linkData) => linkData)
                .filter((linkData) => !linkData.can_located_separately)
                .map((linkData, index) => (
                  <li key={linkData.code + index} className="gsapitem">
                    <Button
                      href={'/' + linkData.code}
                      variant="transparent-primary-text"
                    >
                      {linkData.name}
                    </Button>
                  </li>
                ))}
            </ul>
          </nav>
          <div className={styles.footerDetails}>
            <nav className={styles.secondaryLinks} ref={refSecondaryLinks}>
              <ul>
                {rightNavList.map((linkData, index) => (
                  <li key={linkData.code + index}>
                    <Button
                      href={'/' + linkData.code}
                      className="scramb"
                      variant="transparent-primary-text"
                    >
                      {linkData.name_logo}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={styles.footerLogo}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_2092_7055"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="64"
                height="64"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M64 32.7625L16.8948 60.2164C21.3951 62.6307 26.5398 64 32.0044 64C49.4251 64 63.5949 50.0834 64 32.7625ZM15.4919 59.4174C6.20787 53.8156 0 43.6326 0 32C0 20.3674 6.20787 10.1844 15.4919 4.58255V59.4174ZM17.0102 3.72204C21.483 1.3461 26.5865 0 32.0044 0C49.3812 0 63.5236 13.8467 63.9966 31.1068L17.0102 3.72204Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_2092_7055)">
                <path
                  d="M16.8948 60.2163L15.9996 58.6804L13.254 60.2806L16.0543 61.7829L16.8948 60.2163ZM63.9999 32.7624L65.7772 32.804L65.8516 29.6256L63.1047 31.2265L63.9999 32.7624ZM15.4919 59.4174L14.5734 60.9395L17.2696 62.5664V59.4174H15.4919ZM15.4919 4.5825H17.2696V1.43347L14.5734 3.06035L15.4919 4.5825ZM17.0102 3.72199L16.1761 2.15197L13.356 3.65L16.115 5.25794L17.0102 3.72199ZM63.9966 31.1067L63.1015 32.6426L65.8613 34.2511L65.7737 31.058L63.9966 31.1067ZM17.79 61.7523L64.8951 34.2984L63.1047 31.2265L15.9996 58.6804L17.79 61.7523ZM32.0044 62.2222C26.8402 62.2222 21.9834 60.9287 17.7352 58.6497L16.0543 61.7829C20.8068 64.3324 26.2394 65.7777 32.0044 65.7777V62.2222ZM62.2226 32.7209C61.8401 49.0784 48.4574 62.2222 32.0044 62.2222V65.7777C50.3927 65.7777 65.3496 51.0882 65.7772 32.804L62.2226 32.7209ZM16.4103 57.8952C7.63731 52.6017 1.77772 42.9841 1.77772 31.9999H-1.77783C-1.77783 44.2811 4.77832 55.0293 14.5734 60.9395L16.4103 57.8952ZM1.77772 31.9999C1.77772 21.0158 7.63731 11.3982 16.4103 6.10465L14.5734 3.06035C4.77832 8.97061 -1.77783 19.7188 -1.77783 31.9999H1.77772ZM13.7141 4.5825V59.4174H17.2696V4.5825H13.7141ZM17.8441 5.29201C22.0663 3.04916 26.8842 1.77772 32.0044 1.77772V-1.77783C26.2887 -1.77783 20.8995 -0.357085 16.1761 2.15197L17.8441 5.29201ZM32.0044 1.77772C48.4159 1.77772 61.7727 14.8554 62.2195 31.1554L65.7737 31.058C65.2743 12.8378 50.3465 -1.77783 32.0044 -1.77783V1.77772ZM64.8918 29.5707L17.9054 2.18604L16.115 5.25794L63.1015 32.6426L64.8918 29.5707Z"
                  fill="#3C46F8"
                />
              </g>
            </svg>
          </div>
        </div>
        <div>
          {(additionalData?.email || additionalData?.phone_number) && (
            <ContactsBlock
              className="gsapitem"
              telephone={additionalData?.phone_number || ''}
              email={additionalData?.email || ''}
            />
          )}
          <div className={styles.footerCopyright}>
            <p className={styles.footerCopyrightText} ref={setItemRef(0)}>
              ©2012-{new Date().getFullYear()} LLC "VisionLabs". All rights
              reserved.
            </p>
            <div className={styles.footerPolicyWrap}>
              <p className={styles.footerCookiesPolicy}>
                <Button
                  variant="transparent-primary-text"
                  href="/docs/cookie_policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={setItemRef(1)}
                >
                  Cookies Policy
                </Button>
              </p>
              <p className={styles.footerCookiesPolicy}>
                <Button
                  variant="transparent-primary-text"
                  href="/docs/personal_data_policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={setItemRef(1)}
                >
                  Personal data processing policy
                </Button>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
