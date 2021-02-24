import React, { useContext, useState, useEffect } from 'react';
import cN from 'classnames';
import Reel from 'react-reel';
import s from './style.module.less';
import { MunicipalityContext } from '../../../context/Municipality';

import './reelstyle.less';

export const Ticker = ({ tickerDescription }) => {
  const { municipality, statsSummary, refreshContextStats } = useContext(MunicipalityContext);

  const [timerIsReady, setTimerIsReady] = useState(false);
  const [peopleCount, setPeopleCount] = useState(0);
  const [municipalityCount, setMunicipalityCount] = useState(0);
  const [updatedTimes, setUpdatedTimes] = useState(0);
  const [timePassedInIntervalInPercent, setTimePassedInIntervalInPercent] = useState(0);

  const timerConf = {
    numberBetweenOneAndThree: Math.floor(Math.random() * 3) + 1,
    interval: 3000
  };

  const prevTimestamp = new Date(statsSummary?.previous.timestamp);
  const currTimestamp = new Date(statsSummary?.timestamp);

  useEffect(() => {
    if (municipality && typeof municipality.signups === 'number') {
      setPeopleCount(municipality.signups);
    } else if (statsSummary && statsSummary.previous) {
      initializeTicker();
    }
  }, [statsSummary]);

  useEffect(() => {
    let updateTickerTimeout;
    // Set timer in a range of 3 to 9 seconds
    const randomTimer = timerConf.numberBetweenOneAndThree * timerConf.interval;
    if (timerIsReady && timePassedInIntervalInPercent <= 1) {
      // Set timeout to display data in the Ticker Comp
      console.log('Timer set to:', randomTimer, 'ms');
      updateTickerTimeout = setTimeout(() => {
        updateTicker();
      }, randomTimer);
    }
    // Clear Timeout when done
    return () => {
      clearTimeout(updateTickerTimeout);
    }
  }, [updatedTimes]);

  const diffSeconds = (dt2, dt1) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return Math.abs(Math.round(diff));
  };

  const diffCount = (c2, c1) => {
    let diff = c1 - c2;
    return diff;
  };

  const initializeTicker = () => {
    setPeopleCount(statsSummary.previous.users);
    setMunicipalityCount(statsSummary.previous.municipalities);
    updateTicker();
    console.log('##### -> TICKER INITIALIZED -> TIMESTAMP', statsSummary.timestamp);
    setTimeout(() => {
      setTimerIsReady(true);
      setUpdatedTimes(updatedTimes + 1);
      console.log('Updated', updatedTimes, 'times');
    }, 500);
  };

  const updateTicker = () => {
    // prepare variables for calulation of time passed in percent
    const currTime = new Date();
    const intervalLength = diffSeconds(prevTimestamp, currTimestamp);
    const timePassed = diffSeconds(currTimestamp, currTime);
    const calcTimePassed = 1 - ((intervalLength - timePassed) / intervalLength);
    console.log(intervalLength, timePassed, calcTimePassed);
    setTimePassedInIntervalInPercent(calcTimePassed);
    console.log('Percent of Interval passed:', timePassedInIntervalInPercent);
    // Get users and calculate users won in the last 15 minutes
    const prevCountUsers = statsSummary?.previous?.users;
    const currCountUsers = statsSummary?.users;
    const usersWonInInterval = diffCount(prevCountUsers, currCountUsers);
    const usersToAdd = Math.floor(usersWonInInterval * timePassedInIntervalInPercent);
    console.log('Users to add:', usersToAdd);
    // Get municiplaities and calculate users won in the last 15 minutes
    const prevCountMunicipalities = statsSummary?.previous?.municipalities;
    const currCountMunicipalities = statsSummary?.municipalities;
    const municipalitiesWonInInterval = diffCount(prevCountMunicipalities, currCountMunicipalities);
    const municipalitiesToAdd = Math.floor(municipalitiesWonInInterval * timePassedInIntervalInPercent);
    console.log('Municipalities to add:', municipalitiesToAdd);

    if (timePassedInIntervalInPercent <= 1) {
      console.log('Setting Users to:', prevCountUsers + usersToAdd);
      setPeopleCount(prevCountUsers + usersToAdd);
      console.log('Setting Municipalities to:', prevCountUsers + usersToAdd);
      setMunicipalityCount(prevCountMunicipalities + municipalitiesToAdd);
      setTimeout(() => {
        setUpdatedTimes(updatedTimes + 1);
      }, 1000);
    } else {
      refreshContextStats();
      setTimeout(() => {
        initializeTicker();
      }, 2000);
    }
  };

  // // MOCKUP data for Ticker testing
  // const getTestDateMinusMiutes = (date, min) => {
  //   let dt = new Date(date);
  //   dt.setMinutes(dt.getMinutes() - min);
  //   return dt.toISOString();
  // };
  // const mockStatsSummary = {
  //   municipalities: 4488,
  //   previous: {
  //     municipalities: 4388,
  //     timestamp: getTestDateMinusMiutes(new Date(), 17),
  //     users: 219430
  //   },
  //   timestamp: getTestDateMinusMiutes(new Date(), 2),
  //   users: 219830
  // };
  // const [statsSummary, setStatsSummary] = useState();
  // useEffect(() => {
  //   setStatsSummary(mockStatsSummary);
  // }, []);

  if (!municipality) {
    return (
      <TickerDisplay
        prefixText="Schon"
        highlight1={peopleCount}
        inBetween1="Menschen in"
        // inBetween2="in"
        highlight2={municipalityCount}
        suffixHighlight2="Orten sind dabei."
        tickerDescription={tickerDescription}
      />
    );
  } else {
    return (
      <TickerDisplay
        prefixText="Schon"
        highlight1={peopleCount}
        inBetween1=""
        inBetween2="Menschen holen Grundeinkommen nach"
        highlight2={municipality?.name}
        suffixHighlight2=""
      />
    );
  }
};

