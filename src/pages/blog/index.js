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

const Blog = ({
  data: {
    allWpPost: { edges: posts },
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

export default Blog;

// We added a filter to filter out all posts with category news
// (because they should not be shown on the blog)
export const pageQuery = graphql`
  {
    allWpPost(
      sort: { fields: date, order: DESC }
      filter: { categories: { nodes: { elemMatch: { name: { ne: "news" } } } } }
    ) {
      edges {
        node {
          id
          title
          excerpt
          slug
          uri
          date
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  hero: gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
                }
              }
            }
          }
        }
      }
    }
  }
`;
