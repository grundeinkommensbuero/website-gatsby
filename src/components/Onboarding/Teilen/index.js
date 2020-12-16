import React from 'react';
import gS from '../style.module.less';
import { ShareButtonRow } from './ShareButtonRow';
import s from './style.module.less';

import placeholderImage from './sharing_placeholder.jpg';


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
          src={placeholderImage}
          alt="PlaceholderImage"
        />
        <div className={s.imageDescription}>
          <h1>Ich bringe das Grundeinkommen nach GEMEINDE!</h1>
          <h1>Sei auch du dabei!</h1>
        </div>
      </div>
      <ShareButtonRow />
    </section>
  );
};