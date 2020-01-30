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
                },
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
                {
                  goal: 25000,
                  startDate:
                    'Wed Jan 29 2020 16:08:17 GMT+0100 (Central European Standard Time)',

                  title: 'Schlewsig-Holstein',
                  currentCount: 19302,
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
