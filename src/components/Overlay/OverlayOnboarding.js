import React from 'react';
import * as s from './style.module.less';
import { OnboardingOverlayContext } from '../../context/Overlay/OnboardingOverlay';
import cN from 'classnames';
import loadable from '@loadable/component';
const Onboarding = loadable(() => import('../Onboarding'));

export const OnboardingOverlay = ({ ...props }) => {
  return (
    <OnboardingOverlayContext.Consumer>
      {({ overlayOpen, setOverlayOpen }) => (
        <>
          {overlayOpen ? (
            <div>
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
