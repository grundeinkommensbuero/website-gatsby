import React, { useContext } from 'react';
import cN from 'classnames';

import AuthContext from '../../../../context/Authentication';

import s from '../style.module.less';
import { MenuItemLink } from './MenuItem';
import MenuItemParent from './MenuItemParent';
import LoginMenuItem from './LoginMenuItem';

const Menu = ({ menu, menuOpen }) => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const showLogin = userId != null || isAuthenticated;

  return (
    <ul className={cN(s.navList, { [s.isOpen]: menuOpen })} id="menuHeader">
      {/* TODO map contentful children in to MenuItem and pass values as children */}
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
                  <MenuItemLink key={index} isChild={true}>
                    {item.shortTitle || item.title}
                  </MenuItemLink>
                ))}
            </MenuItemParent>
          );
        }
      })}
      {showLogin && <LoginMenuItem />}
    </ul>
  );
};

export default Menu;
