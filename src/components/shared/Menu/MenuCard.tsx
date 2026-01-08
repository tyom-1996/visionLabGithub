import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sprite from '@/components/shared/Sprite';
import { Button } from '@/components/shared/Button';
import MenuFooter from './MenuFooter';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { ApiUrl } from '@/consts/apiUrl';
import { NavigationDataType } from '@/types/components/navigation';
import classNames from 'classnames';
import styles from './menuCard.module.scss';

type Props = {
  openedMenuData: NavigationDataType | null,
  closeMenu: () => void,
  isDesktop: boolean,
  openModal: () => void,
}

const MenuCard = ({ openedMenuData, closeMenu, isDesktop, openModal }: Props) => {
  const router = useRouter();

  const goToPage = (code?: string) => {
    if (!code) return;
    const isStartPathAdd = !openedMenuData?.can_located_separately;
    const startPath = isStartPathAdd && openedMenuData?.code ? `/${openedMenuData?.code}` : '';
    router.push(`${startPath}/${code}`);
    closeMenu();
  };

  return (
    <div>
      <div className={classNames(styles.menuCardMainContent, {
        [styles.desktop]: isDesktop,
        [styles.shadow]: isDesktop,
      })} data-lenis-prevent-wheel data-lenis-prevent-touch>
        <p className={styles.menuCardTitle}>{openedMenuData?.name}</p>
        <div className={styles.menuCardLinks}>
          {openedMenuData?.children.map((childLink, i) =>
            <div
              key={childLink.code + i}
              role="link"
              className={styles.menuCardLink}
              onClick={() => goToPage(childLink.code)}
            >
              <div className={styles.menuCardLinkContent}>
                {childLink.image_logo &&
                  <Image
                    src={ApiUrl.MAIN + childLink.image_logo}
                    alt={childLink.alt_logo || ''}
                    title={childLink.title_logo || ''}
                    width={24}
                    height={24}
                  />
                }
                <div className={styles.menuCardLinkTitleWrapper}>
                  <p className={styles.menuCardLinkTitle} dangerouslySetInnerHTML={{ __html: childLink.name_logo || '' }} />
                  <div className={styles.menuCardLinkArrow}>
                    <Sprite svgId="arrow-down-small" />
                  </div>
                </div>
              </div>
              <p className={classNames(styles.menuCardLinkDescription, { [styles.addingSpace]: Boolean(childLink.image_logo) })}>
                {childLink.description}
              </p>
            </div>
          )}
        </div>
        {!openedMenuData?.can_located_separately &&
          <div className={styles.menuCardMoreBtn}>
            <Button
              key={openedMenuData?.id}
              variant="white-primary-text"
              svgId="arrow-down-small"
              onClick={closeMenu}
              href={'/' + openedMenuData?.code}
              animatedText
            >
              All {openedMenuData?.name.toLowerCase()}
            </Button>
          </div>
        }
      </div>
      {isDesktop &&
        <MenuFooter openModal={openModal} />
      }
    </div>
  );
};

export default withErrorBoundary(MenuCard);
