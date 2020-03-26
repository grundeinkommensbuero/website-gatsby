import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import s from './style.module.less';

const COOKIE_NAME = 'overlayHasBeenDismissed';

export const ShowOnlyOnceOverlay = ({ ...overlay }) => {
  const [hasBeenDismissed, setHasBeenDismissed] = useHasBeenDismissed();

  return (
    <Overlay
      isOpenInitially={!hasBeenDismissed}
      onClose={() => {
        setHasBeenDismissed();
      }}
      {...overlay}
    />
  );
};

export const Overlay = ({ onClose = () => {}, isOpenInitially = true }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, isOpen);
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    onClose();
  };

  if (isOpen) {
    return (
      <div className={s.container} role="dialog">
        <button
          className={s.closeButton}
          onClick={close}
          aria-label="Overlay Schließen"
        ></button>
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
