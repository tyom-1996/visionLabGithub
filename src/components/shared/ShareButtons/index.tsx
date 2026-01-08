'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import CustomTooltip from '@/components/shared/CustomTooltip';
import { handleCopyToClipboard } from '@/utils/helpers';
import classNames from 'classnames';
import styles from './styles.module.scss';

const SHARE_BTNS_DATA = {
  tg: {
    svdId: 'telegram',
    startHref: 'https://t.me/share/url?url=',
  },
  // vk: {
  //   svdId: 'vkontakte',
  //   startHref: 'https://vk.com/share.php?url=',
  // },
};

const ShareButtons = ({ classNameWrapper }: { classNameWrapper?: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCopyClick = () => {
    handleCopyToClipboard({ info: currentPageUrl, isAlertShow: false });
    setIsCopied(true);
  };

  useEffect(() => {
    // Получаем текущий URL только на клиенте, чтобы избежать ошибки гидратации.
    const path = `${window?.location.origin}${pathname}`;
    const params = searchParams.toString() ? `?${searchParams.toString()}` : '';
    setCurrentPageUrl(path + params);
  }, [pathname, searchParams]);

  return (
    <div className={classNames(styles.buttonsWrapper, classNameWrapper)}>
      {Object.values(SHARE_BTNS_DATA).map((btnData, index) =>
        <Button
          key={index + btnData.svdId}
          variant="white-black"
          svgId={btnData.svdId}
          target="_blank"
          rel="noopener noreferrer"
          href={btnData.startHref + encodeURIComponent(currentPageUrl)}
        />
      )}
      <Button
        data-tooltip-id="copy-url-button"
        variant={isCopied ? 'always-black' : 'white-black'}
        svgId={isCopied ? 'check' : 'copy-link'}
        onClick={handleCopyClick}
      />
      <CustomTooltip id="copy-url-button">
        <span>Copy</span>
        <span>link</span>
      </CustomTooltip>
    </div>
  );
};

export default ShareButtons;
