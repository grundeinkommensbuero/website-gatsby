import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { ShowMeetups } from '../../components/Maps/ShowMeetups';

const PlaygroundMap = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="karte">
          <SectionInner wide={true}>
            <ShowMeetups
              mapConfig={{
                state: 'berlin',
                config: {
                  maxBounds: [
                    [13.05, 52.2],
                    [13.8, 52.8],
                  ],
                },
              }}
            />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default PlaygroundMap;
