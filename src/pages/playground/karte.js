import React from 'react';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import Map from '../../components/Map';
import { useStaticQuery } from 'gatsby';

const points = [
  {
    position: [10.1486, 54.3119],
    label: 'Marktplatz, 13.12.19 15 Uhr',
  },
  {
    position: [9.0637, 54.367],
    label: 'Am Rathaus, 13.12.19 11 Uhr',
  },
];

export default () => {
  const {
    allContentfulSammelort: { edges: collectSignaturesLocation },
  } = useStaticQuery(graphql`
    query CollectSignaturesLocations {
      allContentfulSammelort {
        edges {
          node {
            mail
            title
            phone
            location {
              lat
              lon
            }
            description {
              json
            }
            date
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="karte">
          <SectionInner wide={true}>
            <Map
              locations={collectSignaturesLocation}
              bounds={[8.226, 53.4095, 11.6428, 54.9823]}
            />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
