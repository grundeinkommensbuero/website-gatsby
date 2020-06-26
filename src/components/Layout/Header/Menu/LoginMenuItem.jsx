import React, { useContext } from 'react';

import AuthContext from '../../../../context/Authentication';
import { useSignOut } from '../../../../hooks/Authentication';
import AvatarImage from '../../../../components/AvatarImage';

import s from '../style.module.less';
import MenuItemParent from './MenuItemParent';
import { MenuItemButton, MenuItemLink } from './MenuItem';

const LoginTitle = ({ userData, userId }) => {
  // Loading state when user identified but waiting for user data
  if (userId && !userData.username) {
    return 'Lade...';
  }

  return (
    <div className={s.loginParentTitle}>
      <AvatarImage className={s.loginParentAvatar} user={userData} />
      {userData.username || userData.email}
    </div>
  );
};

const LoginMenuItem = () => {
  const { customUserData: userData, userId } = useContext(AuthContext);
  const signOut = useSignOut();

  if (!userId) return null;

  return (
    <MenuItemParent title={<LoginTitle userData={userData} userId={userId} />}>
      <MenuItemButton isChild onClick={signOut}>
        Abmelden
      </MenuItemButton>
    </MenuItemParent>
  );
};

export default LoginMenuItem;
