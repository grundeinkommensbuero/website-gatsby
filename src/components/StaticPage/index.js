import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import MatomoTrackingStuff from './MatomoTrackingStuff';

class StaticPage extends React.Component {
  render() {
    const page = this.props.data.contentfulStaticContent;

    return (
      <Layout
        location={this.props.location}
        title={page.title}
        sections={page.sections}
      >
        <Helmet>
          <title>{page.title}</title>

          {page.description && (
            <meta
              name="description"
              content={page.description.internal.content}
            />
          )}
          <script type="text/javascript">{MatomoTrackingStuff}</script>
        </Helmet>
      </Layout>
    );
  }
}

export default StaticPage;

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
              addToSignatureCount
              ctaLink
              eyeCatcher {
                json
              }
              goalUnbuffered
              goalInbetween
              hint {
                hint
              }
            }
            body {
              json
            }
            map
            callToActionLink
            callToActionText
            bodyTextSizeHuge
            emailSignup
            pledgeId
            signaturesId
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
        }
      }
    }
  }
`;
