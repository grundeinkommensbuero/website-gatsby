import React from 'react';
import { Link } from 'gatsby';
import s from './style.module.less';
import Img from 'gatsby-image';
import { formatDate } from '../utils';
import OGImage from './blog_og.png';
import { Helmet } from 'react-helmet-async';

export const BlogList = ({ posts }) => {
  return (
    <div>
      <Helmet>
        <meta property="og:image" content={OGImage} />
      </Helmet>
      {posts.map((post, index) => (
        <BlogSnippet key={index} {...post} />
      ))}
    </div>
  );
};

export const BlogSnippet = ({ title, excerpt, path, date, featured_media }) => {
  const dateObject = new Date(date);
  return (
    <article className={s.article}>
      <header>
        <time dateTime={dateObject.toISOString()} className={s.date}>
          {formatDate(dateObject)}
        </time>
        <h1 className={s.title}>
          <Link to={path}>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
        </h1>
      </header>
      {featured_media && (
        <Link to={path}>
          <Img
            className={s.image}
            fluid={featured_media.localFile.childImageSharp.hero}
          />
        </Link>
      )}
      <div
        className={s.body}
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
      <p>
        <Link to={path}>Mehr...</Link>
      </p>
    </article>
  );
};
