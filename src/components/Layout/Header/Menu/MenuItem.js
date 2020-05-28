import React from 'react';
import Link from 'gatsby-link';
import cN from 'classnames';

import s from '../style.module.less';

const MenuItem = ({ slug, shortTitle, title, child, action }) => (
  <li className={cN(s.navItem, { [s.navItemChild]: child })}>
    {action ? (
      <a onClick={action} className={s.link}>
        {shortTitle || title}
      </a>
    ) : (
      <Link
        className={s.link}
        activeClassName={s.linkActive}
        to={slug === '/' ? '/' : `/${slug}/`}
      >
        {shortTitle || title}
      </Link>
    )}
  </li>
);

export default MenuItem;
