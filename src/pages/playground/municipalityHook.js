import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { useGetMunicipalityStats } from '../../hooks/Api/Municipalities';

export default () => {
  const [state1, stats1, getMunicipalityStats1] = useGetMunicipalityStats();
  const [state2, stats2, getMunicipalityStats2] = useGetMunicipalityStats();
  const [
    /*state1, stats1, */ getMunicipalityStats1,
  ] = useGetMunicipalityStats();
  const [
    /*state2, stats2, */ getMunicipalityStats2,
  ] = useGetMunicipalityStats();

  useEffect(() => {
    getMunicipalityStats1();
    getMunicipalityStats2('091088');
  }, []);

  // console.log({ stats1 }, { state1 });
  // console.log({ stats2 }, { state2 });

  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="hook">
          <SectionInner wide={true}></SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
