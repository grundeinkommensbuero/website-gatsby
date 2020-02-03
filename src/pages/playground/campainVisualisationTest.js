import React from 'react';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import CampaignVisualisations from '../../components/CampaignVisualisations';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Spielwiese Visualisierungen">
          <SectionInner wide={true}>
            <CampaignVisualisations
              visualisations={[
                {
                  goal: 25000,
                  startDate:
                    'Wed Jan 29 2020 16:08:17 GMT+0100 (Central European Standard Time)',

                  title: 'Schlewsig-Holstein',
                  currentCount: 231,
                  minimum: 0,
                  addToSignatureCount: 10,
                  showCTA: false,
                  ctaLink: '#',
                  eyeCatcher: false,
                  goalInbetween: 2000,
                  goalUnbuffered: 20000,
                  hint: {
                    hint:
                      'Schon $COLLECTED Unterschriften von $GOAL! Nächstes Ziel: $GOAL_INBETWEEN Unterschriften.',
                  },
                },
                {
                  goal: 25000,
                  startDate:
                    'Wed Jan 29 2020 16:08:17 GMT+0100 (Central European Standard Time)',

                  title: 'Schlewsig-Holstein',
                  currentCount: 7425,
                  minimum: 0,
                  addToSignatureCount: 10,
                  showCTA: false,
                  ctaLink: '#',
                  eyeCatcher: false,
                  goalInbetween: 10000,
                  goalUnbuffered: 10000,
                },
                {
                  goal: 25000,
                  startDate:
                    'Wed Jan 29 2020 16:08:17 GMT+0100 (Central European Standard Time)',

                  title: 'Schlewsig-Holstein',
                  currentCount: 29302,
                  minimum: 0,
                  addToSignatureCount: 10,
                  showCTA: false,
                  ctaLink: '#',
                  eyeCatcher: false,
                  goalInbetween: 25000,
                  goalUnbuffered: 22000,
                },
                {
                  goal: 25000,
                  startDate:
                    'Sun Mar 29 2020 16:08:17 GMT+0100 (Central European Standard Time)',

                  title: 'Berlin',
                  currentCount: 3425,
                  minimum: 0,
                  addToSignatureCount: 10,
                  showCTA: false,
                  ctaLink: '#',
                  eyeCatcher: false,
                  goalUnbuffered: 20000,
                },
              ]}
            />
          </SectionInner>
        </Section>
        <Section title="Einzeln">
          <SectionInner wide={true}>
            <CampaignVisualisations
              visualisations={[
                {
                  goal: 25000,
                  startDate:
                    'Wed Jan 29 2020 16:08:17 GMT+0100 (Central European Standard Time)',

                  title: 'Schlewsig-Holstein',
                  currentCount: 3425,
                  minimum: 0,
                  addToSignatureCount: 10,
                  showCTA: false,
                  ctaLink: '#',
                  eyeCatcher: false,
                  goalInbetween: 5000,
                  goalUnbuffered: 20000,
                },
              ]}
            />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
