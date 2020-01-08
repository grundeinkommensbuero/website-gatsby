import React from 'react';
import { Link } from 'gatsby';

export const BlogList = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <BlogSnippet key={index} {...post} />
      ))}
    </div>
  );
};

export const BlogSnippet = ({ title, excerpt, path }) => {
  return (
    <article>
      <h1>
        <Link to={path}>{title}</Link>
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
      <Link to={path}>Mehr...</Link>
    </article>
  );
};
