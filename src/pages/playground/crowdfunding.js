import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';

const PlaygroundCrowdfunding = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="crowdfunding">
          <SectionInner wide={true}></SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundCrowdfunding;
