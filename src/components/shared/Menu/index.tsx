'use client';

import { useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import MenuCard from './MenuCard';
import MenuFooter from './MenuFooter';
import useWindowSize from '@/hooks/useWindowSize';
import { disableBodyScroll, enableBodyScroll } from '@/utils/helpers';
import { NavigationDataType } from '@/types/components/navigation';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  navigation: NavigationDataType[],
  openedMenuData: NavigationDataType | null,
  isTouchMenuOpen: boolean,
  handleMenuOpen: ({ navData }: { navData: NavigationDataType }) => void,
  closeMenu: () => void,
  openModal: () => void,
}

const Menu = (props: Props) => {
  const { navigation, openedMenuData, isTouchMenuOpen, handleMenuOpen, closeMenu, openModal } = props;
  const { isLessThanLG } = useWindowSize();

  // Отключаем скролл страницы при открытии меню
  useEffect(() => {
    if (isTouchMenuOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }

    return () => enableBodyScroll();
  }, [isTouchMenuOpen]);

  return (
    <>
      {(isLessThanLG && (isTouchMenuOpen || openedMenuData)) &&
        <div className={styles.darkBackground} />
      }
      <div className={classNames(styles.menuWrapper, { [styles.open]: Boolean(openedMenuData || isTouchMenuOpen) })}>
        {!isLessThanLG && openedMenuData &&
          <div className={styles.desktopWrapper}>
            <MenuCard openedMenuData={openedMenuData} closeMenu={closeMenu} isDesktop openModal={openModal} />
          </div>
        }
        {isLessThanLG && isTouchMenuOpen &&
          <div className={styles.touchWrapper}>
            <div id="scrolled-block-touch-nav-list" className={styles.touchNavList} data-lenis-prevent-wheel data-lenis-prevent-touch>
              {navigation.map((navData, index) =>
                <div key={`${index}${navData.id}`}>
                  <div className={styles.touchNavBtnWrapper}>
                    <Button
                      id={`nav-btn-${navData.name}`}
                      variant="transparent-primary-text"
                      svgId={navData?.children.length > 0 ? 'arrow-down-small' : undefined}
                      className={classNames(styles.touchNavBtn, { [styles.open]: openedMenuData?.id === navData.id })}
                      onClick={() => handleMenuOpen({ navData })}
                      href={navData?.children.length > 0 ? undefined : navData.code}
                    >
                      <span>{navData.name}</span>
                    </Button>
                  </div>
                  <div className={classNames(styles.menuCardWrapper, { [styles.open]: openedMenuData?.id === navData.id })}>
                    {openedMenuData?.id === navData.id &&
                      <MenuCard openedMenuData={openedMenuData} closeMenu={closeMenu} isDesktop={false} openModal={openModal} />
                    }
                  </div>
                </div>
              )}
            </div>
            <MenuFooter openModal={openModal} />
          </div>
        }
      </div>
    </>
  );
};

export default Menu;
