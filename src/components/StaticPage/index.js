import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import { Helmet } from 'react-helmet-async';
import MatomoTrackingStuff from './MatomoTrackingStuff';
import { getStringFromPlaceholderText } from '../utils';

const URL = 'https://expedition-grundeinkommen.de';

export default ({ data, location, pageContext }) => {
  const page = data.contentfulStaticContent;
  const { municipality } = pageContext;

  const title = getStringFromPlaceholderText(page.title, municipality);
  const description = getStringFromPlaceholderText(
    page.description.internal.content,
    municipality
  );

  return (
    <Layout
      location={location}
      title={title}
      sections={page.sections}
      pageContext={pageContext}
      description={description}
    >
      <Helmet>
        <title>{title}</title>

        {page.description && <meta name="description" content={description} />}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL + location.pathname} />
        <script type="text/javascript">{MatomoTrackingStuff}</script>
      </Helmet>
    </Layout>
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
          ... on ContentfulPageSectionGemeindeIntro {
            __typename
            title
            body {
              body
            }
          }
        }
      }
    }
  }
`;
