import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Authentication';
import { useUpdateUser } from '../../hooks/Api/Users/Update';

export const StickyBannerContext = React.createContext();

export const StickyBannerProvider = ({ children }) => {
  const { customUserData, userId, isAuthenticated, updateCustomUserData } = useContext(AuthContext);
  const [, updateUser] = useUpdateUser();

  const [stickyBannerVisible, setStickyBannerVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated && customUserData?.store?.hiddenBanner?.mainBanner) {
      setStickyBannerVisible(false);
    } else if (isAuthenticated !== undefined) {
      setStickyBannerVisible(true);
    }
  }, [customUserData]);

  const closeStickyBanner = ({ whichBanner = 'mainBanner' }) => {
    if (userId && customUserData) {
      const updateBanner = {};
      updateBanner[whichBanner] = true;
      updateUser({
        userId: userId,
        store: {
          hiddenBanner: updateBanner
        },
      });
      // Refresh local userData Object
      setTimeout(() => {
        updateCustomUserData();
      }, 500);
    }
    setStickyBannerVisible(false);
  }

  return (
    <StickyBannerContext.Provider
      value={{
        stickyBannerVisible,
        closeStickyBanner,
      }}
    >
      {children}
    </StickyBannerContext.Provider>
  );
};