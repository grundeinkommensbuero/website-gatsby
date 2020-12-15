import React, { useState, useEffect } from 'react';
import cN from 'classnames';
import s from './style.module.less';

export const MunicipalityInfo = () => {
  const [displayCount, setDisplayCount] = useState(0);

  const start = 0;
  const end = 16;
  const goal = 100;
  const time = 1000;
  const INTERVALL = 50;

  useEffect(() => {
    const startFrom = start;
    const distance = end - startFrom;
    if (end !== displayCount) {
      const rounds = Math.round(time / INTERVALL);
      for (let round = 0; round <= rounds; round++) {
        setTimeout(() => {
          setDisplayCount(Math.round((round / rounds) * distance) + startFrom);
        }, (round / rounds) * time);
      }
    }
  }, [end]);

  return (
    <div className={s.municipalityInfoContainer}>
      <h4 className={s.ProgressBarTitle}>GEMEINDE</h4>
      <div className={s.progressBarContainer}>

        <span
          className={cN(s.barGoal)}
          aria-hidden="true"
          style={{ width: `${100}%` }}
        >
          <div className={s.barGoalBar}>
            <div
              className={s.barGoalInbetween}
              style={{ width: `${100}% ` }}
            >
              <span className={s.goalLabel}>{goal}</span>
            </div>
          </div>
        </span>

        <div
          className={cN(
            s.barCurrent,
            { [s.outside]: false },
            { [s.completed]: true }
          )}
          style={{ width: `${displayCount}%` }}
          aria-label={`${displayCount}`}
        >
          <span className={s.barCurrentLabel}>
            {displayCount}
          </span>
        </div>

      </div>
      <p className={s.progressBarDescription}>{start}/{goal} Unterstützer:innen</p>
    </div>
  )
}