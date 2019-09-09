import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Header from '../Header'

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)
  return (
    <nav role="navigation">
      <Header
        menuLinks={data.site.siteMetadata.menuLinks}
        siteTitle={data.site.siteMetadata.title}
      />
    </nav>
  )
}

export default Navigation
