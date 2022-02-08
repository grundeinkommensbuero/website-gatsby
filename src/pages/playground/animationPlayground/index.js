import React from 'react';
import Layout from '../../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper, Section } from '../../../components/Layout/Sections';
import { HurrayCrowd } from '../../../components/HurrayCrowd';
import * as s from './style.module.less';

const AnimationPlayground = () => {
  return (
    <Layout>
      <Helmet>
        <title>Animation Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section>
          <h2>Spielwiese für Animationen</h2>
          <h3>Hurray Crowd</h3>
        </Section>
        <Section className={s.hurray}>
          <HurrayCrowd />
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default AnimationPlayground;
