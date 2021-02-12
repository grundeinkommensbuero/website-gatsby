import React, { useState, useEffect } from 'react';
import cN from 'classnames';
import Reel from 'react-reel';
import s from './style.module.less';

import './reelstyle.less';

export const Ticker = ({ tickerDescription }) => {
  const [peopleCount, setPeopleCount] = useState(3592);
  const [municipalityCount, setMunicipalityCount] = useState(43);

  useEffect(() => {
    const peopleRandom = (Math.floor(Math.random() * 9) + 1) * 500;
    const firePeopleCounter = setTimeout(() => {
      setPeopleCount(peopleCount + 1);
    }, peopleRandom);

    const municipalityRandom = (Math.floor(Math.random() * 2) + 1) * 2500;
    const fireMunicipalityCounter = setTimeout(() => {
      setMunicipalityCount(municipalityCount + 1);
    }, municipalityRandom);

    return () => {
      clearTimeout(firePeopleCounter);
      clearTimeout(fireMunicipalityCounter);
    }
  });

  return (
    <section className={s.contentContainer}>
      <div className={s.slotMachine}>
        <div className={s.counterContainer}>
          <Reel text={peopleCount.toString()} />
          <h1 className={cN(s.counterLabelSlotMachine, s.counterLabelMarginLeft)}>Menschen</h1>
        </div>
        <div className={cN(s.counterContainer, s.alignRight)}>
          <h1 className={cN(s.counterLabelSlotMachine, s.counterLabelMarginRight)}>in</h1>
          <Reel text={municipalityCount.toString()} />
          <h1 className={cN(s.counterLabelSlotMachine, s.counterLabelMarginLeft)}>Orten</h1>
        </div>
        <h1 className={s.actionTextBig}>
          lassen das Grundeinkommen in Deutschland Realität werden.
          </h1>
        <p className={s.actionText}>{tickerDescription}</p>
      </div>
    </section>
  )
}