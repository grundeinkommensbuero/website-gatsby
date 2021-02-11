import React from 'react';
import s from './style.module.less';

export const StickyDonationBar = () => {
  const closeIcon = require('./close-icon.svg');

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <p className={s.donationBarItem}>Unterstütze uns.</p>
        <button className={s.donationBarCTA}>Sei dabei</button>
        <img
          aria-hidden="true"
          alt=""
          className={s.closeButton}
          src={closeIcon}
        />
      </div>
    </div>
  );
};
