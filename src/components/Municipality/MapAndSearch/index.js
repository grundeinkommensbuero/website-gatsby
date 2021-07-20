import React from 'react';
import { FallbackMap } from '../MunicipalityMap';
import { WrappedMunicipalitySearch } from '../MunicipalitySearch/WrappedMunicipalitySearch';
import * as s from './style.module.less';
import loadable from '@loadable/component';
import { Leaderboard } from '../Leaderboard';
import { VictoryBoard } from '../Leaderboard/VictoryBoard';
import { CampainVisualisation } from '../../CampaignVisualisations';

const MunicipalityMap = loadable(() => import('../MunicipalityMap'));

export const MapAndSearch = () => {
  return (
    <>
      <div className={s.mapSectionContainer}>
        <div className={s.search}>
          <WrappedMunicipalitySearch />
          <h5 className={s.elementHeading}>
            {'Aufsteiger der Woche'.toUpperCase()}
          </h5>
          <div className={s.municipalityDetails}>
            <div className={s.spaceBetween}>
              <h3 className={s.noMargin}>Gemeindename</h3>
              <h3 className={s.noMargin}>XX%</h3>
            </div>
            <p className={s.description}>
              X Anmeldungen in den letzten X Tagen
            </p>
            <CampainVisualisation
              goal={200}
              count={100}
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
              startDate={new Date()}
            />
          </div>

          <h5 className={s.elementHeading}>
            {'Kurz vor dem Ziel'.toUpperCase()}
          </h5>
          <div className={s.municipalityDetails}>
            <div className={s.spaceBetween}>
              <h3 className={s.noMargin}>Gemeindename</h3>
              <h3 className={s.noMargin}>XX%</h3>
            </div>
            <p className={s.description}>
              X Anmeldungen in den letzten X Tagen
            </p>
          </div>
        </div>
        <div className={s.map}>
          <MunicipalityMap fallback={<FallbackMap />} />
        </div>
      </div>
      <div className={s.leaderboard}>
        <div className={s.leaderboardTable}>
          <h5 className={s.elementHeading}>
            {'Auf dem Weg zum Ziel'.toUpperCase()}
          </h5>
          <Leaderboard />
        </div>
        <div className={s.leaderboardTable}>
          <h5 className={s.elementHeading}>
            {'Schon über die Ziellinie'.toUpperCase()}
          </h5>
          <VictoryBoard />
        </div>
      </div>
    </>
  );
};

// Default export needed for lazy loading
export default MapAndSearch;
