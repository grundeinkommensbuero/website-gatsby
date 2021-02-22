import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { MunicipalityMap } from '../../components/Municipality/MunicipalityMap';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="karte">
          <SectionInner wide={true}>
            <MunicipalityMap initialMapAnimation={false} />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
