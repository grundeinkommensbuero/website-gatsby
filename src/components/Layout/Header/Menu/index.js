import React, { useContext } from 'react';
import cN from 'classnames';

import AuthContext from '../../../../context/Authentication';

import s from '../style.module.less';
import MenuItem from './MenuItem';
import MenuItemParent from './MenuItemParent';
import LoginMenuItem from './LoginMenuItem';

const Menu = ({ menu, menuOpen }) => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const showLogin = userId != null || isAuthenticated;

  return (
    <ul className={cN(s.navList, { [s.isOpen]: menuOpen })} id="menuHeader">
      {menu.map((item, index) => {
        if (item.__typename === 'ContentfulStaticContent') {
          return <MenuItem key={index} {...item} />;
        } else {
          return <MenuItemParent key={index} {...item} />;
        }
      })}
      {showLogin && <LoginMenuItem />}
    </ul>
  );
};

export default Menu;
