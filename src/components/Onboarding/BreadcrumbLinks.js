import React from 'react';
import { Link } from 'gatsby';
import menuElements from './BreadcrumbMenu.json';
import cN from 'classnames';
import s from './style.module.less';

export const BreadcrumbLinks = () => {
  return menuElements.map(element =>
    <Link
      to={element.link}
      key={element.link}
      className={
        cN(s.breadcrumbElement,
          { [s.breadcrumbElementActive]: window.location.pathname === element.link }
        )}
    >
      {element.name}
    </Link>
  )
}