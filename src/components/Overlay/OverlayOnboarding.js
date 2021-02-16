import React, { useEffect } from 'react';
import s from './style.module.less';
import { OverlayContext } from '../../context/Overlay';
import { Onboarding } from '../Onboarding'

export const OnboardingOverlay = ({ isOpenInitially = true, ...props }) => {
  return (
    <OverlayContext.Consumer>
      {({ overlayOpen, toggleOverlay, setAutomaticOpenDelay }) => (
        <Overlay
          isOpen={overlayOpen}
          toggleOverlay={toggleOverlay}
          setAutomaticOpenDelay={setAutomaticOpenDelay}
          {...props}
        />
      )}
    </OverlayContext.Consumer>
  );
};

const Overlay = ({
  isOpen,
  toggleOverlay,
  delay,
  setAutomaticOpenDelay,
}) => {
  useEffect(() => {
    if (delay) {
      setAutomaticOpenDelay(delay);
    }
  }, [delay]);

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, isOpen);
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className={s.onboardingContainer} role="dialog" aria-describedby="dialogTitle">
        <div className={s.body}>
          <Onboarding toggleOverlay={toggleOverlay} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
