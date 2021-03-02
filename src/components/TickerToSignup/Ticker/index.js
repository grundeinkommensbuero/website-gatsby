import React, { useContext, useState, useEffect } from 'react';
import cN from 'classnames';
import Reel from 'react-reel';
import s from './style.module.less';
import { MunicipalityContext } from '../../../context/Municipality';
import * as u from './utils';

import './reelstyle.less';

export const Ticker = ({ tickerDescription }) => {
  const { municipality, statsSummary, refreshContextStats } = useContext(MunicipalityContext);
  const [timerIsReady, setTimerIsReady] = useState(false);
  const [peopleCount, setPeopleCount] = useState(0);
  const [municipalityCount, setMunicipalityCount] = useState(0);
  const [updatedTimes, setUpdatedTimes] = useState(0);
  const [timePassedInIntervalInPercent, setTimePassedInIntervalInPercent] = useState(0);

  const prevTimestamp = new Date(statsSummary?.previous.timestamp);
  const currTimestamp = new Date(statsSummary?.timestamp);

  useEffect(() => {
    if (municipality && typeof municipality.signups === 'number') {
      setPeopleCount(municipality.signups);
    } else if (statsSummary && statsSummary.previous) {
      u.calcTickerValues({ prevTimestamp, currTimestamp, setTimePassedInIntervalInPercent });
      setTimerIsReady(true);
      setUpdatedTimes(updatedTimes + 1);
      console.log('Updated', updatedTimes, 'times');
    }
  }, [statsSummary]);

  useEffect(() => {
    let updateTickerTimeout;
    const timerConf = {
      numberBetweenOneAndThree: Math.floor(Math.random() * 3) + 1,
      interval: 3000
    };
    // Set timer in a range of 3 to 9 seconds
    const randomTimer = timerConf.numberBetweenOneAndThree * timerConf.interval;
    if (timerIsReady && timePassedInIntervalInPercent <= 1) {
      // Set timeout to display data in the Ticker Comp
      console.log('Timer set to:', randomTimer, 'ms');
      updateTickerTimeout = setTimeout(() => {
        u.calcTickerValues({ prevTimestamp, currTimestamp, setTimePassedInIntervalInPercent });
      }, randomTimer);
    }
    // Clear Timeout when done
    return () => {
      clearTimeout(updateTickerTimeout);
    }
  }, [updatedTimes]);

  useEffect(() => {
    if (statsSummary && statsSummary.previous) {
      u.updateTicker({
        statsSummary,
        timePassedInIntervalInPercent,
        setPeopleCount,
        setMunicipalityCount,
        updatedTimes,
        setUpdatedTimes,
        refreshContextStats
      });
    }
  }, [timePassedInIntervalInPercent]);

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
            <Reel text={u.numberWithDots(highlight1)} />
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
                <Reel text={u.numberWithDots(highlight2)} />
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
