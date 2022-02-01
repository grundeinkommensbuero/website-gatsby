import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';

import { Lottery } from '../../components/Lottery';

const PlaygroundLottery = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="karte">
          <SectionInner wide={true}>
            <Lottery />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundLottery;
