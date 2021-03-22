import React from 'react';
import s from './style.module.less';

export const StickyDonationBar = className => {
  const closeIcon = require('./close-icon.svg');

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <p className={s.donationBarItem}>
          Schon 16 Orte haben sich qualifiziert, ganz viele sind auf dem Weg zum
          Ziel. Noch bis Sonntag anmelden!
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
