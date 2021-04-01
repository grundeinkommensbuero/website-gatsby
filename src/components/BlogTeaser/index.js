import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import s from './style.module.less';
import Img from 'gatsby-image';
import { formatDate } from '../utils';

export default () => {
  const {
    allWpPost: { edges: posts },
  } = useStaticQuery(graphql`
    query BlogPosts {
      allWpPost(
        sort: { fields: date, order: DESC }
        filter: {tags: {nodes: {elemMatch: {name: {ne: "unlisted"}}}}}
        limit: 3
      ) {
        edges {
          node {
            id
            date
            excerpt
            title
            uri
            slug
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 750) {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <>
      {posts.map(({ node: { id, title, featuredImage, uri, date } }) => {
        const dateObject = new Date(date);

        return (
          <article key={id} className={s.article}>
            <Link to={uri} className={s.link}>
              <time dateTime={dateObject.toISOString()} className={s.date}>
                {formatDate(dateObject)}
              </time>
              <div className={s.imageContainer}>
                {featuredImage && (
                  <Img
                    className={s.image}
                    fluid={featuredImage.node.localFile.childImageSharp.hero}
                  />
                )}
              </div>
              <h1
                className={s.title}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Link>
          </article>
        );
      })}
    </>
  );
};
