import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styles from './navigation.module.css';
import Header from "./header";


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
      <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />
    </nav>
  )
}

export default Navigation;
