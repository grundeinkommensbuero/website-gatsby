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
          ... on ContentfulPageSectionWithComponents {
            __typename
            headline {
              headline
            }
            keyVisual
            titleShort
            colorScheme
            showForOptions
            components {
              ... on ContentfulSectionComponentStandard {
                __typename
                showForOptions
                column
                videoLink
                signUpButton
                image {
                  fluid(maxWidth: 500, quality: 90) {
                    ...GatsbyContentfulFluid
                  }
                }
                text {
                  json
                }
              }
              ... on ContentfulSectionComponentTextAndImage {
                __typename
                showForOptions
                column
                layout
                image {
                  fluid(maxWidth: 500, quality: 90) {
                    ...GatsbyContentfulFluid
                  }
                }
                text {
                  json
                }
              }
              ... on ContentfulSectionComponentTickerToSignup {
                __typename
                showForOptions
                column
                tickerDescription {
                  tickerDescription
                }
              }
              ... on ContentfulSectionComponentMunicipalityMap {
                __typename
                showForOptions
                column
              }
              ... on ContentfulSectionComponentMunicipalityProgress {
                __typename
                showForOptions
                column
              }
              ... on ContentfulSectionComponentInviteFriends {
                __typename
                showForOptions
                headline
                column
                body {
                  json
                }
              }
              ... on ContentfulSectionComponentInviteFriends {
                __typename
                showForOptions
                headline
                column
                body {
                  json
                }
              }
              ... on ContentfulSectionComponentBecomeActive {
                __typename
                showForOptions
                headline
                column
                body {
                  json
                }
                fullWidthOnDesktop
              }
              ... on ContentfulSectionComponentInfoText {
                __typename
                showForOptions
                fullWidthOnDesktop
                column
              }
              ... on ContentfulSectionComponentIntroText {
                __typename
                showForOptions
                fullWidthOnDesktop
                column
                highlightText {
                  highlightText
                }
                note {
                  note
                }
              }
              ... on ContentfulSectionComponentProfileTile {
                __typename
                showForOptions
                column
                body {
                  json
                }
                fullWidthOnDesktop
              }
              ... on ContentfulSectionComponentCollectionMap {
                __typename
                showForOptions
                column
                maps {
                  name
                  state
                  config {
                    maxBounds
                    zoom
                    center
                  }
                }
                text {
                  json
                }
              }
            }
          }
          ... on ContentfulPageSectionDonation {
            __typename
            introText
            theme
            colorScheme
          }
          ... on ContentfulPageSectionShare {
            __typename
            introText
            colorScheme
            previewDescription {
              json
            }
          }
        }
      }
    }
  }
`;
