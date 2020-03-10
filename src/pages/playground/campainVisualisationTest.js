import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
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
                  currentCount: 26000,
                  minimum: 0,
                  maximum: 23001,
                  addToSignatureCount: 10,
                  showCTA: false,
                  ctaLink: '#',
                  eyeCatcher: false,
                  goalUnbuffered: 20000,
                  goalInbetweenMultiple: ['5000', '7000', '10000', '12000'],
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
