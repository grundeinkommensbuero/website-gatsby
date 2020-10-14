import React from 'react';
import Link from 'gatsby-link';
import cN from 'classnames';

import s from './style.module.less';

const MenuItemParent = ({ title, children, internalLink, externalLink }) => {
  return (
    <li className={cN({[s.navItemParent]: true}, s.navItem)}>
      {!internalLink && !externalLink && (
        <div className={s.menuItemParentTitle}>{title}</div>
      )}
      {internalLink && (
        <Link
          className={s.link}
          activeClassName={s.linkActive}
          to={internalLink}
        >
          {title}
        </Link>
      )}
      {externalLink && (
        <a
          className={s.link}
          href={externalLink}
          rel="noreferrer"
          target="_blank"
        >
          {title}
        </a>
      )}
      {children && (
        <div className={s.menuItemParentChildren}>
          <ul className={s.menuItemParentChildrenInner}>{children}</ul>
        </div>
      )}
    </li>
  );
};

export default MenuItemParent;
