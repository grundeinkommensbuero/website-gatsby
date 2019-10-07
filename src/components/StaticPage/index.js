import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import Body from '../Layout/Body';

class StaticPage extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulStaticContent');

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
        </Helmet>

        {page.body && (
          <Body>
            <h1>{page.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: page.body.childMarkdownRemark.html,
              }}
            />
          </Body>
        )}
      </Layout>
    );
  }
}

export default StaticPage;

export const pageQuery = graphql`
  query StaticPageBySlug($slug: String!) {
    contentfulStaticContent(slug: { eq: $slug }) {
      title
      body {
        childMarkdownRemark {
          html
        }
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
            body {
              json
            }
            callToActionLink
            callToActionText
            bodyTextSizeHuge
            emailSignup
            teamMembers {
              image {
                fluid(maxWidth: 500) {
                  srcSet
                  src
                }
              }
              name
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
        }
      }
    }
  }
`;
