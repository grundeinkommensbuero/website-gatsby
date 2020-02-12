import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import s from './style.module.less';
import Img from 'gatsby-image';

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
      {posts.map(({ node: { id, title, featured_media, path } }) => {
        console.log(id);
        return (
          <article key={id} className={s.article}>
            {featured_media && (
              <Link to={path}>
                <Img
                  className={s.image}
                  fluid={featured_media.localFile.childImageSharp.hero}
                />
                <h1>{title}</h1>
              </Link>
            )}
          </article>
        );
      })}
    </>
  );
};
