import React, { useState, useRef, useEffect } from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import cN from 'classnames';
import { formatDateShort } from '../utils';

export default ({ visualisations }) => {
  const [currentCounts, setCurrentCounts] = useState(() => {
    // fake API call
    setTimeout(() => {
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
  minimum,
}) => {
  const barEl = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      {
        threshold: 1.0,
      }
    );

    observer.observe(barEl.current);
  }, []);

  const dateString = formatDateShort(new Date(startDate));
  const hasStarted = new Date().getTime() > new Date(startDate);
  const count = Math.max(currentCount || 0, minimum);
  const percentage =
    count && isInView ? Math.min((count / goal) * 100, 100) : 0;
  const countOutside = percentage < 40;

  return (
    <SectionInner>
      {title && <h2>{title}</h2>}
      <div className={s.bar} ref={barEl}>
        <div className={cN(s.barGoal, { [s.hasStarted]: !hasStarted })}>
          <div>{goal && goal.toLocaleString('de')}</div>
        </div>
        {hasStarted && (
          <div
            className={cN(s.barCurrent, { [s.outside]: countOutside })}
            style={{ width: `${percentage}%` }}
          >
            <div>{count && count.toLocaleString('de')}</div>
          </div>
        )}
        {!hasStarted && <div className={s.starts}>Start {dateString}</div>}
      </div>
    </SectionInner>
  );
};
