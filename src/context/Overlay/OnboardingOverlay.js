import * as s from './style.module.less';
import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/Modal';
import Onboarding from '../../components/Onboarding';

export const OnboardingOverlayContext = React.createContext();

export const OnboardingOverlayProvider = ({ children }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, overlayOpen);
  }, [overlayOpen]);

  return (
    <OnboardingOverlayContext.Provider
      value={{
        overlayOpen,
        setOverlayOpen,
      }}
    >
      <Modal showModal={overlayOpen} setShowModal={setOverlayOpen}>
        <Onboarding />
      </Modal>
      {children}
    </OnboardingOverlayContext.Provider>
  );
};
