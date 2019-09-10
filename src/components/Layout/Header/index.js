import React from 'react';
import style from './style.module.less';
import { Link, useStaticQuery, graphql } from 'gatsby';

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
  `);

  return (
    <header className={style.header}>
      <h1 className={style.title}>
        <Link
          className={style.titleLink}
          to="/"
          dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.title }} // do this for the umlaut
        ></Link>
      </h1>
      <nav className={style.nav}>
        <ul>
          {data.site.siteMetadata.menuLinks.map(link => (
            <li key={link.name}>
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
