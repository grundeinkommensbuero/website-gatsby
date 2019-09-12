import React from 'react';
import Link from 'gatsby-link';
import s from './style.module.less';

export default ({ footerText, footerMenu }) => (
  <footer className={s.footer}>
    <div className={s.copyright}>{footerText}</div>
    <nav className={s.nav}>
      {footerMenu.map((item, index) => (
        <Link to={`/${item.slug}/`} key={index}>
          {item.title}
        </Link>
      ))}
    </nav>
  </footer>
);
