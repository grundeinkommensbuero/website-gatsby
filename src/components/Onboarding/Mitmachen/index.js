import React, { useState, useEffect, useRef } from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import { Button } from '../../Forms/Button';
import cN from 'classnames';


export const Mitmachen = ({ userData, userId }) => {

  const start = 0;
  const end = true ? 16 : 0;
  const time = 1000;
  const INTERVALL = 50;

  const [displayCount, setDisplayCount] = useState(start);

  const prevEndRef = useRef();
  useEffect(() => {
    prevEndRef.current = end;
  });
  const prevEnd = prevEndRef.current;

  useEffect(() => {
    const startFrom = prevEnd || start;
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

  console.log(displayCount);

  return (
    <section className={gS.pageContainer}>

      <h1>Willkommen bei der Expedition Grundeinkommen!</h1>
      <p className={gS.descriptionTextLarge}>Hallo {userData.username}!</p>
      <p className={gS.descriptionTextLarge}>
        Unser Ziel ist es, das Grundeinkommen in die Städte und Gemeinden{' '}
          Deutschlands zu holen. Wir freuen uns sehr, dass du uns in GEMEINDE{' '}
          dabei hilfst!
        </p>

      <h4 className={s.ProgressBarTitle}>Gemeinde</h4>
      <div>
        <span
          className={cN(s.barGoal)}
          aria-hidden="true"
          style={{ width: `${100 || 100}%` }}
        >
          <div className={s.barGoalBar}>
            <div
              className={s.barGoalInbetween}
              style={{ width: `${100}% ` }}
            >
              <span className={s.goal}>100</span>
            </div>
          </div>

        </span>
        <span
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
        </span>
      </div>
      {/* <div className={s.progressBarContainer}>
        <div className={s.progressBar}></div>
      </div>
      <p className={gS.descriptionTextLarge}>16/100 Unterstützer:innen</p> */}

      <br /><br /><br />

      <h4>Wie kannst du dich einbringen?</h4>
      <p className={gS.descriptionTextLarge}>
        Wir werden dich per Email benachrichtigen, sobald sie Unterschriftensammlung{' '}
          in GEMEINDE losgeht.
        </p>
      <p className={gS.descriptionTextLarge}>
        Weißt du schon, wie du helfen kannst?
        </p>
      <br />

      <Button className={s.fullWidthBtn}>Ich kann unterschreiben</Button><br /><br />
      <Button className={s.fullWidthBtn}>Ich kann Unterschriften sammeln</Button><br /><br />
      <Button className={s.fullWidthBtn}>Ich kann Sammelevents organisieren</Button><br /><br />
    </section>
  );
};