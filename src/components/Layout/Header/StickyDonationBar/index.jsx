import React, { useContext } from 'react';
import * as s from './style.module.less';
import { StickyBannerContext } from '../../../../context/StickyBanner';
import closeIcon from './close-icon.svg';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';

export const StickyDonationBar = () => {
  const { closeStickyBanner } = useContext(StickyBannerContext);
  const { pathname } = useLocation();

  // Deactive banner on lottery page
  if (pathname?.includes('verlosung')) {
    return null;
  }

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <div className={s.donationBarItem}>
          <h3 className={s.noMargin}>
            Weihnachtsverlosung mit Grundeinkommen!
          </h3>
          <p className={s.noMargin}>
            Klick hier, um zu spenden und spannende Preise zu gewinnen
          </p>
        </div>
        <button
          className={s.donationBarCTA}
          onClick={() => {
            navigate('/verlosung');
          }}
        >
          Zur Verlosung
        </button>
        <button className={s.closeButton} onClick={() => closeStickyBanner()}>
          <img
            className={s.closeIconBanner}
            src={closeIcon}
            alt="Banner schließen, cookie setzen"
          />
        </button>
      </div>
    </div>
  );
};
