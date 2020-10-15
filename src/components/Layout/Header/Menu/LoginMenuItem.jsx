import React, { useContext } from 'react';
import { useLocation } from '@reach/router';

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
        {userData.username || 'Profil'}
      </span>
    </div>
  );
};

const LoginMenuItem = () => {
  const { customUserData: userData, userId, isAuthenticated } = useContext(
    AuthContext
  );
  const signOut = useSignOut();
  const location = useLocation();

  // We need this loading state, because otherwise for some ssg reason
  // the hover of the MenuItemParent would not work. Also this way we don't
  // render "Einloggen" -> "Lade..." -> "Profil"
  if(typeof isAuthenticated === 'undefined'){
    return <MenuItemParent title={'Lade...'} />
  }

  // If user is not identified, show "login" button`, next page after login
  // should be the current page
  if (!userId)
    return (
      <MenuItemLink
        slug={`login${
          location.pathname !== '/'
            ? `/?nextPage=${location.pathname.slice(1, -1)}`
            : ''
        }`}
      >
        Einloggen
      </MenuItemLink>
    );

  // Where to send user when clicking "to profile" link
  const toProfileLinkLocation = isAuthenticated
    ? // If authenticated send them to profile page.
      `mensch/${userId}`
    : // If not, send them to login page
      `login/?nextPage=mensch%2F${userId}`;

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
