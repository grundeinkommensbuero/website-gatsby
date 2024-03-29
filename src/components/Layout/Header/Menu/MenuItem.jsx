import React from 'react';
import Link from 'gatsby-link';
import cN from 'classnames';

import * as s from './style.module.less';

const MenuItemLink = ({
  slug,
  isChild,
  children,
  className,
  externalLink,
  ...rest
}) => (
  <li className={cN(s.navItem, { [s.navItemChild]: isChild })}>
    {externalLink && (
      <a
        className={s.link}
        href={externalLink}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )}
    {slug && (
      <Link
        className={cN(s.link, className)}
        activeClassName={s.linkActive}
        to={slug === '/' ? '/' : `/${slug.replace('berlin/', '')}/`}
        {...rest}
      >
        {children}
      </Link>
    )}
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
