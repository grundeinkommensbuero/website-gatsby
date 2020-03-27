import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import {
  useCrowdfundingData,
  useGetCrowdfundingDirectly,
} from '../../hooks/Api/Crowdfunding';

export default () => {
  // const data = useCrowdfundingData('96752');

  const [crowdFundingData] = useGetCrowdfundingDirectly('96752');
  console.log('data', crowdFundingData);

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
