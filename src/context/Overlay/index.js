import s from './style.module.less';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const COOKIE_NAME = 'overlayHasBeenDismissed';

export const OverlayContext = React.createContext();

export const OverlayProvider = ({ children }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [automaticOpenDelay, setAutomaticOpenDelay] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useHasBeenDismissed();

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, overlayOpen);
  }, [overlayOpen]);

  useEffect(() => {
    if (automaticOpenDelay && !hasBeenDismissed) {
      setTimeout(() => {
        setOverlayOpen(true);
      }, automaticOpenDelay * 1000);
    }
  }, [automaticOpenDelay]);

  return (
    <OverlayContext.Provider
      value={{
        overlayOpen,
        toggleOverlay: sholdBeOpen => {
          if (sholdBeOpen !== undefined) {
            setOverlayOpen(sholdBeOpen);
          } else {
            setOverlayOpen(!overlayOpen);
          }
          setHasBeenDismissed(true);
        },
        setAutomaticOpenDelay,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

const useHasBeenDismissed = () => {
  const [hasBeenDismissed, setHasBeenDismissed] = useState(() => {
    return Cookies.get(COOKIE_NAME) === 'true';
  });

  return [
    hasBeenDismissed,
    value => {
      setHasBeenDismissed(value);
      Cookies.set(COOKIE_NAME, value, { expires: 7 });
    },
  ];
};
