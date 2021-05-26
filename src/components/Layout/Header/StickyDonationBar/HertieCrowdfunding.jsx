import React, { useContext } from 'react';
import * as s from './hertieStyle.module.less';
import { StickyBannerContext } from '../../../../context/StickyBanner';
import cN from 'classnames';
import Confetti from '../../../Confetti';
import Crowd1 from './crowd1.svg';

export const HertieCrowdfunding = () => {
  const closeIcon = require('!svg-inline-loader!./close-icon.svg');
  const { closeStickyBanner } = useContext(StickyBannerContext);

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <div
          aria-hidden="true"
          className={s.closeButton}
          dangerouslySetInnerHTML={{ __html: closeIcon }}
          onClick={() => closeStickyBanner()}
        ></div>
        <div className={s.leftSection}>
          <p className={s.crowdfundingHeading}>
            <b>
            Grundeinkommen kommt ins Parlament.
            </b>
          </p>
          <p className={s.crowdfundingDescription}>
          <a href="https://www.parlament-berlin.de/de/Mediathek/Parlament-live/Livestream-Ausschuss">Verfolge hier live die Anhörung am 27. Mai um 9 Uhr</a> 
            &nbsp;<span role="img" aria-label="Kamera-Symbol">
            🎥
            </span>
          </p>
        </div>
        <div className={cN(s.rightSection, s.visualisationForDesktop)}>
          <img src={Crowd1} className={s.crowd} alt="Illustration von feiernden Händen" />
        </div>
      </div>

      <Confetti></Confetti>
    </div>
  );
};
