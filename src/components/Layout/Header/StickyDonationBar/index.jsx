import React, { useContext } from 'react';
import s from './style.module.less';
import { MunicipalityContext } from '../../../../context/Municipality';

export const StickyDonationBar = className => {
  // const closeIcon = require('./close-icon.svg');
  const { allMunicipalityStats } = useContext(MunicipalityContext);

  const qualifiedCount =
    allMunicipalityStats?.qualifiedMunicipalities?.length || 0;

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <p className={s.donationBarItem}>
          Schon {qualifiedCount} Orte haben sich qualifiziert, ganz viele sind
          auf dem Weg zum Ziel. Hilf mit weitere Orte ins Ziel zu bringen!
        </p>
        {/* <button className={s.donationBarCTA}>Sei dabei</button>
        <img
          aria-hidden="true"
          alt=""
          className={s.closeButton}
          src={closeIcon}
        /> */}
      </div>
    </div>
  );
};
