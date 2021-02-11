import React from 'react';
import s from './style.module.less';

import { Ticker } from './Ticker';
import { MunicipalitySearch } from './MunicipalitySearch';
import SignUp from '../Forms/SignUp';

export const TickerToSignup = ({
  tickerDescription: { tickerDescription },
}) => {
  console.log('rendered');
  return (
    <>
      <Ticker tickerDescription={tickerDescription} />
      <MunicipalitySearch />
      <SignUp illustration={false} />
    </>
  );
};
