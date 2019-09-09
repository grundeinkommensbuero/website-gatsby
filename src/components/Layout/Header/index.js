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
    <header
      style={{
        background: 'black',
        marginBottom: '1.45rem',
      }}
    >
      <div
        style={{
          background: 'black',
          marginBottom: '1.45rem',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
            display: 'flex',
            justifyItems: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0, flex: 1 }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
              dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.title }} // do this for the umlaut
            ></Link>
          </h1>
          <div>
            <nav className={styles.siteHeaderNav}>
              <ul style={{ display: 'flex', flex: 1 }}>
                {data.site.siteMetadata.menuLinks.map(link => (
                  <li
                    key={link.name}
                    style={{
                      listStyleType: `none`,
                      padding: `1rem`,
                    }}
                  >
                    <Link style={{ color: `white` }} to={link.link}>
                      {link.name}
                    </Link>
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
