import React, { useContext } from 'react';

import { MunicipalityContext } from '../../context/Municipality';

import { SignupButtonAndTile } from './SignupButtonAndTile';
import { InlineLinkButton } from '../Forms/Button';
import * as s from './style.module.less';

const Ticker = React.lazy(() => import('./Ticker'));
const TickerMunicipality = React.lazy(() =>
  import('./Ticker/TickerMunicipality')
);

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const { municipality } = useContext(MunicipalityContext);
  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  return (
    <>
      {municipality?.ags ? (
        <React.Suspense fallback={<div>Lade...</div>}>
          <TickerMunicipality tickerDescription={tickerDescription} />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<div>Lade...</div>}>
          <Ticker tickerDescription={tickerDescription} />
        </React.Suspense>
      )}

      <SignupButtonAndTile className={s.centerButton} />
      <div className={s.moreInfo}>
        <InlineLinkButton href="#info">Mehr erfahren</InlineLinkButton>
      </div>
    </>
  );
};
