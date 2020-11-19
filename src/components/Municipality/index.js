import React from 'react';
import Layout from '../Layout';
import {
  SectionWrapper,
  Section,
  SectionInner,
  SectionHeader,
} from '../Layout/Sections';
import { Helmet } from 'react-helmet-async';
import MatomoTrackingStuff from '../StaticPage/MatomoTrackingStuff';

const Municipality = ({ pageContext: { municipality } }) => {
  return (
    <Layout title={municipality.name}>
      <Helmet>
        <title>{municipality.name}</title>

        {municipality.name && (
          <meta name="description" content={municipality.name} />
        )}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={URL + '/gemeinden/' + municipality.ags}
        />
        <script type="text/javascript">{MatomoTrackingStuff}</script>
      </Helmet>

      <SectionWrapper>
        <SectionHeader title={municipality.name}></SectionHeader>
        <Section>
          <SectionInner>
            <h3>
              {municipality.district ? `Kreis: ${municipality.district}, ` : ''}{' '}
              Bundesland: {municipality.state}.
            </h3>
            <p>
              Koordinaten: {municipality.latitude}, {municipality.longitude}
            </p>
            <h4>Postleitzahlen:</h4>
            {municipality.zipCodes.map((x, i) => (
              <span key={`zipCode-${i}`}>{x}, </span>
            ))}
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};
export default Municipality;
