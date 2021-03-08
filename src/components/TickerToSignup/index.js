import React from 'react';

import { Ticker } from './Ticker';
import { SignupButtonAndTile } from './SignupButtonAndTile';
import { InlineLinkButton } from '../Forms/Button';

import s from './style.module.less';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {

  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  return (
    <>
      <Ticker tickerDescription={tickerDescription} />

      <SignupButtonAndTile className={s.centerButton} />
      <div className={s.moreInfo}>
        <InlineLinkButton href="#info">Mehr erfahren</InlineLinkButton>
      </div>
    </>
  );
};
