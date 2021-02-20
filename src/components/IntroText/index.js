import React from 'react';
import s from './style.module.less';

import change from './logo-change.png';
import diw from './logo-diw.svg';
import xbge from './logo-xbge-white.svg';

export const IntroText = ({
  highlightText: { highlightText },
  note: { note },
}) => {
  return (
    <div>
      <p>{highlightText}</p>
      <p>{note}</p>
      <div className={s.logoContainer}>
        <img
          src={diw}
          alt="Logo Deutsches Institut für Wirtschaftsforschung"
          className={s.diwLogo}
        />
        <img src={change} alt="Logo Change.org" className={s.changeLogo} />
        <img
          src={xbge}
          alt="Logo Expedition Grundeinkommen"
          className={s.xbgeLogo}
        />
      </div>{' '}
    </div>
  );
};
