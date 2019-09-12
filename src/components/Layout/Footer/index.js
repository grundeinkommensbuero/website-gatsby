import React from 'react';
import Link from 'gatsby-link';
import s from './style.module.less';

export default ({ footerText, footerMenu }) => (
  <footer className={s.footer}>
    <div className={s.copyright}>{footerText}</div>
    <nav className={s.nav}>
      <ul className={s.navList}>
        {footerMenu.map((item, index) => (
          <li className={s.navItem}>
            <Link to={`/${item.slug}/`} key={index}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </footer>
);
