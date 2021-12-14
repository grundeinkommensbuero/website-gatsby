import { useContext } from 'react';
import * as s from './style.module.less';
import { StickyBannerContext } from '../../../../context/StickyBanner';
import closeIcon from './close-icon.svg';

export const StickyDonationBar = () => {
  const { closeStickyBanner } = useContext(StickyBannerContext);

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <p className={s.donationBarItem}>
          Weihnachtsverlosung mit Grundeinkommen! Klick hier, um zu spenden und
          spannende Preise zu gewinnen
        </p>
        <button className={s.donationBarCTA}>Zur Verlosung</button>
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
