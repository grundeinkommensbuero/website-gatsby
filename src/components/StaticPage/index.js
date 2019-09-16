import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import s from './style.module.less';
import Sections from '../Sections';

class StaticPage extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulStaticContent');

    return (
      <Layout location={this.props.location} title={page.title}>
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
          <div className={s.body}>
            <h1>{page.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: page.body.childMarkdownRemark.html,
              }}
            />
          </div>
        )}
        {page.sections && <Sections sections={page.sections} />}
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
        ... on ContentfulPageSection {
          id
          title
          titleShort
          body {
            json
          }
          callToActionLink
          callToActionText
          emailSignup
        }
        ... on ContentfulPageSectionVideo {
          id
          videoLink
        }
      }
    }
  }
`;
