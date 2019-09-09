import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import style from './style.module.css'

export default ({ article }) => (
  <div className={style.preview}>
    <Img alt="" fluid={article.heroImage.fluid} />
    <h3 className={style.previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
    {article.tags.map(tag => (
      <p className={style.tag} key={tag}>
        {tag}
      </p>
    ))}
  </div>
)
