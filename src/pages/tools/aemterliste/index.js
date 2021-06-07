import React from 'react';
import Layout from '../../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../../components/Layout/Sections';
import Aemterliste from '../../../components/Aemterliste';

const AemterlistePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Ämter</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Ämter in SH">
          <SectionInner>
            <Aemterliste />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default AemterlistePage;
