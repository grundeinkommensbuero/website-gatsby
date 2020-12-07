import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { CampaignMap } from '../../components/CampaignMap';
import { SearchPlaces } from '../../components/Forms/SearchPlaces';

const MapAndSearch = () => {
  const [ags, setAgs] = useState('09177123');
  const handlePlaceSelect = ({ ags }) => {
    console.log(ags);
    setAgs(ags);
  };
  return (
    <div>
      <SearchPlaces
        label={'Finde deine Gemeinde'}
        onPlaceSelect={handlePlaceSelect}
      />
      <br />
      <CampaignMap
        AgsToFlyTo={ags}
        animateOnLoad={false}
        flyToAgsOnLoad={true}
      />
    </div>
  );
};

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section>
          <SectionInner wide={true}>
            <MapAndSearch />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
