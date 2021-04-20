import React, { useContext, useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import { Helmet } from 'react-helmet-async';
import MatomoTrackingStuff from './MatomoTrackingStuff';
import AuthContext from '../../context/Authentication';
import { MunicipalityContext } from '../../context/Municipality';
import { useSEO } from '../../hooks/Municipality/SEO';

const URL = 'https://expedition-grundeinkommen.de';

const staticPage = ({ data, location, pageContext }) => {
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

export default staticPage;

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
                raw
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
              raw
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
              raw
            }
          }
          ... on ContentfulPageSectionVideo {
            __typename
            title
            videoLink
            bodyAtTheEnd {
              raw
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
                title
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
                  raw
                  references {
                    ... on ContentfulEntry {
                      # __typename and contentful_id are required to resolve the references
                      __typename
                      contentful_id
                      title
                      slug
                    }
                    ... on ContentfulAsset {
                      # __typename and contentful_id are required to resolve the references
                      __typename
                      contentful_id
                      fluid(maxWidth: 500, quality: 90) {
                        ...GatsbyContentfulFluid
                      }
                    }
                  }
                }
              }
              ... on ContentfulSectionComponentTickerToSignup {
                __typename
                title
                showForOptions
                column
                tickerDescription {
                  tickerDescription
                }
              }
              ... on ContentfulSectionComponentMunicipalityMap {
                __typename
                title
                showForOptions
                column
              }
              ... on ContentfulSectionComponentMunicipalityProgress {
                __typename
                title
                showForOptions
                column
              }
              ... on ContentfulSectionComponentInviteFriends {
                __typename
                title
                showForOptions
                headline
                column
                body {
                  raw
                }
              }
              ... on ContentfulSectionComponentInviteFriends {
                __typename
                title
                showForOptions
                headline
                column
                body {
                  raw
                }
              }
              ... on ContentfulSectionComponentBecomeActive {
                __typename
                title
                showForOptions
                headline
                column
                body {
                  raw
                }
                fullWidthOnDesktop
              }
              ... on ContentfulSectionComponentInfoText {
                __typename
                title
                showForOptions
                fullWidthOnDesktop
                column
              }
              ... on ContentfulSectionComponentIntroText {
                __typename
                title
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
                title
                showForOptions
                column
                body {
                  raw
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
          ... on ContentfulPageSectionShare {
            __typename
            title
            introText
            colorScheme
            previewDescription {
              raw
            }
          }
        }
      }
    }
  }
`;
