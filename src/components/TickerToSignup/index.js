import React, { useContext } from 'react';
// import s from './style.module.less';

import { Ticker } from './Ticker';
import { MunicipalitySearch } from './MunicipalitySearch';
import { Button } from '../Forms/Button';
// import { ProfileTile } from '../Profile/ProfileTile';

import { MunicipalityContext } from '../../context/Municipality';
import { OnboardingOverlayContext } from '../../context/Overlay/OnboardingOverlay';

import { OnboardingOverlay } from '../Overlay/OverlayOnboarding';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const { isMunicipality } = useContext(MunicipalityContext);
  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  // State of onboarding overlay
  const { setOverlayOpen } = useContext(OnboardingOverlayContext);

  return (
    <>
      <OnboardingOverlay />

      <Ticker tickerDescription={tickerDescription} />
      {isMunicipality ? (
        <Button onClick={() => setOverlayOpen(true)}>Ich bin dabei</Button>
      ) : (
          <MunicipalitySearch />
        )}
    </>
  );
};
