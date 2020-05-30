import React, { useContext } from 'react';

import AuthContext from '../../../../context/Authentication';
import { useSignOut } from '../../../../hooks/Authentication';
import AvatarImage from '../../../../components/AvatarImage';

import s from '../style.module.less';
import MenuItemParent from './MenuItemParent';
import { MenuItemButton } from './MenuItem';

const LoginParentTitle = ({ userData, userId }) => {
  if (userId && !userData.username) {
    return 'Lade...';
  }
  if (!userId && !userData.username) {
    return 'Anmelden';
  }
  return (
    <div className={s.loginParentTitle}>
      <AvatarImage className={s.loginParentAvatar} user={userData} />
      {userData.username}
    </div>
  );
};

const LoginMenuItem = () => {
  const { customUserData: userData, userId } = useContext(AuthContext);
  const signOut = useSignOut();

  return (
    <div className={s.loginParent}>
      <MenuItemParent
        internalLink={!userId && '/login/'}
        title={<LoginParentTitle userData={userData} userId={userId} />}
      >
        {userId && <MenuItemButton onClick={signOut}>Abmelden</MenuItemButton>}
      </MenuItemParent>
    </div>
  );
};

export default LoginMenuItem;
