import React from 'react';
import gS from '../style.module.less';
import { ShareButtonRow } from './ShareButtonRow';

export const Teilen = ({ compIndex, setCurrentElementByIndex }) => {
  return (
    <section className={gS.pageContainer}>
      <h3 className={gS.moduleTitle}>Hol so viele Menschen dazu, wie du kannst</h3>
      <p className={gS.descriptionTextLarge}>
        Je mehr Menschen du zur Expedition einlädst, desto besser stehen die Chancen, dass{' '}
        GEMEINDE bald Grundeinkommen erforscht. Wir müssen insgesammt XXX Menschen werden!
      </p>

      <ShareButtonRow />

      <p className={gS.descriptionTextLarge}>
        Klicke auf einen der Buttons, um eine Vorschau deiner persönlichen Kachel zum Teilen{' '}
        zu sehen!
      </p>
      {/* <div className={s.previewContainer}>
        <img
          className={s.imagePlaceholder}
          src={"https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png"}
          alt="PlaceholderImage"
        />
      </div> */}

      <div className={gS.fullWidthFlex}>
        <span
          aria-hidden="true"
          className={gS.linkLikeFormatted}
          onClick={() => setCurrentElementByIndex(compIndex + 1)}>
          Überspringen
            </span>
      </div>
    </section>
  );
};