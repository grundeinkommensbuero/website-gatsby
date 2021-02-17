import React, { useContext, useState, useEffect } from 'react';
import cN from 'classnames';
import Reel from 'react-reel';
import s from './style.module.less';
import { MunicipalityContext } from '../../../context/Municipality';

import './reelstyle.less';

export const Ticker = ({ tickerDescription }) => {
  const { isMunicipality, municipality } = useContext(MunicipalityContext);
  const [peopleCount, setPeopleCount] = useState(3592);
  const [municipalityCount, setMunicipalityCount] = useState(43);
  console.log(municipality);

  useEffect(() => {
    if (municipality && typeof municipality.signups === 'number') {
      setPeopleCount(municipality.signups);
    } else {
      setPeopleCount(3592);
    }
  }, [municipality]);

  useEffect(() => {
    const peopleRandom = (Math.floor(Math.random() * 9) + 1) * 500;
    const firePeopleCounter = setTimeout(() => {
      setPeopleCount(peopleCount + 1);
    }, peopleRandom);

    const municipalityRandom = (Math.floor(Math.random() * 2) + 1) * 2500;
    const fireMunicipalityCounter = setTimeout(() => {
      setMunicipalityCount(municipalityCount + 1);
    }, municipalityRandom);

    return () => {
      clearTimeout(firePeopleCounter);
      clearTimeout(fireMunicipalityCounter);
    };
  });

  if (!isMunicipality) {
    return (
      <TickerDisplay
        prefixText=""
        highlight1={peopleCount}
        inBetween1="Menschen"
        inBetween2="in"
        highlight2={municipalityCount}
        suffixHighlight2="Orten"
        explanation="lassen das Grundeinkommen in Deutschland Realität werden."
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
        highlight2={municipality.name}
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
  explanation,
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
          <Reel text={highlight1.toString()} />

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
              <Reel text={highlight2.toString()} />
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
                <span className="react-reel__reel">{highlight2}</span>
                {/* TODO: implement point */}
                {/* {suffixHighlight2 && <span>{suffixHighlight2}</span>} */}
              </h2>
            </>
          )}
        </div>
        {explanation && <h2 className={s.actionTextBig}>{explanation}</h2>}
        {tickerDescription && (
          <p className={s.actionText}>{tickerDescription}</p>
        )}
      </div>
    </section>
  );
};
