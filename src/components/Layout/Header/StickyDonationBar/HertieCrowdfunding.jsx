import React, { useContext } from 'react';
import * as s from './hertieStyle.module.less';
import { StickyBannerContext } from '../../../../context/StickyBanner';
import cN from 'classnames';
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
          <a target="_blank" rel="noreferrer" href="https://youtu.be/8lafJcpNpXY?t=3993">Sieh hier die Aufzeichnung vom 27. Mai 2021 an.</a> 
          </p>
        </div>
        <div className={cN(s.rightSection, s.visualisationForDesktop)}>
          <img src={Crowd1} className={s.crowd} alt="Illustration von feiernden Händen" />
        </div>
      </div>

    </div>
  );
};
