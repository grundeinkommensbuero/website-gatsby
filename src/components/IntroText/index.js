import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

import diw from './logo-diw.svg';
import xbge from './logo-xbge-white.svg';
import { StaticImage } from 'gatsby-plugin-image';

import { SignupButtonAndTile } from '../TickerToSignup/SignupButtonAndTile';

export const IntroText = ({
  highlightText: { highlightText },
  note: { note },
}) => {
  return (
    <div>
      <p className={s.introText}>{highlightText}</p>
      <p className={s.introText}>{note}</p>
      <SignupButtonAndTile className={s.centerButton} />
      <div className={s.logoContainer}>
        <div className={cN(s.partnerLogo, s.diwLogo)}>
          <img
            src={diw}
            alt="Logo Deutsches Institut für Wirtschaftsforschung"
          />
        </div>
        <div className={cN(s.partnerLogo, s.changeLogo)}>
          <StaticImage
            width={525}
            height={198}
            src="./logo-changeverein.png"
            alt="Logo Change.org e.V."
            placeholder="blurred"
          />
        </div>
        <div className={cN(s.partnerLogo, s.fribisLogo)}>
          <StaticImage
            width={446}
            height={140}
            src="./logo-fribis.png"
            alt="Logo Freiburg Institute for Basic Income Studies"
            placeholder="blurred"
          />
        </div>
        <div className={cN(s.partnerLogo, s.xbgeLogo)}>
          <img src={xbge} alt="Logo Expedition Grundeinkommen" />
        </div>
      </div>{' '}
    </div>
  );
};

// Default export needed for lazy loading
export default IntroText;
