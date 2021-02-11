import React from 'react';
import cN from 'classnames';

import s from './style.module.less';
import { MenuItemLink } from './MenuItem';
import MenuItemParent from './MenuItemParent';
import LoginMenuItem from './LoginMenuItem';

const Menu = ({ menu, menuOpen }) => {
  return (
    <ul className={cN(s.navList, { [s.isOpen]: menuOpen })} id="menuHeader">
      {menu.map((item, index) => {
        if (item.__typename === 'ContentfulStaticContent') {
          return (
            <MenuItemLink slug={item.slug} key={index}>
              {item.shortTitle || item.title}
            </MenuItemLink>
          );
        } else {
          return (
            <MenuItemParent title={item.title} key={index} {...item}>
              {/* Map thru children of the menu item and pass to the submenu */}
              {item.contentfulchildren &&
                item.contentfulchildren.map((item, index) => (
                  <MenuItemLink key={index} isChild={true} slug={item.slug}>
                    {item.shortTitle || item.title}
                  </MenuItemLink>
                ))}
            </MenuItemParent>
          );
        }
      })}
      <LoginMenuItem />
    </ul>
  );
};

export default Menu;
