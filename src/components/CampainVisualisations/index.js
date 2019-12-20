import React, { useState, useRef, useEffect } from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import cN from 'classnames';
import { formatDateMonthYear } from '../utils';
import { LinkButtonLocal } from '../Forms/Button';
import { useSignatureCount } from '../../hooks/Api/Signatures/Get';

export default ({ visualisations }) => {
  const currentCounts = useSignatureCount();

  return (
    <>
      {visualisations.map((visualisation, index) => (
        <Visualisation
          key={index}
          {...visualisation}
          currentCount={
            currentCounts &&
            currentCounts[visualisation.campainCode] &&
            currentCounts[visualisation.campainCode].withoutMixed
          }
          showCTA={visualisations.length !== 1}
        />
      ))}
    </>
  );
};

const Visualisation = ({
  //typo: also in contentful 'campainCode', so no big day
  campainCode,
  goal,
  startDate,
  title,
  currentCount,
  minimum,
  showCTA,
  ctaLink,
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

  const dateString = formatDateMonthYear(new Date(startDate));
  const hasStarted = new Date().getTime() > new Date(startDate);
  const count = Math.max(currentCount || 0, minimum);
  const percentage =
    count && isInView ? Math.min((count / goal) * 100, 100) : 0;
  const countOutside = percentage < 40;

  return (
    <SectionInner wide={true}>
      {title && <h2 className={s.title}>{title}</h2>}
      <div className={cN(s.body, { [s.showCTA]: showCTA })}>
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
          {!hasStarted && <div className={s.starts}>{dateString}</div>}
        </div>
        {showCTA && (
          <LinkButtonLocal size="MEDIUM" className={s.cta} to={ctaLink}>
            Jetzt unterstützen
          </LinkButtonLocal>
        )}
      </div>
    </SectionInner>
  );
};
