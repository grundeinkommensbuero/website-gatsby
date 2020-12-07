import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import { Helmet } from 'react-helmet-async';
import MatomoTrackingStuff from './MatomoTrackingStuff';

const URL = 'https://expedition-grundeinkommen.de';

export default ({ data, location, pageContext }) => {
  const page = data.contentfulStaticContent;
  let title = page.title;

  const { municipality } = pageContext;
  const { titleObject } = page;

  // TODO: Ask for feedback / better solution
  // Compare with headlines
  if (titleObject && municipality) {
    const { municipality } = pageContext;
    let replaceTitle = '';
    for (const part of titleObject) {
      if (part.replace) {
        replaceTitle += municipality[part.text] + ' ';
      } else {
        replaceTitle += part.text + ' ';
      }
    }
    title = replaceTitle.trim() + '!';
  }

  return (
    <Layout
      location={location}
      title={title}
      sections={page.sections}
      pageContext={pageContext}
    >
      {/* TODO: adjust for municipality case 
      check for pageContext.municpality */}
      <Helmet>
        <title>{title}</title>

        {page.description && (
          <meta
            name="description"
            content={page.description.internal.content}
          />
        )}
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
      titleObject {
        text
        replace
      }
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
