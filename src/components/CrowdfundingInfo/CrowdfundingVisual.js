import React from 'react';
import { CampainVisualisation } from '../CampaignVisualisations';
import { useGetCrowdfundingDirectly } from '../../hooks/Api/Crowdfunding';

export const CrowdfundingVisual = () => {
  const [crowdFunding] = useGetCrowdfundingDirectly(109676);

  return (
    <div>
      {crowdFunding && (
        <CampainVisualisation
          goal={Math.round(10000)}
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
            GOAL_INBETWEEN: count => <>Nächstes Ziel: {count} €</>,
            CURRENT_COUNT: () => <>Spendenstand</>,
            CTA: () => <>Mitmachen</>,
          }}
          currency="€"
          currencyShort="&#8239;€"
          startDate={false}
        />
      )}
    </div>
  );
};
