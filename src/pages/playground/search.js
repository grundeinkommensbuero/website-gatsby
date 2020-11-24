import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import SearchPlaces from '../../components/Forms/SearchPlaces';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Gemeindesuche">
          <SectionInner wide={true}>
            <SearchPlaces showButton={true} />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
