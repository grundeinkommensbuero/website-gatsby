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
      <p className={s.introText}>{highlightText}</p>
      <p className={s.introText}>{note}</p>
      <div className={s.logoContainer}>
        <div className={s.diwLogo}>
          <img
            src={diw}
            alt="Logo Deutsches Institut für Wirtschaftsforschung"
          />
        </div>
        <div className={s.changeLogo}>
          <img src={change} alt="Logo Change.org" />
        </div>
        <div className={s.xbgeLogo}>
          <img src={xbge} alt="Logo Expedition Grundeinkommen" />
        </div>
      </div>{' '}
    </div>
  );
};
