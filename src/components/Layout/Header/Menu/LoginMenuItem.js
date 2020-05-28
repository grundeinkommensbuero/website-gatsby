import React, { useContext } from 'react';
import AuthContext from '../../../../context/Authentication';

import MenuItemParent from './MenuItemParent';
import MenuItem from './MenuItem';

const LoginMenuItem = () => {
  const { customUserData } = useContext(AuthContext);
  const signOut = useSignOut();

  return <MenuItemParent />;
};
