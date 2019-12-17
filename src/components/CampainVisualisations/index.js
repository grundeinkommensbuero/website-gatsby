import React, { useState } from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import cN from 'classnames';

export default ({ visualisations }) => {
  const [currentCounts, setCurrentCounts] = useState(() => {
    // fake API call
    setInterval(() => {
      setCurrentCounts({
        'schleswig-holstein-1': Math.round(Math.random() * 30000),
      });
    }, 2000);
  });

  return (
    <>
      {visualisations.map((visualisation, index) => (
        <Visualisation
          key={index}
          {...visualisation}
          currentCount={
            currentCounts && currentCounts[visualisation.campainCode]
          }
        />
      ))}
    </>
  );
};

const Visualisation = ({
  campainCode,
  goal,
  startDate,
  title,
  currentCount,
}) => {
  const percentage = currentCount
    ? Math.min((currentCount / goal) * 100, 100)
    : 0;
  const countOutside = percentage < 40;
  return (
    <SectionInner>
      {title && <h2>{title}</h2>}
      <div className={s.bar}>
        <div className={s.barGoal}>
          <div>{goal && goal.toLocaleString('de')}</div>
        </div>
        <div
          className={cN(s.barCurrent, { [s.outside]: countOutside })}
          style={{ width: `${percentage}%` }}
        >
          <div>{currentCount && currentCount.toLocaleString('de')}</div>
        </div>
      </div>
    </SectionInner>
  );
};
