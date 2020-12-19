import React from 'react';
import gS from '../style.module.less';
import { ShareButtonRow } from './ShareButtonRow';
import s from './style.module.less';

export const Teilen = () => {
  return (
    <section className={gS.pageContainer}>
      <h1>Vielen Dank für deinen Einsatz!</h1>
      <p className={gS.descriptionTextLarge}>
        Erzähl auch anderen Menschen in DEINER GEMEINDE von der Expedition.{' '}
          Je mehr Menschen wir erreichen, desto besser stehen die Chancen auf{' '}
          das Grundeinkommen in DEINER GEMEINDE!
      </p>
      <div className={s.previewContainer}>
        <img
          className={s.imagePlaceholder}
          src={"https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png"}
          alt="PlaceholderImage"
        />
      </div>
      <ShareButtonRow />
    </section>
  );
};