const TickerDisplay = ({
  prefixText,
  highlight1,
  inBetween1,
  inBetween2,
  highlight2,
  suffixHighlight2,
  tickerDescription,
}) => {
  return (
    <section className={s.contentContainer}>
      <div className={s.slotMachine}>
        <div className={s.counterContainer}>
          {prefixText && (
            <span
              className={cN(
                s.counterLabelSlotMachine,
                s.counterLabelMarginRight,
                s.bold
              )}
            >
              {prefixText}{' '}
            </span>
          )}

          <div className={s.numbersContainer}>
            <Reel text={highlight1.toString()} />
          </div>

          {inBetween1 && (
            <h2
              className={cN(
                s.counterLabelSlotMachine,
                s.counterLabelMarginLeft
              )}
            >
              {inBetween1}
            </h2>
          )}
        </div>

        <div className={cN(s.counterContainer, s.alignRight)}>
          {typeof highlight2 !== 'string' && (
            <>
              {inBetween2 && (
                <h2
                  className={cN(
                    s.counterLabelSlotMachine,
                    s.counterLabelMarginRight
                  )}
                >
                  {inBetween2}
                </h2>
              )}
              <div className={s.numbersContainer}>
                <Reel text={highlight2.toString()} />
              </div>

              {suffixHighlight2 && (
                <h2
                  className={cN(
                    s.counterLabelSlotMachine,
                    s.counterLabelMarginLeft
                  )}
                >
                  {suffixHighlight2}
                </h2>
              )}
            </>
          )}
          {typeof highlight2 === 'string' && (
            <>
              <h2
                className={cN(
                  s.counterLabelSlotMachine,
                  s.counterLabelMarginRight,
                  s.noMarginTop
                )}
              >
                {inBetween2 && <span>{inBetween2} </span>}
                <span className={s.highlightHeadline}>{highlight2}</span>
                {/* TODO: implement point */}
                {/* {suffixHighlight2 && <span>{suffixHighlight2}</span>} */}
              </h2>
            </>
          )}
        </div>
        {tickerDescription && (
          <p className={s.actionText}>{tickerDescription}</p>
        )}
      </div>
    </section>
  );
};
