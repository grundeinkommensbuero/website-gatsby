import React, { useContext } from 'react';

import { MunicipalityContext } from '../../context/Municipality';

import { Ticker } from './Ticker';
import { TickerMunicipality } from './Ticker/TickerMunicipality';
import { SignupButtonAndTile } from './SignupButtonAndTile';
import { InlineLinkButton } from '../Forms/Button';

import s from './style.module.less';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const { municipality } = useContext(MunicipalityContext);
  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  return (
    <>
      {municipality?.ags ?
        <TickerMunicipality tickerDescription={tickerDescription} /> :
        <Ticker tickerDescription={tickerDescription} />
      }

      <SignupButtonAndTile className={s.centerButton} />
      <div className={s.moreInfo}>
        <InlineLinkButton href="#info">Mehr erfahren</InlineLinkButton>
      </div>
    </>
  );
};
