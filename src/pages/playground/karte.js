import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import Map from '../../components/Maps/Map';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="karte">
          <SectionInner wide={true}>
            <Map
              config={{
                state: 'berlin',
                config: {
                  bounds: [1, 2, 3, 4],
                },
              }}
            />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
