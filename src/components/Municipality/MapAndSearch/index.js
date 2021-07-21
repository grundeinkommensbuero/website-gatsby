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
  const { municipality, leaderboardSegments } = useContext(MunicipalityContext);
  const [currentMunicipality, setCurrentMunicipality] = useState();

  useEffect(() => {
    console.log(leaderboardSegments.hot[0]);
    setCurrentMunicipality(leaderboardSegments.hot[0]);
  }, [leaderboardSegments]);

  useEffect(() => {
    if (municipality) {
      setCurrentMunicipality(municipality);
    }
  }, [municipality]);

  return (
    <>
      <div className={s.mapSectionContainer}>
        <div className={s.search}>
          <WrappedMunicipalitySearch />
          <h5 className={s.elementHeading}>
            {'Aufsteiger der Woche'.toUpperCase()}
          </h5>
          <div className={s.municipalityDetails}>
            <ExpandableRow
              municipality={currentMunicipality}
              isExpanded={true}
            />
          </div>

          <h5 className={s.elementHeading}>
            {'Kurz vor dem Ziel'.toUpperCase()}
          </h5>
          <div className={s.municipalityDetails}>
            <ExpandableRow municipality={currentMunicipality} />
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
};

// Default export needed for lazy loading
export default MapAndSearch;
