import * as s from './style.module.less';
import React, { useState, useEffect } from 'react';

export const MeetupOverlayContext = React.createContext();

// TODO: maybe merge all overlay providers into one?
export const MeetupOverlayProvider = ({ children }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [type, setType] = useState('collect');
  const [mapConfig, setMapConfig] = useState();

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, overlayOpen);
  }, [overlayOpen]);

  return (
    <MeetupOverlayContext.Provider
      value={{
        overlayOpen,
        setOverlayOpen,
        type,
        setType,
        mapConfig,
        setMapConfig,
      }}
    >
      {children}
    </MeetupOverlayContext.Provider>
  );
};
