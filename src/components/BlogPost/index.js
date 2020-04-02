import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import { Helmet } from 'react-helmet-async';
import {
  Section,
  SectionInner,
  SectionHeader,
  SectionWrapper,
} from '../Layout/Sections';
import s from './style.module.less';
import { formatDate } from '../utils';
import OGImage from './blog_og.png';
import html2plaintext from 'html2plaintext';

export default ({
  data: {
    wordpressPost: { title, content, featured_media, date, tags, excerpt },
    allWordpressTag,
    contentfulGlobalStuff: { siteTitle },
  },
  location,
}) => {
  const dateObject = new Date(date);
  const tagList = allWordpressTag.edges.reduce((list, tag) => {
    list[tag.node.id] = tag.node.name;
    return list;
  }, {});

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{title}</title>

        {featured_media && (
          <meta
            property="og:image"
            content={featured_media.localFile.childImageSharp.og.src}
          />
        )}
        {!featured_media && <meta property="og:image" content={OGImage} />}

        <meta name="description" content={html2plaintext(excerpt)} />
        <meta property="og:description" content={html2plaintext(excerpt)} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="article:published_time" content={date} />
        <meta property="og:type" content="article" />
      </Helmet>

      <SectionWrapper>
        <SectionHeader
          backgroundImageSet={
            featured_media && featured_media.localFile.childImageSharp.hero
          }
          preTitle={
            tags && (
              <ul className={s.tagList}>
                {tags.map(({ id }) => (
                  <li key={id}>#{tagList[id]}</li>
                ))}
              </ul>
            )
          }
          title={<span dangerouslySetInnerHTML={{ __html: title }} />}
          subTitle={
            <time dateTime={dateObject.toISOString()} className={s.date}>
              {formatDate(dateObject)}
            </time>
          }
        />
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
      </SectionWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query WordpressPostByPath($path: String!) {
    wordpressPost(path: { eq: $path }) {
      title
      content
      excerpt
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

    contentfulGlobalStuff(contentful_id: { eq: "3mMymrVLEHYrPI9b6wgBzg" }) {
      siteTitle
    }
  }
`;
