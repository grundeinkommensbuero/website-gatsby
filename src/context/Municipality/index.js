import React, { useState, useEffect, useRef } from 'react';
import { useGetMunicipalityStats } from '../../hooks/Api/Municipalities';
import { history } from '../utils';
// import { usePrevious } from '../../hooks/utils';

export const MunicipalityContext = React.createContext();

export const MunicipalityProvider = ({ children }) => {
  // const prevMunicipality = usePrevious(municipality);
  const [isMunicipality, setIsMunicipality] = useState();
  const [municipality, setMunicipality] = useState();
  const [isSpecific, setIsSpecific] = useState();
  const [pageContext, setPageContext] = useState();
  const [statsSummary, setStatsSummary] = useState();

  // Stats for all municipalities
  const [
    allMunicipalityStatsState,
    allMunicipalityStats,
    getAllMunicipalityStats,
  ] = useGetMunicipalityStats();

  // Stats for just one municipality, will be set if a municipality is set
  const [
    singleMunicipalityStatsState,
    singleMunicipalityStats,
    getSingleMunicipalityStats,
  ] = useGetMunicipalityStats();

  const [
    municipalityContentfulState,
    setMunicipalityContentfulState,
  ] = useState('noMunicipality');

  // State to check whether this municipality is bremen,
  // hamburg, berlin or other municipality
  const [berlinHamburgBremenState, setBerlinHamburgBremenState] = useState(
    'noMunicipality'
  );

  const ags = useRef();

  // Get general municipality stats (of all munics)
  useEffect(() => {
    getAllMunicipalityStats();
  }, []);

  useEffect(() => {
    if (pageContext) {
      const {
        isMunicipality,
        isSpecificMunicipality,
        municipality,
        isFromHistoryEvent,
      } = pageContext;

      if (!isFromHistoryEvent) {
        history.replaceHistoryState(municipality, pageContext);
      }
      if (isMunicipality) {
        setIsMunicipality(true);
        if (isSpecificMunicipality) {
          setIsSpecific(true);
          setMunicipality(municipality);
        } else {
          setIsSpecific(false);
        }
      } else {
        setIsMunicipality(false);
        setIsSpecific(false);
        setMunicipality(undefined);
      }
    }
  }, [pageContext]);

  useEffect(() => {
    if (municipality) {
      if (
        typeof ags.current === undefined ||
        municipality.ags !== ags.current
      ) {
        ags.current = municipality.ags;
        getSingleMunicipalityStats(ags.current);
        setIsMunicipality(true);
        setIsSpecific(true);
        history.pushToHistoryState(municipality, pageContext);
        history.updateOnPopStateListener(
          municipality,
          setMunicipality,
          setPageContext
        );
        // TODO: We cannot know what state the municipality is in
        // but in case the municipality stats endpoint is down we should
        // set it to qualifying for now?
        setMunicipalityContentfulState('qualifying');

        if (municipality.ags === '11000000') {
          // Berlin
          setBerlinHamburgBremenState('berlin');
        } else if (municipality.ags === '02000000') {
          // Hamburg
          setBerlinHamburgBremenState('hamburg');
        } else if (municipality.ags === '04011000') {
          // Bremen
          setBerlinHamburgBremenState('bremen');
        } else {
          setBerlinHamburgBremenState('allExceptBerlinHamburgBremen');
        }
      }
    } else {
      ags.current = undefined;
      setMunicipalityContentfulState('noMunicipality');
      setBerlinHamburgBremenState('noMunicipality');
      setIsSpecific(false);
      // ! IMPORTANT:
      // TODO: is it possible to set isMunicipality here?
      // QUESTION: Do we still have the generic /gemeinden site?
    }
  }, [municipality]);

  useEffect(() => {
    if (municipality && municipality.ags === ags.current) {
      const isQualifying =
        singleMunicipalityStats.signups < singleMunicipalityStats.goal;
      const isQualified =
        singleMunicipalityStats.signups >= singleMunicipalityStats.goal;
      // TODO: API Call
      const isCollecting = false;

      setMunicipality({
        ...municipality,
        ...singleMunicipalityStats,
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
  }, [singleMunicipalityStats]);

  useEffect(() => {
    setStatsSummary(allMunicipalityStats.summary);
  }, [allMunicipalityStats]);

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
        berlinHamburgBremenState,
        setPageContext,
        allMunicipalityStats,
        allMunicipalityStatsState,
        singleMunicipalityStats,
        singleMunicipalityStatsState,
        statsSummary,
      }}
    >
      {children}
    </MunicipalityContext.Provider>
  );
};
