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

  useEffect(() => {
    if (message !== '') {
      openSnackbar(message, [6000]);
      setMessage('');
    }
  }, [message]);

  return (
    <SnackbarMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </SnackbarMessageContext.Provider>
  );
};
