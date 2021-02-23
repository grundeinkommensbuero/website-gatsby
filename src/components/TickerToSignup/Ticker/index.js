import React, { useContext, useState, useEffect } from 'react';
import cN from 'classnames';
import Reel from 'react-reel';
import s from './style.module.less';
import { MunicipalityContext } from '../../../context/Municipality';

import './reelstyle.less';

export const Ticker = ({ tickerDescription }) => {
  const { municipality } = useContext(MunicipalityContext);
  const [peopleCount, setPeopleCount] = useState(0);
  const [municipalityCount, setMunicipalityCount] = useState(0);

  // MOCKUP data for Ticker testing
  const getTestDateMinusMiutes = (date, min) => {
    let dt = new Date(date);
    dt.setMinutes(dt.getMinutes() - min);
    return dt.toISOString();
  };
  const mockStatsSummary = {
    municipalities: 4488,
    previous: {
      municipalities: 4388,
      timestamp: getTestDateMinusMiutes(new Date(), 17),
      users: 219430
    },
    timestamp: getTestDateMinusMiutes(new Date(), 2),
    users: 219830
  };
  const [statsSummary, setStatsSummary] = useState();
  useEffect(() => {
    setStatsSummary(mockStatsSummary);
  }, []);

  useEffect(() => {
    if (municipality && typeof municipality.signups === 'number') {
      setPeopleCount(municipality.signups);
    } else {
      const numOfUsers = statsSummary?.previous?.users || 0;
      const numOfMunicipalities = statsSummary?.previous?.municipalities || 0;
      setPeopleCount(numOfUsers);
      setMunicipalityCount(numOfMunicipalities);
    }
  }, [statsSummary]);

  useEffect(() => {
    // Set timer in a range of 3 to 9 seconds
    const randomTimer = (Math.floor(Math.random() * 3) + 1) * 3000;
    // prepare variables for calulation of time passed in percent
    const prevTimestamp = new Date(statsSummary?.previous?.timestamp);
    const currTimestamp = new Date(statsSummary?.timestamp);
    const currTime = new Date();
    const intervalLength = diffSeconds(prevTimestamp, currTimestamp);
    const timePassed = diffSeconds(currTimestamp, currTime);
    const timePassedInIntervalInPercent = 1 - ((intervalLength - timePassed) / intervalLength);
    console.log('Percent of Interval passed:', timePassedInIntervalInPercent);
    // Get userdata and calculate users won in the last 15 minutes
    const prevCountUsers = statsSummary?.previous?.users;
    const currCountUsers = statsSummary?.users;
    const usersWonInInterval = diffCount(prevCountUsers, currCountUsers);
    const usersToAdd = Math.round(usersWonInInterval * timePassedInIntervalInPercent);
    console.log('Users to add to count:', usersToAdd);
    console.log('Timer set to:', randomTimer, 'ms');
    // Set timeout to display data in the Ticker Comp
    const fireCounter = setTimeout(() => {
      console.log('Fire! Set Users to:', prevCountUsers + usersToAdd);
      setPeopleCount(prevCountUsers + usersToAdd);
    }, randomTimer);
    // Clear Timeout when done
    return () => {
      clearTimeout(fireCounter);
    }
  });

  const diffSeconds = (dt2, dt1) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return Math.abs(Math.round(diff));
  };

  const diffCount = (c2, c1) => {
    let diff = c1 - c2;
    return diff;
  };

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
