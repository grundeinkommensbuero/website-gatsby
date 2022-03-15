import React, { useState, useContext, useEffect } from 'react';
import { FallbackMap } from '../MunicipalityMap';
import { WrappedMunicipalitySearch } from '../MunicipalitySearch/WrappedMunicipalitySearch';
import * as s from './style.module.less';
import loadable from '@loadable/component';
import { Leaderboard } from '../Leaderboard';
import { QualifiedBoard } from '../Leaderboard/QualifiedBoard';
import { ExpandableRow } from './ExpandableRow';
import { MunicipalityContext } from '../../../context/Municipality';

const MunicipalityMap = loadable(() => import('../MunicipalityMap'));

export const MapAndSearch = () => {
  const { municipality, leaderboardSegments, statsInDays } =
    useContext(MunicipalityContext);
  const [highlightedMunicipality, setHighlightedMunicipality] = useState();
  const [almostQualifiedMunicipality, setAlmostQualifiedMunicipality] =
    useState();

  useEffect(() => {
    setHighlightedMunicipality(leaderboardSegments.hot[0]);
    setAlmostQualifiedMunicipality(leaderboardSegments.largeMunicipalities[0]);
  }, [leaderboardSegments]);

  useEffect(() => {
    if (municipality) {
      setHighlightedMunicipality(municipality);
    }
  }, [municipality]);

  // If there is data to display, show leaderboard and map, else show fallback map
  if (highlightedMunicipality || almostQualifiedMunicipality) {
    return (
      <>
        <div className={s.mapSectionContainer}>
          <div className={s.search}>
            <WrappedMunicipalitySearch />
            {!municipality ? (
              <h5 className={s.elementHeading}>
                {'Aufsteiger der Woche!'.toUpperCase()}
              </h5>
            ) : (
              <h5 className={s.elementHeading}>
                {'Deine Suche'.toUpperCase()}
              </h5>
            )}
            <div className={s.municipalityDetails}>
              <ExpandableRow
                statsInDays={statsInDays}
                municipality={highlightedMunicipality}
                isExpanded={true}
              />
            </div>

            <h5 className={s.elementHeading}>
              {'Kurz vor dem Ziel'.toUpperCase()}
            </h5>
            <div className={s.municipalityDetails}>
              <ExpandableRow
                statsInDays={statsInDays}
                municipality={almostQualifiedMunicipality}
              />
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
            <QualifiedBoard />
          </div>
        </div>
      </>
    );
  }
  return <MunicipalityMap fallback={<FallbackMap />} />;
};

// Default export needed for lazy loading
export default MapAndSearch;
