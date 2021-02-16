import React, { useContext } from 'react';
// import s from './style.module.less';

import { Ticker } from './Ticker';
import { MunicipalitySearch } from './MunicipalitySearch';
import SignUp from '../Forms/SignUp';

import { MunicipalityContext } from '../../context/Municipality';

export const TickerToSignup = ({
  tickerDescription: { tickerDescription },
}) => {
  const { isMunicipality } = useContext(MunicipalityContext);

  return (
    <>
      <Ticker tickerDescription={tickerDescription} />
      {isMunicipality ? (
        <SignUp illustration={false} showSignedInMessage={false} />
      ) : (
        <MunicipalitySearch />
      )}
    </>
  );
};
