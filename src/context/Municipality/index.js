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
  const [prevModifyBy, setPrevModifyBy] = useState(0);
  const [currModifyBy, setCurrModifyBy] = useState(575);


  // Stats for all municipalities
  const [
    allMunicipalityStatsState,
    allMunicipalityStats,
    getAllMunicipalityStats,
  ] = useGetMunicipalityStats();

  // Stats for juse on municipality, will be set if a municipality is set
  const [
    singleMunicipalityStatsState,
    singleMunicipalityStats,
    getSingleMunicipalityStats,
  ] = useGetMunicipalityStats();

  const [
    municipalityContentfulState,
    setMunicipalityContentfulState,
  ] = useState('noMunicipality');
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
      }
    } else {
      ags.current = undefined;
      setMunicipalityContentfulState('noMunicipality');
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

  // Choose ONE of the following useEffects for testing :)
  // Demo-Data with timestamps from backend to test pagereload persistance

  useEffect(() => {
    if (allMunicipalityStats?.summary?.timestamp) {
      const modifiedSummary = { ...allMunicipalityStats.summary }
      if (prevModifyBy !== 0) {
        modifiedSummary.previous.users = modifiedSummary.users + prevModifyBy;
        modifiedSummary.previous.municipalities = modifiedSummary.municipalities + (Math.floor(prevModifyBy / 10));
      }
      modifiedSummary.users = modifiedSummary.users + currModifyBy;
      modifiedSummary.municipalities = modifiedSummary.municipalities + (Math.floor(currModifyBy / 10));
      setStatsSummary(modifiedSummary);
      console.log('##### SUMMARY ->', modifiedSummary);
      setPrevModifyBy(currModifyBy);
      setCurrModifyBy(currModifyBy + currModifyBy);
    }
  }, [allMunicipalityStats]);

  // Demo-Data one minute before interval switch to test data update

  // const getTestDateMinusMiutes = (date, min) => {
  //   let dt = new Date(date);
  //   dt.setMinutes(dt.getMinutes() - min);
  //   return dt.toISOString();
  // };

  // useEffect(() => {
  //   if (allMunicipalityStats?.summary?.timestamp) {
  //     const modifiedSummary = { ...allMunicipalityStats.summary }
  //     if (prevModifyBy !== 0) {
  //       modifiedSummary.previous.users = modifiedSummary.users + prevModifyBy;
  //       modifiedSummary.previous.municipalities = modifiedSummary.municipalities + (Math.floor(prevModifyBy / 10));
  //     }
  //     modifiedSummary.users = modifiedSummary.users + currModifyBy;
  //     modifiedSummary.municipalities = modifiedSummary.municipalities + (Math.floor(currModifyBy / 10));
  //     if (currModifyBy === 575) {
  //       modifiedSummary.previous.timestamp = getTestDateMinusMiutes(new Date(), 29);
  //       modifiedSummary.timestamp = getTestDateMinusMiutes(new Date(), 14);
  //     } else {
  //       modifiedSummary.previous.timestamp = getTestDateMinusMiutes(new Date(), 15);
  //       modifiedSummary.timestamp = getTestDateMinusMiutes(new Date(), 0);
  //     }
  //     setStatsSummary(modifiedSummary);
  //     console.log('##### SUMMARY ->', modifiedSummary);
  //     setPrevModifyBy(currModifyBy);
  //     setCurrModifyBy(currModifyBy + currModifyBy);
  //   }
  // }, [allMunicipalityStats]);


  // // Correct Version for MERGE:

  // useEffect(() => {
  //   if (allMunicipalityStats?.summary?.timestamp) {
  //     setStatsSummary(allMunicipalityStats.summary);
  //   }
  // }, [allMunicipalityStats]);

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
        setPageContext,
        allMunicipalityStats,
        allMunicipalityStatsState,
        singleMunicipalityStats,
        singleMunicipalityStatsState,
        statsSummary,
        refreshContextStats: () => getAllMunicipalityStats()
      }}
    >
      {children}
    </MunicipalityContext.Provider>
  );
};
