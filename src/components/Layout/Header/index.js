import React from 'react';
import style from './style.module.less';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { stringToId } from '../../utils';

const Header = ({ sections }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
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
      {sections && (
        <nav className={style.nav}>
          <ul>
            {sections.map(section => {
              const id = stringToId(section.titleShort);

              if (id) {
                return (
                  <li key={id}>
                    <a href={`#${id}`}>{section.titleShort}</a>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
