import React, { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import { Button } from '../../components/Forms/Button';
import Flip from "./Flip";
import Reel from 'react-reel'

import { CountUp } from 'use-count-up';

import s from './style.module.less';
import cN from 'classnames';

import './reelstyle.css';

const App = () => {

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
    <Layout>
      <section className={s.contentContainer}>
        <div className={s.slotMachine}>
          <div className={s.counterContainer}>
            <Reel text={peopleCount.toString()} />
            <h1 className={s.counterLabelSlotMachine}>Menschen</h1>
          </div>
          <div className={cN(s.counterContainer, s.alignRight)}>
            <h1 className={s.counterLabelSlotMachine}>in</h1>
            <Reel text={municipalityCount.toString()} />
            <h1 className={s.counterLabelSlotMachine}>Orten</h1>
          </div>
          <h1 className={s.actionText}>
            lassen das Grundeinkommen in Deutschland Realität werden.
          </h1>
          <Button className={s.CTA}>Sei dabei.</Button>
        </div>
      </section>


      <section className={s.contentContainer}>
        <div className={s.flipClock}>
          <div className={s.counterContainer}>
            <Flip value={peopleCount} />
            <h1 className={s.counterLabelFlipClock}>Menschen</h1>
          </div>
          <div className={cN(s.counterContainer, s.alignRight)}>
            <h1 className={s.counterLabelFlipClock}>in</h1>
            <Flip value={municipalityCount} />
            <h1 className={s.counterLabelFlipClock}>Orten</h1>
          </div>
          <h1 className={s.actionText}>
            lassen das Grundeinkommen in Deutschland Realität werden.
          </h1>
          <Button className={s.CTA}>Sei dabei.</Button>
        </div>
      </section>

      <section className={s.contentContainer}>
        <div className={s.simpleCounter}>
          <div className={s.counterContainer}>
            <div className={cN(s.upperCounter, s.countUpLibNum)} >
              <CountUp isCounting end={peopleCount} start={3000} duration={10} />
            </div>
            <h1 className={s.counterLabelSimpleCounter}>Menschen</h1>
          </div>
          <div className={cN(s.counterContainer, s.alignRight)}>
            <h1 className={s.counterLabelSimpleCounter}>in</h1>
            <div className={s.countUpLibNum}>
              <CountUp isCounting end={municipalityCount} start={30} duration={10} />
            </div>
            <h1 className={s.counterLabelSimpleCounter}>Orten</h1>
          </div>
          <h1 className={s.actionText}>
            lassen das Grundeinkommen in Deutschland Realität werden.
          </h1>
          <Button className={s.CTA}>Sei dabei.</Button>
        </div>
      </section>

      <br /><br /><br /><br /><br /><br />
    </Layout>
  )
}

export default App;