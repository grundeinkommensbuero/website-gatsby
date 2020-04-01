import React, { useState } from 'react';
import Cookies from 'js-cookie';
import s from './style.module.less';
import { OverlayContext } from '../../context/Overlay';

const COOKIE_NAME = 'overlayHasBeenDismissed';

export const ShowOnlyOnceOverlay = ({ ...overlay }) => {
  const [hasBeenDismissed, setHasBeenDismissed] = useHasBeenDismissed();

  return (
    <Overlay
      isOpenInitially={!hasBeenDismissed}
      onClose={() => {
        setHasBeenDismissed(true);
      }}
      {...overlay}
    />
  );
};

export const Overlay = ({ isOpenInitially = true, delay = 0, ...props }) => {
  return (
    <OverlayContext.Consumer>
      {({ overlayOpen, toggleOverlay }) => (
        <OverlayWithContext
          isOpen={overlayOpen}
          toggleOverlay={toggleOverlay}
          {...props}
        />
      )}
    </OverlayContext.Consumer>
  );
};

const OverlayWithContext = ({ isOpen, children, title, toggleOverlay }) => {
  if (isOpen) {
    return (
      <div className={s.container} role="dialog" aria-describedby="dialogTitle">
        <button
          className={s.closeButton}
          onClick={() => toggleOverlay()}
          aria-label="Overlay Schließen"
        ></button>
        <div className={s.body}>
          {title && (
            <h1 className={s.title} id="dialogTitle">
              {title}
            </h1>
          )}
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
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
