import React, { useContext } from 'react';

import { Ticker } from './Ticker';
import { SignupButtonAndTile } from './SignupButtonAndTile';
import { MunicipalitySearch } from '../Municipality/MunicipalitySearch';
import { MunicipalityContext } from '../../context/Municipality';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const tickerDescription = tickerDescriptionObject?.tickerDescription;
  const { municipality } = useContext(MunicipalityContext);
  return (
    <>
      <Ticker tickerDescription={tickerDescription} />
      {!municipality && <MunicipalitySearch searchTitle="Finde deinen Ort:" />}
      <SignupButtonAndTile />
    </>
  );
};
