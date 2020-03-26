import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'overlayHasBeenDismissed';

export default () => {
  const [hasBeenDismissed, setHasBeenDismissed] = useHasBeenDismissed();

  console.log(hasBeenDismissed);
  useEffect(() => {
    console.log('dismissing');
    setHasBeenDismissed(true);
  }, []);
  return <></>;
};

const useHasBeenDismissed = () => {
  const [hasBeenDismissed, setHasBeenDismissed] = useState(() => {
    console.log('cookie', Cookies.get(COOKIE_NAME));
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
