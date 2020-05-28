import React from 'react';
import Link from 'gatsby-link';
import cN from 'classnames';

import s from '../style.module.less';

const MenuItem = ({ slug, shortTitle, title, child }) => (
  <li className={cN(s.navItem, { [s.navItemChild]: child })}>
    <Link
      className={s.link}
      activeClassName={s.linkActive}
      to={slug === '/' ? '/' : `/${slug}/`}
    >
      {shortTitle || title}
    </Link>
  </li>
);

const MenuItemButton = ({ onClick, children }) => (
  <li className={cN(s.navItem)}>
    <button onClick={onClick} className={s.link}>
      {children}
    </button>
  </li>
);

export default MenuItem;
export { MenuItemButton };
