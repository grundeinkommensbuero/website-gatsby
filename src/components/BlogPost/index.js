import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import { Section, SectionInner } from '../Layout/Sections';

class BlogPost extends React.Component {
  render() {
    const page = this.props.data.wordpressPost;
    const { title, content } = this.props.data.wordpressPost;

    return (
      <Layout location={this.props.location} title={page.title}>
        <Helmet>
          <title>{title}</title>

          {/* {page.description && (
            <meta
              name="description"
              content={page.description.internal.content}
            />
          )} */}
        </Helmet>

        <Section title={title}>
          <SectionInner>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </SectionInner>
        </Section>
      </Layout>
    );
  }
}

export default BlogPost;

export const pageQuery = graphql`
  query WordpressPostByPath($path: String!) {
    wordpressPost(path: { eq: $path }) {
      title
      content
      excerpt
      featured_media {
        localFile {
          childImageSharp {
            fluid {
              srcSet
            }
          }
        }
        path
      }
    }
  }
`;
