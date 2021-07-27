import React, { useState, useEffect, useRef } from 'react';
import { useGetMunicipalityStats } from '../../hooks/Api/Municipalities';

import municipalities from '../../components/Municipality/MunicipalityMap/data/municipalitiesForMap.json';

export const MunicipalityContext = React.createContext();

export const MunicipalityProvider = ({ children }) => {
  const [isMunicipality, setIsMunicipality] = useState();
  const [municipality, setMunicipalityState] = useState();
  const [isSpecific, setIsSpecific] = useState();
  const [pageContext, setPageContext] = useState();
  const [statsSummary, setStatsSummary] = useState();
  const [municipalitiesGoalSignup, setMunicipalitiesGoalSignup] = useState([]);
  const [municipalitiesInObject, setMunicipalitiesInObject] = useState({});
  const [leaderboardSegments, setLeaderboardSegments] = useState({});
  const [statsInDays, setStatsInDays] = useState();

  // Add the Signups and percentage to the municipality object
  const setMunicipality = municipality => {
    let municipalityForContext = municipality;
    if (allMunicipalityStats?.municipalities && municipality?.ags) {
      const foundMunicipality = allMunicipalityStats.municipalities.find(
        m => m.ags === municipality.ags
      );
      if (foundMunicipality) {
        municipalityForContext = {
          signups: foundMunicipality.signups,
          percent: Math.round(
            (foundMunicipality.signups / municipality.goal) * 100
          ),
          ...municipality,
        };
      } else {
        municipalityForContext = {
          signups: 0,
          percent: 0,
          ...municipality,
        };
      }
    }
    setMunicipalityState(municipalityForContext);
  };

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
    // getSingleMunicipalityStats,
  ] = useGetMunicipalityStats();

  const [
    municipalityContentfulState,
    setMunicipalityContentfulState,
  ] = useState('noMunicipality');

  // State to check whether this municipality is bremen,
  // hamburg, berlin or other municipality
  const [berlinHamburgBremenState /*setBerlinHamburgBremenState*/] = useState(
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
      } = pageContext;

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
    if (allMunicipalityStats?.summary?.timestamp) {
      setStatsSummary(allMunicipalityStats.summary);
    }
  }, [allMunicipalityStats]);

  useEffect(() => {
    // Create Object with raw municipality data for faster reference
    const municipalityObject = municipalities.reduce(
      (muniObj, municipality) => {
        muniObj[municipality.ags.toString()] = {
          name: municipality.name,
          goal: municipality.goal,
          population: municipality.population,
          slug: municipality.slug,
        };
        return muniObj;
      },
      {}
    );
    // When there are events, add them to municipality key
    if (allMunicipalityStats.events) {
      allMunicipalityStats.events.forEach(e => {
        municipalityObject[e.ags.toString()] = {
          event: e,
          ...municipalityObject[e.ags.toString()],
        };
      });
    }
    setMunicipalitiesInObject(municipalityObject);
  }, [allMunicipalityStats]);

  useEffect(() => {
    // Find all municipalities with signups and goal
    const municipalitiesWithGoalAndSignups = [];
    if ('municipalities' in allMunicipalityStats) {
      allMunicipalityStats.municipalities.forEach(municipality => {
        if (municipality.ags.toString() in municipalitiesInObject) {
          const fullMunicipality = {
            ags: municipality.ags,
            signups: municipality.signups,
            percent: Math.round(
              (municipality.signups /
                municipalitiesInObject[municipality.ags.toString()].goal) *
                100
            ),
            ...municipalitiesInObject[municipality.ags.toString()],
          };
          municipalitiesWithGoalAndSignups.push(fullMunicipality);
        }
      });
      municipalitiesWithGoalAndSignups.sort((a, b) => {
        return b.percent - a.percent;
      });
      setMunicipalitiesGoalSignup(municipalitiesWithGoalAndSignups);
    }
  }, [municipalitiesInObject]);

  useEffect(() => {
    const segments = {
      hot: [],
      smallMunicipalities: [],
      largeMunicipalities: [],
      qualified: [],
    };
    municipalitiesGoalSignup.forEach(municipality => {
      if ('event' in municipality) {
        const beforePercent =
          (municipality.event.signups[0] / municipality.goal) * 100;
        const afterPercent =
          (municipality.event.signups[1] / municipality.goal) * 100;
        municipality.grewByPercent =
          Math.round((afterPercent - beforePercent) * 100) / 100;
        segments.hot.push(municipality);
      }
      if (municipality.percent >= 100) {
        segments.qualified.push(municipality);
      }
      if (municipality.percent < 100 && municipality.population < 20000) {
        segments.smallMunicipalities.push(municipality);
      }
      if (municipality.percent < 100 && municipality.population > 20000) {
        segments.largeMunicipalities.push(municipality);
      }
    });
    segments.hot.sort((a, b) => b.grewByPercent - a.grewByPercent);
    segments.qualified.sort((a, b) => b.population - a.population);
    setLeaderboardSegments(segments);
  }, [municipalitiesGoalSignup]);

  useEffect(() => {
    const calcStatsInDays =
      allMunicipalityStats.timePassed / 1000 / 60 / 60 / 24;
    setStatsInDays(calcStatsInDays);
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
        municipalitiesGoalSignup,
        leaderboardSegments,
        statsInDays,
        refreshContextStats: () => getAllMunicipalityStats(),
      }}
    >
      {children}
    </MunicipalityContext.Provider>
  );
};
