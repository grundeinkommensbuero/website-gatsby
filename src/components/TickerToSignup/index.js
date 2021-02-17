import React from 'react';

import { Ticker } from './Ticker';
import { SignupButtonAndTile } from './SignupButtonAndTile';
import { MunicipalitySearch } from './MunicipalitySearch';

// import { getCountrySpecifications } from 'ibantools';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  return (
    <>
      <Ticker tickerDescription={tickerDescription} />
      <MunicipalitySearch />
      <SignupButtonAndTile />
    </>
  );
};
