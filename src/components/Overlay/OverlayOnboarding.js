import React, { useContext } from 'react';
import * as s from './style.module.less';
import { OnboardingOverlayContext } from '../../context/Overlay/OnboardingOverlay';

import Modal from 'react-overlays/Modal';
import loadable from '@loadable/component';
const Onboarding = loadable(() => import('../Onboarding'));

export const OnboardingOverlay = () => {
  const { overlayOpen, setOverlayOpen } = useContext(OnboardingOverlayContext);
  const renderBackdrop = () => <div className={s.backdrop} />;

  return (
    <>
      {overlayOpen ? (
        <div className={s.onboardingContainer}>
          <Modal
            className={s.modalStyle}
            show={overlayOpen}
            onHide={() => setOverlayOpen(false)}
            renderBackdrop={renderBackdrop}
            aria-labelledby="modal-label"
          >
            <Onboarding setOverlayOpen={setOverlayOpen} />
          </Modal>
        </div>
      ) : null}
    </>
  );
};
