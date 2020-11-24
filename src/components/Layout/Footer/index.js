import React from 'react';
import Link from 'gatsby-link';
import s from './style.module.less';
import SocialMediaButtons from '../../SocialMedia/Follow';

const bmbfLogo = require('./bmbf-logo.jpg');

export default ({ footerText, footerMenu }) => (

  <footer>
    <div className={s.footer}>
      <div className={s.columnLeft}>
        <div className={s.footerText}>{footerText}</div>
        <SocialMediaButtons className={s.socialMedia} />
        <img
          aria-hidden="true"
          alt=""
          src={bmbfLogo}
          className={s.bmbfLogo}
        />
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
    </div>

    <div className={s.preFooter}>
      <img
          aria-hidden="true"
          alt=""
          src={bmbfLogo}
          className={s.bmbfLogo}
        />
    </div>
  </footer>
);
