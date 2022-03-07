import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper, Section } from '../../components/Layout/Sections';
import { PledgePackagesSection } from '../../components/PledgePackage/ListPledgePackages/PledgePackageSection';
import PledgePackagesPage from '../../components/PledgePackage/ListPledgePackages/index';

const PlaygroundPledgePackages = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="">
          <PledgePackagesSection />
          <PledgePackagesPage />
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundPledgePackages;
