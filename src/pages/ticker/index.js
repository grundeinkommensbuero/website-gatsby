import React, { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import { Button } from '../../components/Forms/Button';
import Flip from "./Flip";

import s from './style.module.less';
import cN from 'classnames';


const App = () => {

  const [peopleCount, setPeopleCount] = useState(3592);
  const [municipalityCount, setMunicipalityCount] = useState(43);

  useEffect(() => {
    setTimeout(() => {
      setPeopleCount(peopleCount + 1);
    }, 250);

    setTimeout(() => {
      setMunicipalityCount(municipalityCount + 1);
    }, 5000);
  });

  return (
    <Layout>
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
    </Layout>
  )
}

export default App;