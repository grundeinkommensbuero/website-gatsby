import * as s from './style.module.less';
import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/Modal';
import Onboarding from '../../components/Onboarding';

export const OnboardingModalContext = React.createContext();

export const OnboardingModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(s.bodyOverlayOpen, showModal);
  }, [showModal]);

  return (
    <OnboardingModalContext.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Onboarding />
      </Modal>
      {children}
    </OnboardingModalContext.Provider>
  );
};
