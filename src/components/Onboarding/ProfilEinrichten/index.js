import React from 'react';
import gS from '../style.module.less';

export const ProfilEinrichten = ({ userData, userId }) => {
  return (
    <>
      <section className={gS.pageContainer}>
        <h1>Du hast es geschafft!</h1>
        <p className={gS.descriptionTextLarge}>Schön, dass du an Board bist!</p>
        <p className={gS.descriptionTextLarge}>
          Lade jetzt ein Profilbild hoch, um dich mit anderen Expeditionsmitgliedern{' '}
          zu verknüpfen.
        </p>
      </section>
    </>
  );
};