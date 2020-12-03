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

import s from './style.module.less';
import { MapAndSearch } from './MapAndSearch';
import { CampainVisualisation } from '../CampaignVisualisations';

const Municipality = ({ data, pageContext: { municipality } }) => {
  const page = data.contentfulStaticContent;
  // console.log(page);
  // console.log(municipality);
  return (
    <Layout title={municipality.name} sections={page.sections}>
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
        {/* <SectionHeader title={municipality.name}></SectionHeader> */}
        <Section>
          <SectionInner>
            <MapAndSearch municipality={municipality} />
            <br />
            <h2>Bringe das Grundeinkommen nach {municipality.name}!</h2>
            <CampainVisualisation
              goal={5000}
              currentCount={1000}
              receivedCount={2000}
              count={3000}
              // showCTA={visualisations.length !== 1 && visualisation.ctaLink}
              labels={{
                NEEDED: () => <>Benötigte Anmeldungen</>,
                GOAL_INBETWEEN_TOOLTIP: count => (
                  <>
                    Insgesamt benötigt:
                    <br />
                    {count} Anmeldungen
                  </>
                ),
                GOAL_INBETWEEN: count => (
                  <>Nächstes Ziel: {count} Anmeldungen</>
                ),
                CURRENT_COUNT: () => <>Anmeldungen</>,
                CTA: () => <>Mitmachen</>,
              }}
              currency="Anmeldungen"
              startDate={new Date()}
            />
            <p>
              Melde dich an und werde Teil der Expedition in {municipality.name}
              ! Hilf uns, das Grundeinkommen in {municipality.name} zu testen,
              vernetze dich mit Gleichgesinnten und bleib auf dem Laufenden!
            </p>
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query StaticMunicipalityPageBySlug($slug: String!) {
    contentfulStaticContent(slug: { eq: $slug }) {
      title
      description {
        internal {
          content
        }
      }
      sections {
        ... on Node {
          ... on ContentfulPageSection {
            __typename
            title
            titleShort
            campainVisualisations {
              campainCode
              goal
              startDate
              title
              minimum
              maximum
              addToSignatureCount
              ctaLink
              eyeCatcher {
                json
              }
              eyeCatcherLink
              goalUnbuffered
              goalInbetweenMultiple
              startnextId
              hint {
                hint
              }
            }
            body {
              json
            }
            maps {
              name
              state
              config {
                maxBounds
                zoom
                center
              }
            }
            callToActionLink
            callToActionText
            bodyTextSizeHuge
            signUpForm
            emailSignup
            pledgeId
            signaturesId
            disableRequestListsByMail
            callToActionReference {
              slug
              title
              shortTitle
            }
            teamMembers {
              image {
                fluid(maxWidth: 200, quality: 80) {
                  ...GatsbyContentfulFluid
                }
              }
              name
              twitter
              linkedin
              website
              role
            }
            twitterFeed
            backgroundIllustration
            socialMediaButtons
            blogTeaser
            questionUbi
            bodyAtTheEnd {
              json
            }
          }
          ... on ContentfulPageSectionVideo {
            __typename
            videoLink
          }
          ... on ContentfulPageSectionIllustration {
            __typename
            sloganLine1
            sloganLine2
          }
          ... on ContentfulPageSectionIntro {
            __typename
            preTitle
            title
            subTitle
            backgroundImage {
              fluid(maxWidth: 1500, quality: 80) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default Municipality;
