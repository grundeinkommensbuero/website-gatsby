import React from 'react';
import Link from 'gatsby-link';
import * as s from './style.module.less';
import SocialMediaButtons from '../../SocialMedia/Follow';
import cN from 'classnames';

import LogoExpedition from './logo-expedition.svg';

const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

export default ({ footerText, footerMenu }) => (
  <footer className={cN(s.footer, { [s.black]: IS_BERLIN_PROJECT })}>
    <div className={s.itemContainer}>
      {IS_BERLIN_PROJECT && (
        <>
          <div className={s.berlinInfos}>
            <span>Eine Initiative von</span>
            <img
              src={LogoExpedition}
              className={s.logo}
              alt={'Expedition Grundeinkommen'}
            />
          </div>
          <span>
            <Link
              to="https://www.expedition-grundeinkommen.de"
              className={s.expeditionsLink}
            >
              expedition-grundeinkommen.de
            </Link>
          </span>
        </>
      )}

      <div>{footerText}</div>
      <SocialMediaButtons className={s.socialMedia} />
      <nav>
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
  </footer>
);
