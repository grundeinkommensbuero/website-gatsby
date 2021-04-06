import React, { useContext } from 'react';
import { OnboardingOverlay } from '../../Overlay/OverlayOnboarding';
import { OnboardingOverlayContext } from '../../../context/Overlay/OnboardingOverlay';
import * as s from './style.module.less';

import { Button } from '../../Forms/Button';

export const SignUpButton = ({ children, className }) => {
  const { setOverlayOpen } = useContext(OnboardingOverlayContext);

  return (
    <>
      <OnboardingOverlay />
      <div className={s.signUpButton}>
        <Button className={className} onClick={() => setOverlayOpen(true)}>
          {children}
        </Button>
      </div>
    </>
  );
};
