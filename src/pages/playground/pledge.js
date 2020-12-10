import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import Pledge from '../../components/Forms/Pledge';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Pledge">
          <SectionInner wide={true}>
            <Pledge pledgeId="berlin-1" />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
