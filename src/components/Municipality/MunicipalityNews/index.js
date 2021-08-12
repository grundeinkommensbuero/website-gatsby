import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

export const MunicipalityNews = () => {
  const {
    allWpPost: { edges: posts },
  } = useStaticQuery(graphql`
    {
      allWpPost(
        sort: { fields: date, order: DESC }
        filter: {
          categories: { nodes: { elemMatch: { name: { eq: "news" } } } }
        }
      ) {
        edges {
          node {
            id
            title
            excerpt
            slug
            uri
            date
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `);

  let renderedPosts = [];

  posts.forEach(post => {
    if (
      post.node.categories.nodes.findIndex(({ name }) => name === 'news') !== -1
    ) {
      renderedPosts.push(<div>{post.node.title}</div>);
    }
  });

  return <>{renderedPosts}</>;
};
