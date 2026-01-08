'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/shared/Button';
import FormModal from '@/components/shared/FormModal';
import Menu from '@/components/shared/Menu';
import useWindowSize from '@/hooks/useWindowSize';
import useToggle from '@/hooks/useToggle';
import useOutsideClick from '@/hooks/useOutsideClick';
import { checkTouchDevice, handleScrollToBlock, textAnimationV2 } from '@/utils/helpers';
import { FORM_CATEGORY_TEXT } from '@/consts';
import { NavigationDataType } from '@/types/components/navigation';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  navigation: NavigationDataType[],
  isScrolled: boolean,
}

const Navigation = ({ navigation, isScrolled }: Props) => {
  const { isLessThanLG } = useWindowSize();
  const { isOpened: isModalOpened, open: openModal, close: closeModal } = useToggle();
  const [openedMenuData, setOpenedMenuData] = useState<NavigationDataType | null>(null);
  const [isTouchMenuOpen, setIsTouchMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'RU' | 'EN'>('RU');
  const navRef = useRef<HTMLDivElement | null>(null);
  const isTouchDevice = checkTouchDevice();

  const handleMenuOpen = ({ navData }: { navData: NavigationDataType }) => {
    const isSelected = openedMenuData?.id === navData.id;
    const hasChildren = navData?.children?.length > 0;

    if (!hasChildren) {
      return;
    }

    setOpenedMenuData(isSelected ? null : navData);

    if (isTouchMenuOpen && !isSelected) {
      // Используем requestAnimationFrame, чтобы скролл сработал после обновления состояния (альтернатива setTimeout)
      requestAnimationFrame(() => {
        handleScrollToBlock({
          blockId: `nav-btn-${navData.name}`,
          scrollContainerId: 'scrolled-block-touch-nav-list',
        });
      });
    }
  };

  const closeMenu = () => {
    setOpenedMenuData(null);
    setIsTouchMenuOpen(false);
  };

  const toggleTouchMenu = () => {
    if (isTouchMenuOpen) {
      closeMenu();
      return;
    }
    setIsTouchMenuOpen(true);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => prev === 'RU' ? 'EN' : 'RU');
  };

  const animateLang = (event?: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
    const el = event?.currentTarget?.querySelector('span') as HTMLElement | null;
    if (el) {
      textAnimationV2(el);
    }
  };

  const handleDesktopNavEvent = ({ event, navData }: { event?: React.MouseEvent<HTMLElement>, navData: NavigationDataType }) => {
    const isSelected = openedMenuData?.id === navData.id;
    const element = event?.currentTarget as HTMLElement;

    if (!isSelected || isTouchDevice) {
      handleMenuOpen({ navData });
    }

    if (element) {
      textAnimationV2(element.querySelector('.navLinkName') as HTMLElement);
    }
  };

  useOutsideClick({ ref: navRef, callback: closeMenu });

  useEffect(() => {
    if (isLessThanLG && openedMenuData) {
      setIsTouchMenuOpen(true);
    }
  }, [isLessThanLG, openedMenuData]);

  useEffect(() => {
    const firstNavData = navigation[0];
    if (isTouchMenuOpen && !openedMenuData && firstNavData) {
      setOpenedMenuData(firstNavData);
    }
  }, [isTouchMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={styles.navigationWrapper}
      onMouseLeave={closeMenu}
    >
      {!isLessThanLG &&
        <div className={styles.navigationBtnList} >
          {navigation.map((navData, index) =>
            <div key={`${index}${navData.id}`}>
              <Button
                variant="transparent-primary-text"
                svgId={navData?.children?.length > 0 ? 'arrow-down-small' : undefined}
                className={classNames(styles.navBtn, 'button-icon-to-down', {
                  [styles.open]: openedMenuData?.id === navData.id,
                })}
                onClick={() => handleDesktopNavEvent({ navData })}
                onMouseEnter={(event: React.MouseEvent<HTMLElement> | undefined) => handleDesktopNavEvent({ event, navData })}
                href={!navData.code ? undefined : `/${navData.code}`}
              >
                <span className='navLinkName'>{navData.name}</span>
              </Button>
            </div>
          )}
        </div>
      }
      <Button
        variant="transparent-black"
        className={styles.headerLangBtn}
        onClick={toggleLanguage}
        aria-pressed={language === 'EN'}
        onMouseEnter={animateLang}
      >
        <span>{language}</span>
      </Button>
      {isLessThanLG &&
        <div>
          <Button
            variant="transparent-black"
            svgId={isTouchMenuOpen ? 'close' : 'menu'}
            className={classNames(styles.headerMenuBtn, { [styles.active]: isTouchMenuOpen })}
            onClick={toggleTouchMenu}
          />
        </div>
      }
      {isScrolled &&
        <div className={styles.headerDemoBtnWrapper}>
          <Button variant="secondary" onClick={openModal} animatedText>
            <span>DEMO</span>
          </Button>
        </div>
      }
      <Menu
        navigation={navigation}
        openedMenuData={openedMenuData}
        isTouchMenuOpen={isTouchMenuOpen}
        handleMenuOpen={handleMenuOpen}
        closeMenu={closeMenu}
        openModal={openModal}
      />
      {isModalOpened &&
        <FormModal onClose={closeModal} initialCategory={FORM_CATEGORY_TEXT.DEMO} />
      }
    </nav>
  );
};

export default Navigation;
