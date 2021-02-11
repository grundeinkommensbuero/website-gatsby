import React, { useState, useEffect, useRef } from 'react';
import { useGetMunicipalityStats } from '../../hooks/Api/Municipalities';
import { history } from '../utils';
// import { usePrevious } from '../../hooks/utils';

export const MunicipalityContext = React.createContext();

export const MunicipalityProvider = ({ children }) => {
  const [isMunicipality, setIsMunicipality] = useState();
  const [municipality, setMunicipality] = useState();
  // const prevMunicipality = usePrevious(municipality);
  const [isSpecific, setIsSpecific] = useState();
  const [, municipalityStats, getMunicipalityStats] = useGetMunicipalityStats();
  const [
    municipalityContentfulState,
    setMunicipalityContentfulState,
  ] = useState('noMunicipality');
  const ags = useRef();

  useEffect(() => {
    if (municipality) {
      if (
        typeof ags.current === undefined ||
        municipality.ags !== ags.current
      ) {
        ags.current = municipality.ags;
        getMunicipalityStats(ags.current);
        setIsMunicipality(true);
        setIsSpecific(true);
        history.pushToHistoryState(municipality);
        history.updateOnPopStateListener(municipality, setMunicipality);
      }
    } else {
      ags.current = undefined;
      setMunicipalityContentfulState('noMunicipality');
      setIsSpecific(false);
      // ! IMPORTANT:
      // TODO: is it possible to set isMunicipality here?
      // QUESTION: Do we stillt have the generic /gemeinden site?
    }
  }, [municipality]);

  useEffect(() => {
    if (municipality && municipality.ags === ags.current) {
      const isQualifying = municipalityStats.signups < municipalityStats.goal;
      const isQualified = municipalityStats.signups >= municipalityStats.goal;
      // TODO: API Call
      const isCollecting = false;

      setMunicipality({
        ...municipality,
        ...municipalityStats,
        isQualifying,
        isQualified,
        isCollecting,
      });

      if (isCollecting) {
        setMunicipalityContentfulState('collecting');
      } else if (isQualified) {
        setMunicipalityContentfulState('qualified');
      } else if (isQualifying) {
        setMunicipalityContentfulState('qualifying');
      }
      return () => {
        history.removeOnPopStateListener();
      };
    }
  }, [municipalityStats]);

  return (
    <MunicipalityContext.Provider
      value={{
        isMunicipality,
        setIsMunicipality,
        municipality,
        setMunicipality,
        isSpecific,
        setIsSpecific,
        municipalityContentfulState,
      }}
    >
      {children}
    </MunicipalityContext.Provider>
  );
};
