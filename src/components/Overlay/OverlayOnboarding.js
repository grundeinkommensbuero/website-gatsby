import React from 'react';
import * as s from './style.module.less';
import { OnboardingOverlayContext } from '../../context/Overlay/OnboardingOverlay';
import { Onboarding } from '../Onboarding';
import cN from 'classnames';

export const OnboardingOverlay = ({ ...props }) => {
  return (
    <OnboardingOverlayContext.Consumer>
      {({ overlayOpen, setOverlayOpen }) => (
        <>
          {overlayOpen ? (
            <div className={s.blurryBackground}>
              <div
                className={cN(s.onboardingContainer, s.backdropBlur)}
                role="dialog"
                aria-describedby="dialogTitle"
              >
                <div className={s.body}>
                  <Onboarding setOverlayOpen={setOverlayOpen} />
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </OnboardingOverlayContext.Consumer>
  );
};
