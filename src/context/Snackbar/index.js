import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import snackbarTheme from './snackbarTheme.json';

export const SnackbarMessageContext = React.createContext({
  message: '',
  setMessage: () => {},
});

export const SnackbarMessageProvider = ({ children }) => {
  const [openSnackbar] = useSnackbar(snackbarTheme);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(6000);

  useEffect(() => {
    if (message !== '') {
      openSnackbar(message, [duration]);
      setMessage('');
    }
  }, [message]);

  return (
    <SnackbarMessageContext.Provider
      value={{ message, setMessage, setDuration }}
    >
      {children}
    </SnackbarMessageContext.Provider>
  );
};
