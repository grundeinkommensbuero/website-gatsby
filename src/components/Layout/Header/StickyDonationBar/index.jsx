import React, { useContext } from 'react';
import * as s from './style.module.less';
import { MunicipalityContext } from '../../../../context/Municipality';
import { StickyBannerContext } from '../../../../context/StickyBanner';
import closeIcon from './close-icon.svg';

export const StickyDonationBar = () => {
  const { allMunicipalityStats } = useContext(MunicipalityContext);
  const { closeStickyBanner } = useContext(StickyBannerContext);

  const qualifiedCount =
    allMunicipalityStats?.qualifiedMunicipalities?.length || 0;

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <p className={s.donationBarItem}>
          Schon {qualifiedCount} Orte haben sich qualifiziert, ganz viele sind
          auf dem Weg zum Ziel. Hilf mit weitere Orte ins Ziel zu bringen!
        </p>
        {/* <button className={s.donationBarCTA}>Sei dabei</button> */}
        <button className={s.closeButton} onClick={() => closeStickyBanner()}>
          <img
            className={s.closeIcon}
            src={closeIcon}
            alt="Banner schließen, cookie setzen"
          />
        </button>
      </div>
    </div>
  );
};
