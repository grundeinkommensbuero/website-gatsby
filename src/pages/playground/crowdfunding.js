import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { useGetCrowdfundingDirectly } from '../../hooks/Api/Crowdfunding';

export default () => {
  const [crowdFundingData] = useGetCrowdfundingDirectly('96752');

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
