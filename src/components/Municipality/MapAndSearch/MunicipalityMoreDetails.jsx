import { navigate } from 'gatsby';
import React from 'react';
import { CampainVisualisation } from '../../CampaignVisualisations/index';
import { Button } from '../../Forms/Button/index';
import * as s from './style.module.less';

export const MunicipalityMoreDetails = ({
  municipality: municipalityToDisplay,
}) => {
  return (
    <section className={s.expandedRow}>
      {municipalityToDisplay?.goal && (
        <CampainVisualisation
          goal={municipalityToDisplay.goal}
          count={municipalityToDisplay.signups}
          onWhiteBackground={true}
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
        />
      )}
      <div className={s.buttonContainer}>
        <Button
          className={s.municipalityButton}
          onClick={() => navigate(`/orte/${municipalityToDisplay.slug}`)}
        >
          Zur Ortsseite
        </Button>
      </div>
    </section>
  );
};
