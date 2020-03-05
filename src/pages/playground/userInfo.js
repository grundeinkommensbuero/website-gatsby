import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { useUserData } from '../../hooks/Api/Users/Get';

export default () => {
  const [userData, requestUserData] = useUserData();

  useEffect(() => {
    requestUserData('53b95dd2-74b8-49f4-abeb-add9c950c7d9');
  }, []);

  console.log('user data', userData);

  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="karte">
          <SectionInner wide={true}></SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
