import React from 'react'
import styles from './style.module.css'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Header = () => {
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
    <header>
      <div>
        <div>
          <h1>
            <Link
              to="/"
              dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.title }} // do this for the umlaut
            ></Link>
          </h1>
          <div>
            <nav className={styles.siteHeaderNav}>
              <ul>
                {data.site.siteMetadata.menuLinks.map(link => (
                  <li key={link.name}>
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
