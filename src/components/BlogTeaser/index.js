import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import * as s from './style.module.less';
import { GatsbyImage } from 'gatsby-plugin-image';
import { formatDate } from '../utils';

export default () => {
  const {
    allWpPost: { edges: posts },
  } = useStaticQuery(graphql`
    query BlogPosts {
      allWpPost(
        sort: { fields: date, order: DESC }
        filter: { tags: { nodes: { elemMatch: { name: { ne: "unlisted" } } } } }
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
                    hero: gatsbyImageData(
                      width: 400
                      placeholder: NONE
                      layout: CONSTRAINED
                    )
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
                  <GatsbyImage
                    image={featuredImage.node.localFile.childImageSharp.hero}
                    className={s.image}
                    alt="Titelbild des Blogeintrags"
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
