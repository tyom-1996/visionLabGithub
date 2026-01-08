'use client';

import { useState } from 'react';
import PlusIcon from '../../../../public/content/icons/plusIcon';
import MinusIcon from '../../../../public/content/icons/minusIcon';

type ProgramItem = {
  id: number | string;
  order: string;
  time: string;
  title: string;
  items: string[];
};

type Props = {
  items: ProgramItem[];
  expandedId?: ProgramItem['id'];
  classes: {
    section: string;
    webinarProgramWrapper?: string;
    headingWrapper?: string;
    heading: string;
    grid: string;
    times: string;
    timeRow: string;
    order: string;
    time: string;
    list: string;
    item: string;
    itemHeader: string;
    title: string;
    toggle: string;
    bullets: string;
  };
};

const WebinarProgram = ({ items, expandedId, classes }: Props) => {
  const [openId, setOpenId] = useState<ProgramItem['id'] | null>(expandedId ?? null);

  const toggle = (id: ProgramItem['id']) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={classes.section}>
        <div className={classes.heading}>Программа вебинара</div>
       

      <div className={classes.grid}>
      <div className={classes.times}>
          {items.map((item) => (
            <div key={item.id} className={classes.timeRow}>
              <span className={classes.order}>{item.order}</span>
              <span className={classes.time}>{item.time}</span>
            </div>
          ))}
        </div>
        <div className={classes.list}>
          {items.map((item) => {
            const isOpen = openId === item.id;
            const hasContent = item.items.length > 0;
            return (
              <div key={item.id} className={classes.item}>
                <div className={classes.itemHeader}>
                  <h3 className={classes.title}>{item.title}</h3>
                  <button
                    type="button"
                    className={classes.toggle}
                    aria-expanded={isOpen}
                    onClick={() => toggle(item.id)}
                  >
                {hasContent ? (isOpen ? <MinusIcon /> : <PlusIcon />) : (isOpen ? <MinusIcon /> : <PlusIcon />)}
                  </button>
                </div>
                {isOpen && hasContent && (
                  <ul className={classes.bullets}>
                    {item.items.map((text, idx) => (
                      <li key={idx}>{text}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WebinarProgram;

