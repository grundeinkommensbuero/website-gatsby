import React, { useState, useEffect, useRef } from 'react';
import { useGetMunicipalityStats } from '../../hooks/Api/Municipalities';

export const MunicipalityContext = React.createContext();

export const MunicipalityProvider = ({ children }) => {
  const [isMunicipality, setIsMunicipality] = useState();
  const [municipality, setMunicipality] = useState();
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
      }
    } else {
      ags.current = undefined;
      setMunicipalityContentfulState('noMunicipality');
      setIsMunicipality();
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
