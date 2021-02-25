import React from 'react';

import { Ticker } from './Ticker';
import { TickerMunicipality } from './Ticker/TickerMunicipality';
import { SignupButtonAndTile } from './SignupButtonAndTile';
import { InlineLinkButton } from '../Forms/Button';

import s from './style.module.less';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  console.log();

  return (
    <>
      {document.location.pathname.split('/')[1] === 'gemeinden' ?
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
