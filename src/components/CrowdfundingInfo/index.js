import React from 'react';
import videoPlaceholder from './videoPlaceholder.png';
import s from './style.module.less';
import { CampainVisualisation } from '../CampaignVisualisations';

export const CrowdfundingInfo = () => {
  return (
    <>
      <h2>Crowdfunding: Unterstütze uns!</h2>
      <div className={s.contentContainer}>
        <img className={s.videoPlaceholder} alt="" src={videoPlaceholder} />
        <p className={s.description}>
          Vestibulum convallis mauris vel sapien ultrices, sit amet placerat
          nisi rhoncus. Suspendisse vitae nisi et magna tempor tempus. Integer
          eleifend suscipit porta. Duis tristique tortor eget tellus convallis
          sagittis. Cras urna lorem, blandit sit amet enim at, dapibus hendrerit
          quam. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus.
        </p>
      </div>
      <div>
        <CampainVisualisation
          goal={20000}
          count={7653}
          isCrowdfunding={true}
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
    </>
  )
}