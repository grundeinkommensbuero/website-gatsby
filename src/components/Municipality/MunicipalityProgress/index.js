import React, { useContext } from 'react';
import { CampainVisualisation } from '../../CampaignVisualisations';
import { MunicipalityContext } from '../../../context/Municipality';

export const MunicipalityProgress = () => {
  const { municipality } = useContext(MunicipalityContext);
  const statsReady = municipality?.signups && municipality?.goal > 0;
  return (
    <>
      {statsReady && (
        <div>
          <h2>
            Gemeinsam bringen wir das Grundeinkommen nach {municipality.name}!
          </h2>
          <CampainVisualisation
            goal={municipality.goal}
            count={municipality.signups}
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
            startDate={new Date()}
          />
          <h3>{getSignupsLabel(municipality.signups, municipality.goal)}</h3>
          <p>
            Wenn wir ingesamt {municipality.goal} Menschen sind, dann trauen wir
            uns zu, gemeinsam den offiziellen Bürgerbegehrens-prozess für
            unseren Modellversuch zu starten. Hierfür müssen wir möglichst viele
            sein. Hol also noch Menschen dazu!
          </p>
        </div>
      )}
    </>
  );
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
