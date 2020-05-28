import React, { useContext } from 'react';
import AuthContext from '../../../../context/Authentication';
import { useSignOut } from '../../../../hooks/Authentication';

import MenuItemParent from './MenuItemParent';
import { MenuItemButton } from './MenuItem';

const LoginMenuItem = () => {
  const { customUserData } = useContext(AuthContext);
  const signOut = useSignOut();

  return (
    <MenuItemParent title={customUserData.username}>
      <MenuItemButton onClick={signOut}>Log out</MenuItemButton>
    </MenuItemParent>
  );
};

export default LoginMenuItem;
