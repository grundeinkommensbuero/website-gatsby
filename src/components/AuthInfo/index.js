import React, { useContext } from 'react';
import s from './style.module.less';
import { InlineButton } from '../Forms/Button';
import { useSignOut } from '../../hooks/Authentication';
import AuthContext from '../../context/Authentication';

export default () => {
  // user.username is actually email in cognito
  const { user } = useContext(AuthContext);
  const signOut = useSignOut();

  return (
    <p className={s.hint}>
      Du bist mit der Adresse {user && user.username} angemeldet.{' '}
      <InlineButton onClick={signOut} type="button">
        {' '}
        Nicht du?
      </InlineButton>
    </p>
  );
};
