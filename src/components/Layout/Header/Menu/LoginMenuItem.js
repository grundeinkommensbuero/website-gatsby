import React, { useContext } from 'react';

import AuthContext from '../../../../context/Authentication';
import { useSignOut } from '../../../../hooks/Authentication';
import AvatarImage from '../../../../components/AvatarImage';

import s from '../style.module.less';
import MenuItemParent from './MenuItemParent';
import { MenuItemButton } from './MenuItem';

const LoginParentTitle = ({ userData }) => {
  if (!userData.username) {
    return 'Log in';
  }
  return (
    <div className={s.loginParentTitle}>
      <AvatarImage className={s.loginParentAvatar} user={userData} />
      {userData.username}
    </div>
  );
};

const LoginMenuItem = () => {
  const { customUserData: userData } = useContext(AuthContext);
  const signOut = useSignOut();

  return (
    <div className={s.loginParent}>
      <MenuItemParent title={<LoginParentTitle userData={userData} />}>
        <MenuItemButton onClick={signOut}>Log out</MenuItemButton>
      </MenuItemParent>
    </div>
  );
};

export default LoginMenuItem;
