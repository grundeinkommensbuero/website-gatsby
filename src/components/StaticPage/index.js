import React, { useContext, useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import { Helmet } from 'react-helmet-async';
import MatomoTrackingStuff from './MatomoTrackingStuff';
import AuthContext from '../../context/Authentication';
import { MunicipalityContext } from '../../context/Municipality';
import { useSEO } from '../../hooks/Municipality/SEO';

const URL = 'https://expedition-grundeinkommen.de';

export default ({ data, location, pageContext }) => {
  const page = data.contentfulStaticContent;

  const { setPageContext } = useContext(MunicipalityContext);
  useEffect(() => {
    setPageContext(pageContext);
  }, []);

  const { isAuthenticated } = useContext(AuthContext);

  const { title, description } = useSEO(page);

  return (
    <>
      {typeof isAuthenticated !== 'undefined' && (
        <Layout
          location={location}
          title={title}
          sections={page.sections}
          pageContext={pageContext}
          description={description}
        >
          <Helmet>
            <title>{title}</title>

            {page.description && (
              <meta name="description" content={description} />
            )}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={URL + location.pathname} />
            <script type="text/javascript">{MatomoTrackingStuff}</script>
          </Helmet>
        </Layout>
      )}
    </>
  );
};

export const pageQuery = graphql`
  query StaticPageBySlug($slug: String!) {
    contentfulStaticContent(slug: { eq: $slug }) {
      title
      description {
        internal {
          content
        }
      }
      sections {
        ... on Node {
          ... on ContentfulPageSectionOneColumn {
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
            colorScheme
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
            title
            videoLink
            bodyAtTheEnd {
              json
            }
            showForOptions
            colorScheme
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
          # ... on ContentfulPageSectionGemeindeIntro {
          #   __typename
          #   title
          #   body {
          #     body
          #   }
          # }
          ... on ContentfulPageSectionWithComponents {
            __typename
            keyVisual
            titleShort
            colorScheme
            showForOptions
            components {
              ... on ContentfulSectionComponentTickerToSignup {
                __typename
                title
                showForOptions
                tickerDescription {
                  tickerDescription
                }
              }
              ... on ContentfulSectionComponentMunicipalityMap {
                __typename
                title
                showForOptions
              }
              ... on ContentfulSectionComponentMunicipalityProgress {
                __typename
                title
                showForOptions
              }
              ... on ContentfulSectionComponentInviteFriends {
                __typename
                title
                showForOptions
                headline
                body {
                  json
                }
              }
              ... on ContentfulSectionComponentBecomeActive {
                __typename
                title
                showForOptions
                headline
                body {
                  json
                }
                fullWidthOnDesktop
              }
              ... on ContentfulSectionComponentProfileTile {
                __typename
                title
                showForOptions
                body {
                  json
                }
                fullWidthOnDesktop
              }
            }
          }
          ... on ContentfulPageSectionDonation {
            __typename
            title
            introText
            theme
            colorScheme
          }
          ... on ContentfulPageSectionFourColumns {
            __typename
            title
            colorScheme
            columnIntroText {
              json
            }
            imageTopLeft {
              fixed(height: 150, quality: 80) {
                ...GatsbyContentfulFixed
              }
            }
            columnTopLeft {
              json
            }
            imageTopRight {
              fixed(height: 150, quality: 80) {
                ...GatsbyContentfulFixed
              }
            }
            columnTopRight {
              json
            }
            imageBottomLeft {
              fixed(height: 150, quality: 80) {
                ...GatsbyContentfulFixed
              }
            }
            columnBottomLeft {
              json
            }
            imageBottomRight {
              fixed(height: 150, quality: 80) {
                ...GatsbyContentfulFixed
              }
            }
            columnBottomRight {
              json
            }
          }
        }
      }
    }
  }
`;
