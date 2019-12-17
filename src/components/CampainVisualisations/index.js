import React, { useState } from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';

export default ({ visualisations }) => {
  const [currentCounts, setCurrentCounts] = useState(() => {
    // fake API call
    setTimeout(() => {
      setCurrentCounts({ 'schleswig-holstein-1': 13000 });
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
  const percentage = currentCount ? (currentCount / goal) * 100 : 0;
  return (
    <SectionInner>
      {title}
      <div className={s.bar}>
        <div className={s.barGoal}>
          <div>{goal}</div>
        </div>
        <div className={s.barCurrent} style={{ width: `${percentage}%` }}>
          <div>{currentCount}</div>
        </div>
      </div>
    </SectionInner>
  );
};
