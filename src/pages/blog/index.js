import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import {
  SectionWrapper,
  Section,
  SectionInner,
  SectionHeader,
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
        <title>Expeditionsblog</title>
      </Helmet>
      <SectionWrapper>
        <SectionHeader title="Expeditionsblog"></SectionHeader>
        <Section>
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
    allWordpressPost(
      sort: { fields: date, order: DESC }
      filter: { tags: { elemMatch: { name: { ne: "unlisted" } } } }
    ) {
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
