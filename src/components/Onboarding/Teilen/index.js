import React from 'react';
import gS from '../style.module.less';

export const Teilen = ({ userData, userId }) => {
  return (
    <section className={gS.pageContainer}>
      <h1>Vielen Dank für deinen Einsatz!</h1>
      <p className={gS.descriptionTextLarge}>
        Erzähl auch anderen Menschen in DEINER GEMEINDE von der Expedition.{' '}
          Je mehr Menschen wir erreichen, desto besser stehen die Chancen auf{' '}
          das Grundeinkommen in DEINER GEMEINDE!
        </p>
    </section>
  );
};