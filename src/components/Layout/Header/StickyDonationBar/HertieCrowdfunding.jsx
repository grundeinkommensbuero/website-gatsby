import React, { useContext } from 'react';
import s from './style.module.less';
import { StickyBannerContext } from '../../../../context/StickyBanner';
import { CampainVisualisation } from '../../../CampaignVisualisations';
import cN from 'classnames';

export const HertieCrowdfunding = () => {
  const closeIcon = require('./close-icon.svg');
  const arrowDown = require('./arrow-down.svg');
  const { closeStickyBanner } = useContext(StickyBannerContext);

  return (
    <div className={s.donationBar}>
      <div className={s.donationBarItemContainer}>
        <img
          aria-hidden="true"
          alt=""
          className={s.closeButton}
          src={closeIcon}
          onClick={() =>
            closeStickyBanner({ whichBanner: 'hertieCrowdfunding' })
          }
        />
        <div className={s.leftSection}>
          <p className={s.crowdfundingHeading}>
            <b>Mach mit beim Crowdfunding!</b>
          </p>
          <p className={s.crowdfundingDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae volutpat urna.
          </p>
          <div className={s.visualisationForMobile}>
            <CampainVisualisation
              goal={20000}
              count={7653}
              // showCTA={visualisations.length !== 1 && visualisation.ctaLink}
              labels={{
                NEEDED: () => <>Benötigte Anmeldungen</>,
                GOAL_INBETWEEN_TOOLTIP: count => (
                  <>
                    Insgesamt benötigt:
                    <br />
                    {count} Anmeldungen
                  </>
                ),
                GOAL_INBETWEEN: count => (
                  <>Nächstes Ziel: {count} Anmeldungen</>
                ),
                CURRENT_COUNT: () => <>Anmeldungen</>,
                CTA: () => <>Mitmachen</>,
              }}
              currency="Anmeldungen"
              startDate={false}
            />
          </div>
          <div className={s.actionRow}>
            <button className={s.crowdfundingCTA}>Mitmachen</button>
            <div
              className={s.engageText}
              aria-hidden="true"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '#crowdfunding';
                link.click();
                closeStickyBanner({ whichBanner: 'hertieCrowdfunding' });
              }}
            >
              <span className={s.moreInfo}>Mehr erfahren</span>
              <img alt="" className={s.arrowDown} src={arrowDown} />
            </div>
          </div>
        </div>
        <div className={cN(s.rightSection, s.visualisationForDesktop)}>
          <CampainVisualisation
            goal={20000}
            count={7653}
            // showCTA={visualisations.length !== 1 && visualisation.ctaLink}
            labels={{
              NEEDED: () => <>Benötigte Anmeldungen</>,
              GOAL_INBETWEEN_TOOLTIP: count => (
                <>
                  Insgesamt benötigt:
                  <br />
                  {count} Anmeldungen
                </>
              ),
              GOAL_INBETWEEN: count => <>Nächstes Ziel: {count} Anmeldungen</>,
              CURRENT_COUNT: () => <>Anmeldungen</>,
              CTA: () => <>Mitmachen</>,
            }}
            currency="Anmeldungen"
            startDate={false}
          />
        </div>
      </div>
    </div>
  );
};
