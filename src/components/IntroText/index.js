import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

import change from './logo-changeverein.png';
import diw from './logo-diw.svg';
import fribis from './logo-fribis.png';
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
        <div className={cN(s.partnerLogo, s.diwLogo)}>
          <img
            src={diw}
            alt="Logo Deutsches Institut für Wirtschaftsforschung"
          />
        </div>
        <div className={cN(s.partnerLogo, s.changeLogo)}>
          <img src={change} alt="Logo Change.org e.V." />
        </div>
        <div className={cN(s.partnerLogo, s.fribisLogo)}>
          <img src={fribis} alt="Logo Freiburg Institute for Basic Income Studies" />
        </div>
        <div className={cN(s.partnerLogo, s.xbgeLogo)}>
          <img src={xbge} alt="Logo Expedition Grundeinkommen" />
        </div>
      </div>{' '}
    </div>
  );
};
