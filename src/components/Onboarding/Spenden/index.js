import React from 'react';
import gS from '../style.module.less';
import DonationForm from '../../Forms/DonationForm';

export const Spenden = ({ userData, userId }) => {
  return (
    <section className={gS.pageContainer}>
      <h2 className={gS.moduleTitle}>Unterstütze uns!</h2>
      <p className={gS.descriptionTextLarge}>
        Um Städte und Gemeinden in ganz Deutschland erreichen zu können, sind{' '}
        wir auf eine gesicherte Finanzierung angewiesen. Ein kleiner monatlicher{' '}
        Beitrag von dir hilft uns enorm!
      </p>
      <p className={gS.descriptionTextLarge}>
        Unterstütze uns mit
      </p>
      <DonationForm theme={{}} />
    </section>
  );
};