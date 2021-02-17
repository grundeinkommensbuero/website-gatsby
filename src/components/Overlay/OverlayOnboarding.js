import React from 'react';
import s from './style.module.less';
import { OnboardingOverlayContext } from '../../context/Overlay/OnboardingOverlay';
import { Onboarding } from '../Onboarding'

export const OnboardingOverlay = ({ ...props }) => {
  return (
    <OnboardingOverlayContext.Consumer>
      {({ overlayOpen, setOverlayOpen }) => (
        <>
          {overlayOpen ?
            <div className={s.onboardingContainer} role="dialog" aria-describedby="dialogTitle">
              <div className={s.body}>
                <Onboarding setOverlayOpen={setOverlayOpen} />
              </div>
            </div> : null}
        </>
      )}
    </OnboardingOverlayContext.Consumer>
  );
};
