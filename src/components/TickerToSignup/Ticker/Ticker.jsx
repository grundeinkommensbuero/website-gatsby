import React, { useContext } from 'react';

import { MunicipalityContext } from '../../context/Municipality';

import TickerMainWrapper from './TickerMainWrapper';
import { TickerMunicipalityWrapper } from './Ticker/TickerMunicipalityWrapper';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const { municipality } = useContext(MunicipalityContext);
  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  return (
    <>
      {municipality?.ags ? (
        <TickerMunicipalityWrapper tickerDescription={tickerDescription} />
      ) : (
        <TickerMainWrapper tickerDescription={tickerDescription} />
      )}
    </>
  );
};
