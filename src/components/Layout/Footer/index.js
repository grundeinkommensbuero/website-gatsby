import React from 'react';
import Link from 'gatsby-link';
import s from './style.module.less';
import SocialMediaButtons from '../../SocialMedia/Follow';

export default ({ footerText, footerMenu }) => (
  <footer className={s.footer}>
    <div className={s.columnLeft}>
      <div className={s.footerText}>{footerText}</div>
      <SocialMediaButtons className={s.socialMedia} />
    </div>
    <nav className={s.columnRight}>
      <ul className={s.nav}>
        {footerMenu.map((item, index) => (
          <li className={s.navItem} key={index}>
            <Link to={`/${item.slug}/`} className={s.link}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </footer>
);
