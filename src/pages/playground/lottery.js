import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import * as s from '../../components/Layout/Sections/style.module.less';

import { Lottery } from '../../components/Lottery';

const PlaygroundLottery = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="karte" className={s.sectionWhite}>
          <SectionInner wide={true}>
            <Lottery />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundLottery;
