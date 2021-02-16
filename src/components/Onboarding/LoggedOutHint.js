import React from 'react';
import s from './style.module.less';

export const LoggedOutHint = () => {
    return (
        <h1 className={s.loggedOutHint}>
            <a href="/login">Logg dich ein</a>, um diese Seite zu sehen.
        </h1>
    )
}