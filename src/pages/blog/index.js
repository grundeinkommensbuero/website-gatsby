import React from 'react';
import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { graphql } from 'gatsby';
import { BlogList } from '../../components/BlogList';

export default ({
  data: {
    allWordpressPost: { edges: posts },
  },
}) => {
  const postsMapped = posts.map(post => post.node);
  return (
    <Layout>
      <Helmet>
        <title>Playground</title>
      </Helmet>
      <SectionWrapper>
        <Section title="Blog">
          <SectionInner>
            <BlogList posts={postsMapped} />
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          title
          excerpt
          slug
          path
          date
          featured_media {
            localFile {
              childImageSharp {
                hero: fluid(maxWidth: 650) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`;
