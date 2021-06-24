import React from 'react';
import { Button } from '../../Forms/Button';
import { SnackbarMessageContext } from '../../../context/Snackbar';
import { useDeleteUser } from '../../../hooks/Api/Users/Delete';
import { useSignOut } from '../../../hooks/Authentication';
import { useSnackbar } from 'react-simple-snackbar';
import snackbarTheme from '../../../context/Snackbar/snackbarTheme.json';
import * as s from './style.module.less';
import * as gS from '../style.module.less';
// Get newsletter styles from Newsletter-Settings
import * as nS from '../ProfileNotifications/style.module.less';

export const DeleteAccountDialog = ({ userId, setShowDeleteAccountDialog }) => {

  const deleteUser = useDeleteUser();
  const signOut = useSignOut();
  const [openSnackbar] = useSnackbar(snackbarTheme);

  const deleteSnackbarMessage = <p className={gS.snackbarMsg}>
    <span className={gS.loading}></span>{' '}
    <b>Dein Account wird gelöscht!</b>
  </p>;

  const accountDeletedMessage = <p className={gS.snackbarMsg}>
    <b>Dein Account wurde gelöscht!</b>
  </p>;

  const deleteUserAccount = (updateSnackbarMessage) => {
    signOut();
    openSnackbar(deleteSnackbarMessage, [6000]);
    setTimeout(() => {
      signOut();
      deleteUser({ userId });
      updateSnackbarMessage(accountDeletedMessage);
    }, 3000);
  };

  return (
    <section className={nS.newsletterCard}>
      <p className={nS.newsletterCardHeading}>
        Bist du sicher, dass du deinen Account löschen möchtest?
      </p>
      <br />
      <p className={nS.newsletterCardDescription}>
        Diese Aktion kann nicht rückgängig gemacht werden!
      </p>
      <div className={s.revokeButtonRow}>

        <Button
          className={s.revokeButton}
          onClick={() => setShowDeleteAccountDialog(false)}
          size="SMALL"
        >
          Abbrechen
        </Button>
        <SnackbarMessageContext.Consumer>
          {({ setMessage }) => (
            <Button
              size="SMALL"
              className={s.revokeButton}
              onClick={() => {
                deleteUserAccount(setMessage);
              }}
            >
              Account endgültig löschen
            </Button>
          )}
        </SnackbarMessageContext.Consumer>
      </div>
    </section>
  );
};