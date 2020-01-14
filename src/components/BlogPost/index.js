import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import { Section, SectionInner, SectionHeader } from '../Layout/Sections';
import s from './style.module.less';
import { formatDate } from '../utils';

export default ({
  data: {
    wordpressPost: { title, content, featured_media, date, tags },
    allWordpressTag,
  },
  location,
}) => {
  const dateObject = new Date(date);
  const tagList = allWordpressTag.edges.reduce((list, tag) => {
    list[tag.node.id] = tag.node.name;
    return list;
  }, {});
  console.log(tags);

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{title}</title>

        {/* {page.description && (
            <meta
              name="description"
              content={page.description.internal.content}
            />
          )} */}

        {featured_media && (
          <meta
            property="og:image"
            content={featured_media.localFile.childImageSharp.og.src}
          />
        )}
      </Helmet>

      <SectionHeader
        backgroundImageSet={
          featured_media && featured_media.localFile.childImageSharp.hero
        }
      >
        <SectionInner>
          <header className={s.header}>
            <div className={s.headerText}>
              {tags && (
                <ul className={s.tagList}>
                  {tags.map(({ id }) => (
                    <li key={id}>#{tagList[id]}</li>
                  ))}
                </ul>
              )}
              <h1 className={s.title}>{title}</h1>
              <time dateTime={dateObject.toISOString()} className={s.date}>
                {formatDate(dateObject)}
              </time>
            </div>
          </header>
        </SectionInner>
      </SectionHeader>
      <Section>
        {/* {featured_media && (
          <SectionInner wide={true}>
            <Img fluid={featured_media.localFile.childImageSharp.hero} />
          </SectionInner>
        )} */}
        <SectionInner>
          <div
            className={s.body}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </SectionInner>
      </Section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query WordpressPostByPath($path: String!) {
    wordpressPost(path: { eq: $path }) {
      title
      content
      date
      featured_media {
        localFile {
          childImageSharp {
            hero: fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_noBase64
            }
            og: fixed(width: 1200, quality: 90) {
              src
            }
          }
        }
        path
      }
      tags {
        id
      }
    }
    allWordpressTag {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
