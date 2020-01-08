import React from 'react';
import { Link } from 'gatsby';
import s from './style.module.less';
import Img from 'gatsby-image';

export const BlogList = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <BlogSnippet key={index} {...post} />
      ))}
    </div>
  );
};

export const BlogSnippet = ({ title, excerpt, path, featured_media }) => {
  return (
    <article className={s.article}>
      <h1 className={s.title}>
        <Link to={path}>{title}</Link>
      </h1>
      {featured_media && (
        <Link to={path}>
          <Img fluid={featured_media.localFile.childImageSharp.hero} />
        </Link>
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
      <Link to={path}>Mehr...</Link>
    </article>
  );
};
