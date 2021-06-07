import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { SearchPlaces } from '../../components/Forms/SearchPlaces';

const PlaygroundSearch = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Gemeindesuche">
          <SectionInner wide={true}>
            <SearchPlaces
              showButton={true}
              inputSize="SMALL"
              buttonSize="MEDIUM"
            />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundSearch;
