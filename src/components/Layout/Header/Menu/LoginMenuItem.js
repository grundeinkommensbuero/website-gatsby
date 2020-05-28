import React, { useContext } from 'react';
import AuthContext from '../../../../context/Authentication';
import { useSignOut } from '../../../../hooks/Authentication';

import MenuItemParent from './MenuItemParent';

const LoginMenuItem = () => {
  const { customUserData } = useContext(AuthContext);
  const signOut = useSignOut();

  const itemDefinition = {
    title: customUserData.username,
    contentfulchildren: [
      {
        title: 'Log out',
        shortTitle: 'Log Out',
        action: signOut,
      },
    ],
  };

  return <MenuItemParent {...itemDefinition} />;
};

export default LoginMenuItem;
