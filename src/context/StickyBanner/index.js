import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const COOKIE_NAME = 'bannerHasBeenDismissed';
const EXCLUDED_ROUTES = [
  'playground'
];

export const StickyBannerContext = React.createContext();

export const StickyBannerProvider = ({ children }) => {
  const hasBeenDismissed = useHasBeenDismissed();
  const [stickyBannerVisible, setStickyBannerVisible] = useState(!hasBeenDismissed);
  const [currentURL, setCurrentURL] = useState();

  useEffect(() => {
    EXCLUDED_ROUTES.forEach(route => {
      if (!hasBeenDismissed && currentURL && currentURL.includes(route)) {
        setStickyBannerVisible(false);
      } else if (!hasBeenDismissed) {
        setStickyBannerVisible(true);
      }
    })
  }, [currentURL]);

  const closeStickyBanner = () => {
    setStickyBannerVisible(false);
    Cookies.set(COOKIE_NAME, true, { expires: 7 });
  };

  return (
    <StickyBannerContext.Provider
      value={{
        stickyBannerVisible,
        closeStickyBanner,
        setCurrentURL
      }}
    >
      {children}
    </StickyBannerContext.Provider>
  );
};

const useHasBeenDismissed = () => {
  if (Cookies.get(COOKIE_NAME) !== undefined) {
    return true;
  }
  return false;
};