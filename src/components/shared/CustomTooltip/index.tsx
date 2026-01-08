'use client';

import { PropsWithChildren } from 'react';
import { Tooltip } from 'react-tooltip';
import styles from './styles.module.scss';

type Props = {
  id: string,
}

const CustomTooltip = ({ children, id }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.tooltipCustomWrapper}>
      <Tooltip
        className={styles.tooltipCustom}
        place="top"
        id={id}
      >
        {children}
      </Tooltip>
    </div>
  );
};

export default CustomTooltip;
