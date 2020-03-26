import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import s from './style.module.less';

const COOKIE_NAME = 'overlayHasBeenDismissed';

export default () => {
  const [hasBeenDismissed, setHasBeenDismissed] = useHasBeenDismissed();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, isOpen);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(!hasBeenDismissed);
  }, [hasBeenDismissed]);

  const close = () => {
    setIsOpen(false);
    setHasBeenDismissed(true);
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
