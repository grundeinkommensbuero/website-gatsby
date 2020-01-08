import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import { Section, SectionInner } from '../Layout/Sections';
import Img from 'gatsby-image';
import s from './style.module.less';
import { formatDate } from '../utils';

export default ({
  data: {
    wordpressPost: { title, content, featured_media, date },
  },
  location,
}) => {
  const dateObject = new Date(date);

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

      <Section>
        <SectionInner>
          <header>
            <h1 className={s.title}>{title}</h1>
            <time dateTime={dateObject.toISOString()} className={s.date}>
              {formatDate(dateObject)}
            </time>
          </header>
        </SectionInner>
        {featured_media && (
          <SectionInner wide={true}>
            <Img fluid={featured_media.localFile.childImageSharp.hero} />
          </SectionInner>
        )}
        <SectionInner>
          <div
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
            hero: fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_noBase64
            }
            og: fixed(width: 1200, quality: 90) {
              src
            }
          }
        }
        path
      }
    }
  }
`;
