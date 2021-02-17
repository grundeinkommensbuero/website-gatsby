import React, { useContext } from 'react';
// import s from './style.module.less';

import { Ticker } from './Ticker';
import { MunicipalitySearch } from './MunicipalitySearch';
import SignUp from '../Forms/SignUp';
import { ProfileTile } from '../Profile/ProfileTile';

import { MunicipalityContext } from '../../context/Municipality';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const { isMunicipality } = useContext(MunicipalityContext);
  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  return (
    <>
      <Ticker tickerDescription={tickerDescription} />
      {isMunicipality ? (
        <>
          <SignUp illustration={false} showSignedInMessage={false} />
        </>
      ) : (
        <MunicipalitySearch />
      )}
    </>
  );
};
