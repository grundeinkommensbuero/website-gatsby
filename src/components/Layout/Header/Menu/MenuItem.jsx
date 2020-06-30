import React from 'react';
import Link from 'gatsby-link';
import cN from 'classnames';

import s from './style.module.less';

const MenuItemLink = ({ slug, isChild, children }) => (
  <li className={cN(s.navItem, { [s.navItemChild]: isChild })}>
    <Link
      className={s.link}
      activeClassName={s.linkActive}
      to={slug === '/' ? '/' : `/${slug}/`}
    >
      {children}
    </Link>
  </li>
);

const MenuItemButton = ({ onClick, isChild, children }) => (
  <li className={cN(s.navItem, { [s.navItemChild]: isChild })}>
    <button onClick={onClick} className={s.link}>
      {children}
    </button>
  </li>
);

export { MenuItemLink, MenuItemButton };
