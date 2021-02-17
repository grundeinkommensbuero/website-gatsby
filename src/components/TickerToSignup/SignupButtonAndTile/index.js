import React, { useContext } from 'react';
import AuthContext from '../../../context/Authentication';
import { MunicipalityContext } from '../../../context/Municipality';
import { useUserMunicipalityContentfulState } from '../../../hooks/Municipality/UserMunicipalityContentfulState';
import { OnboardingOverlay } from '../../Overlay/OverlayOnboarding';
import { OnboardingOverlayContext } from '../../../context/Overlay/OnboardingOverlay';

import s from './style.module.less';

import { Button } from '../../Forms/Button';
// import { ProfileTile } from '../Profile/ProfileTile';

export const SignupButtonAndTile = () => {
  const { userId, customUserData: userData } = useContext(AuthContext);
  const { municipality, isMunicipality } = useContext(MunicipalityContext);
  const {
    municipalityContentfulState,
    userContentfulState,
  } = useUserMunicipalityContentfulState();

  const { setOverlayOpen } = useContext(OnboardingOverlayContext);
  if (isMunicipality) {
    return (
      <>
        <OnboardingOverlay />

        <Button className={s.signUpCTA} onClick={() => setOverlayOpen(true)}>
          Jetzt in {municipality.name} anmelden!
        </Button>
      </>
    );
  } else {
    return <></>;
  }
};
