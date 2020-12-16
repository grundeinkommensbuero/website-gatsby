import React from 'react';
import { Link } from 'gatsby';
import menuElements from './BreadcrumbMenu.json';
import cN from 'classnames';
import s from './style.module.less';

export const BreadcrumbLinks = () => {

  const pathMatchesMenuElement = (path) => {
    return window.location.pathname.replace(/\//g, '') === path.replace(/\//g, '')
  }

  return menuElements.map(element =>
    <Link
      to={element.link}
      key={element.link}
      className={
        cN(s.breadcrumbElement,
          { [s.breadcrumbElementActive]: pathMatchesMenuElement(element.link) }
        )}
    >
      {element.name}
    </Link>
  )
}