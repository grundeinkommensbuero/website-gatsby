import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'
import styles from './style.module.css'

const Header = ({ siteTitle, menuLinks }) => (
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
            dangerouslySetInnerHTML={{ __html: siteTitle }} // do this for the umlaut
          ></Link>
        </h1>
        <div>
          <nav className={styles.siteHeaderNav}>
            <ul style={{ display: 'flex', flex: 1 }}>
              {menuLinks.map(link => (
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

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
