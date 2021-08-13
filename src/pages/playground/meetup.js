import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { CreateMeetup } from '../../components/Forms/Meetup';

const PlaygroundMap = () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Sammelort erstellen">
          <SectionInner wide={true}>
            <CreateMeetup
              mapConfig={{
                state: 'berlin',
                config: {
                  maxBounds: [
                    [3, 47.217923],
                    [17.030017, 55.437655],
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
