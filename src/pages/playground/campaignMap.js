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
  const [ags, setAGS] = useState();
  const handlePlaceSelect = ({ ags }) => {
    console.log(ags);
    setAGS(ags);
  };
  return (
    <div>
      <SearchPlaces
        label={'Finde deine Gemeinde'}
        onPlaceSelect={handlePlaceSelect}
      />
      <br />
      <CampaignMap focusAGS={ags} initialAnimation={true} initialFly={false} />
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
