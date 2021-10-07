import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper, Section } from '../../components/Layout/Sections';
import ListPledgePackages from '../../components/PledgePackage/ListPledgePackages';

const PlaygroundPledgePackages = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="">
          <ListPledgePackages />
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundPledgePackages;
