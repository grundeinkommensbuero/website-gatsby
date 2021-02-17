import React, { useContext } from 'react';
import s from './style.module.less';

import { Ticker } from './Ticker';
import { MunicipalitySearch } from './MunicipalitySearch';
import { Button } from '../Forms/Button';
// import { ProfileTile } from '../Profile/ProfileTile';

import { MunicipalityContext } from '../../context/Municipality';
import { OnboardingOverlayContext } from '../../context/Overlay/OnboardingOverlay';

import { OnboardingOverlay } from '../Overlay/OverlayOnboarding';
import { getCountrySpecifications } from 'ibantools';

export const TickerToSignup = ({
  tickerDescription: tickerDescriptionObject,
}) => {
  const { isMunicipality, municipality } = useContext(MunicipalityContext);
  const tickerDescription = tickerDescriptionObject?.tickerDescription;

  // State of onboarding overlay
  const { setOverlayOpen } = useContext(OnboardingOverlayContext);

  return (
    <>
      <OnboardingOverlay />

      <Ticker tickerDescription={tickerDescription} />
      {isMunicipality ? (
        <Button className={s.signUpCTA} onClick={() => setOverlayOpen(true)}>
          Jetzt in {municipality.name} anmelden!
        </Button>
      ) : (
          <MunicipalitySearch />
        )}
    </>
  );
};
