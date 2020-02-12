import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import s from './style.module.less';
import Img from 'gatsby-image';
import { formatDate } from '../utils';

export default () => {
  const {
    allWordpressPost: { edges: posts },
  } = useStaticQuery(graphql`
    query BlogPosts {
      allWordpressPost(
        sort: { fields: date, order: DESC }
        filter: { tags: { elemMatch: { name: { ne: "unlisted" } } } }
        limit: 3
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
                  hero: fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid_noBase64
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
      {posts.map(({ node: { id, title, featured_media, path, date } }) => {
        const dateObject = new Date(date);

        return (
          <article key={id} className={s.article}>
            {featured_media && (
              <Link to={path} className={s.link}>
                <time dateTime={dateObject.toISOString()} className={s.date}>
                  {formatDate(dateObject)}
                </time>
                <Img
                  className={s.image}
                  fluid={featured_media.localFile.childImageSharp.hero}
                />
                <h1 className={s.title}>{title}</h1>
              </Link>
            )}
          </article>
        );
      })}
    </>
  );
};
