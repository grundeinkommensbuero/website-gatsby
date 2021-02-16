import s from './style.module.less';
import React, { useState, useEffect } from 'react';

export const OnboardingOverlayContext = React.createContext();

export const OnboardingOverlayProvider = ({ children }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, overlayOpen);
  }, [overlayOpen]);

  return (
    <OnboardingOverlayContext.Provider
      value={{
        overlayOpen,
        toggleOverlay: sholdBeOpen => {
          if (sholdBeOpen !== undefined) {
            setOverlayOpen(sholdBeOpen);
          } else {
            setOverlayOpen(!overlayOpen);
          }
        }
      }}
    >
      {children}
    </OnboardingOverlayContext.Provider>
  );
};

