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

  const [reelCounterText, setReelCounterText] = useState();
  const [reelCounterMunicipalityText, setReelCounterMunicipalityText] = useState();

  useEffect(() => {
    setTimeout(() => {
      setPeopleCount(peopleCount + 1);
    }, 1000);

    setTimeout(() => {
      setMunicipalityCount(municipalityCount + 1);
    }, 5000);
  });

  useEffect(() => {
    setReelCounterText(reelCounterText + 'Menschen');
    setReelCounterMunicipalityText(reelCounterMunicipalityText + 'Orten');
  }, [peopleCount, municipalityCount]);

  return (
    <Layout>
      <section className={s.contentContainer}>
        <div className={s.App}>
          <div className={s.counterContainer}>
            <Reel text={peopleCount.toString()} />
            <h1 className={s.counterLabelThird}>Menschen</h1>
          </div>
          <div className={cN(s.counterContainer, s.alignRight)}>
            <h1 className={s.counterLabelThird}>in</h1>
            <Reel text={municipalityCount.toString()} />
            <h1 className={s.counterLabelThird}>Orten</h1>
          </div>
          <h1>
            lassen das Grundeinkommen in Deutschland Realität werden.
          </h1>
          <Button className={s.CTA}>Sei dabei.</Button>
        </div>
      </section>


      <section className={s.contentContainer}>
        <div className={s.App}>
          <div className={s.counterContainer}>
            <Flip value={peopleCount} />
            <h1 className={s.counterLabel}>Menschen</h1>
          </div>
          <div className={cN(s.counterContainer, s.alignRight)}>
            <h1 className={s.counterLabel}>in</h1>
            <Flip value={municipalityCount} />
            <h1 className={s.counterLabel}>Orten</h1>
          </div>
          <h1>
            lassen das Grundeinkommen in Deutschland Realität werden.
          </h1>
          <Button className={s.CTA}>Sei dabei.</Button>
        </div>
      </section>

      <section className={s.contentContainer}>
        <div className={s.App}>
          <div className={s.counterContainer}>
            <div className={cN(s.upperCounter, s.countUpLibNum)} >
              <CountUp isCounting end={peopleCount} start={3000} duration={10} />
            </div>
            <h1 className={s.counterLabelSecond}>Menschen</h1>
          </div>
          <div className={cN(s.counterContainer, s.alignRight)}>
            <h1 className={s.counterLabelSecond}>in</h1>
            <div className={s.countUpLibNum}>
              <CountUp isCounting end={municipalityCount} start={30} duration={10} />
            </div>
            <h1 className={s.counterLabelSecond}>Orten</h1>
          </div>
          <h1>
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