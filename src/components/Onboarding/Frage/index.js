import React from 'react';
import s from './style.module.less';
import gS from '../style.module.less';

export const Frage = ({ userData }) => {

  return (
    <section className={gS.pageContainer}>

      <h2 className={gS.moduleTitle}>Deine Frage ans Grundeinkommen</h2>
      <p className={gS.descriptionTextLarge}>Hallo {userData.username}!</p>
      <p className={gS.descriptionTextLarge}>
        Was erhoffst du dir vom Grundeinkommen? Welche Fragen soll der Modellversuch beantworten?
      </p>


    </section>
  );
};