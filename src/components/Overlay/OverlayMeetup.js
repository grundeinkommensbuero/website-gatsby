import React, { useContext } from 'react';
import * as s from './style.module.less';
import { MeetupOverlayContext } from '../../context/Overlay/MeetupOverlay';

import Modal from 'react-overlays/Modal';
import { CreateMeetup } from '../Forms/Meetup';
import closeIcon from './close-icon.svg';

export const MeetupOverlay = () => {
  const { overlayOpen, setOverlayOpen, type, mapConfig, setCreatedMeetup } =
    useContext(MeetupOverlayContext);
  const renderBackdrop = () => <div className={s.backdrop} />;

  return (
    <>
      {overlayOpen ? (
        <div className={s.meetupContainer}>
          <Modal
            className={s.modalStyle}
            show={overlayOpen}
            onHide={() => setOverlayOpen(false)}
            renderBackdrop={renderBackdrop}
            aria-labelledby="modal-label"
          >
            <>
              <button
                aria-label="Schließen"
                className={s.lonelyCloseButton}
                onClick={() => setOverlayOpen(false)}
              >
                <img
                  className={s.innerCloseIcon}
                  src={closeIcon}
                  alt="Modal schließen"
                />
              </button>
              <div className={s.meetupContent}>
                <CreateMeetup
                  type={type}
                  mapConfig={mapConfig}
                  setCreatedMeetup={setCreatedMeetup}
                  setOverlayOpen={setOverlayOpen}
                />
              </div>
            </>
          </Modal>
        </div>
      ) : null}
    </>
  );
};
