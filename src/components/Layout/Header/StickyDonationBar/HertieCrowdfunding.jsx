import React, { useContext } from 'react';
import * as s from './hertieStyle.module.less';
import { StickyBannerContext } from '../../../../context/StickyBanner';
import { CrowdfundingVisual } from '../../../CrowdfundingInfo/CrowdfundingVisual';
import cN from 'classnames';
import Confetti from '../../../Confetti';

export const HertieCrowdfunding = () => {
  const closeIcon = require('!svg-inline-loader!./close-icon.svg');
  const { closeStickyBanner } = useContext(StickyBannerContext);

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <div
          aria-hidden="true"
          alt=""
          className={s.closeButton}
          src={closeIcon}
          onClick={() => closeStickyBanner()}
        />
        <div className={s.leftSection}>
          <p className={s.crowdfundingHeading}>
            <b>
              Vielen Dank für eure Unterstützung beim Hertie Crowdfunding
              Contest.
            </b>
          </p>
          <p className={s.crowdfundingDescription}>
            Dank euch allen hat die Expedition den ersten Platz gewonnen!{' '}
            <span role="img" aria-label="Party-Tüte">
              🎉
            </span>
          </p>
          <div className={s.visualisationForMobile}>
            <CrowdfundingVisual />
          </div>
        </div>
        <div className={cN(s.rightSection, s.visualisationForDesktop)}>
          <CrowdfundingVisual />
        </div>
      </div>

      <Confetti></Confetti>
    </div>
  );
};
