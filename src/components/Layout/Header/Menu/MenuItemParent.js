import React from 'react';
import Link from 'gatsby-link';
import cN from 'classnames';

import s from '../style.module.less';
import MenuItem from './MenuItem';

const MenuItemParent = ({
  title,
  children,
  contentfulchildren,
  internalLink,
  externalLink,
}) => {
  const listItems = contentfulchildren
    ? contentfulchildren.map((item, index) => (
        <MenuItem key={index} child={true} {...item} />
      ))
    : children;
  return (
    <li className={cN(s.navItem, s.navItemParent)}>
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
        <a className={s.link} href={externalLink} target="_blank">
          {title}
        </a>
      )}
      {listItems && (
        <div className={s.menuItemParentChildren}>
          <ul className={s.menuItemParentChildrenInner}>{listItems}</ul>
        </div>
      )}
    </li>
  );
};

export default MenuItemParent;
