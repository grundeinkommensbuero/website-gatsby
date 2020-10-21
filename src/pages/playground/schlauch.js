import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import Schlauch from '../../components/Forms/Schlauch';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Schlauch">
          <SectionInner wide={true}>
            <Schlauch />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
