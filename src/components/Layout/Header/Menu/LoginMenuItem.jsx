import React, { useContext } from 'react';

import AuthContext from '../../../../context/Authentication';
import { useSignOut } from '../../../../hooks/Authentication';
import AvatarImage from '../../../../components/AvatarImage';

import s from './style.module.less';
import MenuItemParent from './MenuItemParent';
import { MenuItemButton, MenuItemLink } from './MenuItem';

const LoginTitle = ({ userData, userId }) => {
  // Loading state when user identified but waiting for user data
  if (userId && !userData.username && !userData.email) {
    return 'Lade...';
  }

  return (
    <div className={s.loginParentTitle}>
      <AvatarImage className={s.loginParentAvatar} user={userData} />
      <span className={s.loginParentTitleText}>
        {userData.username || userData.email}
      </span>
    </div>
  );
};

const LoginMenuItem = () => {
  const { customUserData: userData, userId, isAuthenticated } = useContext(
    AuthContext
  );
  const signOut = useSignOut();

  // If user is not identified, show "login" button
  if (!userId) return <MenuItemLink slug={'login'}>Einloggen</MenuItemLink>;

  // Where to send user when clicking "to profile" link
  const toProfileLinkLocation = isAuthenticated
    ? // If authenticated send them to profile page.
      `benutzer/${userId}`
    : // If not, send them to login page
      `login/?nextPage=benutzer%2F${userId}`;

  return (
    <MenuItemParent title={<LoginTitle userData={userData} userId={userId} />}>
      <MenuItemLink isChild slug={toProfileLinkLocation}>
        Zum Profil
      </MenuItemLink>
      <MenuItemButton isChild onClick={signOut}>
        Abmelden
      </MenuItemButton>
    </MenuItemParent>
  );
};

export default LoginMenuItem;
