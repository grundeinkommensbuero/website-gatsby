import React, { useState, useEffect } from 'react';
import { CampainVisualisation } from '../CampaignVisualisations';
import { useGetCrowdfundingDirectly } from '../../hooks/Api/Crowdfunding';

export const CrowdfundingVisual = () => {
  const [crowdFunding] = useGetCrowdfundingDirectly(109676);
  const [nextTarget, setNextTarget] = useState(0);
  useEffect(() => {
    if (crowdFunding) {
      // Set target to next full 5000€
      setNextTarget(Math.ceil(crowdFunding.project.funding_status / 5000) * 5000);
    }
  }, [crowdFunding]);

  return (
    <div>
      {crowdFunding && <CampainVisualisation
        goal={nextTarget}
        count={Math.round(crowdFunding.project.funding_status)}
        isCrowdfunding={true}
        // showCTA={visualisations.length !== 1 && visualisation.ctaLink}
        labels={{
          NEEDED: () => <>Spendenziel</>,
          GOAL_INBETWEEN_TOOLTIP: count => (
            <>
              Insgesamt benötigt:
              <br />
              {count} €
            </>
          ),
          GOAL_INBETWEEN: count => (
            <>Nächstes Ziel: {count} €</>
          ),
          CURRENT_COUNT: () => <>Spendenstand</>,
          CTA: () => <>Mitmachen</>,
        }}
        currency="€"
        currencyShort="&#8239;€"
        startDate={false}
      />}
    </div>
  )
}