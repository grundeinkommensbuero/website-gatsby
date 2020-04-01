import s from './style.module.less';
import React, { useState, useEffect } from 'react';

export const OverlayContext = React.createContext();

export const OverlayProvider = ({ children }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, overlayOpen);
  }, [overlayOpen]);

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
        },
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
