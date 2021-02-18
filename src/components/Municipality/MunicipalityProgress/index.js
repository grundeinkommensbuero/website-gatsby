import React, { useContext } from 'react';
import { CampainVisualisation } from '../../CampaignVisualisations';
import { MunicipalityContext } from '../../../context/Municipality';

export const MunicipalityProgress = ({
  showHeadline = true,
  showDescription = true,
}) => {
  const { municipality } = useContext(MunicipalityContext);
  const statsReady = municipality?.goal > 0;
  let signups = municipality?.signups || 0;
  if (typeof signups !== 'number') {
    signups = 0;
  }

  if (statsReady) {
    return (
      <div>
        {showHeadline && (
          <h2>
            Gemeinsam bringen wir das Grundeinkommen nach {municipality.name}!
          </h2>
        )}
        <CampainVisualisation
          goal={municipality.goal}
          count={signups}
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
        <h3>{getSignupsLabel(municipality.signups, municipality.goal)}</h3>
        {showDescription && (
          <p>
            Wenn wir ingesamt {municipality.goal} Menschen sind, dann trauen wir
            uns zu, gemeinsam den offiziellen Bürgerbegehrens-prozess für
            unseren Modellversuch zu starten. Hierfür müssen wir möglichst viele
            sein. Hol also noch Menschen dazu!
          </p>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

const getSignupsLabel = (signups, goal) => {
  // if (signups > goal) {
  //   return `Ziel erreicht! Und es sind bereits ${signups -
  //     goal} mehr als die benötigten ${goal} Anmeldungen`;
  // }
  if (signups >= goal) {
    return `${signups} / ${goal} Anmeldungen. Juhu!`;
  }
  if (signups > 1) {
    return `${signups} / ${goal} Anmeldungen`;
  }
  if (signups === 0) {
    return 'Leider noch keine Anmeldungen';
  }
};
