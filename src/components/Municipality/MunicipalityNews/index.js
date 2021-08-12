import { useStaticQuery, graphql } from 'gatsby';
import React, { useContext } from 'react';
import { MunicipalityContext } from '../../../context/Municipality';
import * as s from './style.module.less';
import * as sectionS from '../../Layout/Sections/style.module.less';
import { Section } from '../../Layout/Sections';

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
            content
            categories {
              nodes {
                name
              }
            }
            tags {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `);

  const { municipality } = useContext(MunicipalityContext);

  let renderedPosts = [];

  if (municipality) {
    posts.forEach(post => {
      // Only render posts which have category news and tag news-{municipality.slug}
      // ergo all news of this municipality
      if (
        post.node.categories.nodes.findIndex(({ name }) => name === 'news') !==
          -1 &&
        post.node.tags.nodes.findIndex(
          ({ name }) => name === `news-${municipality.slug}`
        ) !== -1
      ) {
        renderedPosts.push(<Post key={post.node.id} post={post} />);
      }
    });
  }

  if (renderedPosts.length === 0) {
    return null;
  }

  return (
    <Section className={sectionS.sectionWhite}>
      <h2>Aktuelles</h2>
      <div className={s.container}>{renderedPosts}</div>
    </Section>
  );
};

const Post = ({ post }) => {
  return (
    <div className={s.post}>
      <h3>{post.node.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: post.node.content,
        }}
      />
    </div>
  );
};
