import React, { useState } from 'react';
import gS from '../style.module.less';
import s from './style.module.less';
import DonationForm from '../../Forms/DonationForm';
// import { Button } from '../../Forms/Button';

export const Donate = ({ userData, userId, compIndex, setCurrentElementByIndex, municipality }) => {
  const [showDonationForm, setShowDonationForm] = useState(false);

  return (
    <section className={gS.pageContainer}>
      {showDonationForm ?
        <>
          <h3 className={gS.moduleTitle}>Wie möchtest du spenden?</h3>
          <DonationForm theme={{}} />
          <p className={gS.descriptionTextLarge}>
            Du bekommst eine Spendenbescheinigung über den gesamten Jahresbetrag.
          </p>
        </>
        : <>
          <h3 className={gS.moduleTitle}>Mach die Expedition mit deiner Spende möglich</h3>
          <p className={gS.descriptionTextLarge}>
            Die Expedition ist gemeinnützig und spendenfinanziert. Sie gibt es nur, wenn alle{' '}
            etwas in die Reisekasse legen. Spende jetzt, damit wir gemeinsam das Grundeinkommen{' '}
            in {municipality.name} und ganz Deutschland Wirklichkeit werden lassen!
          </p>

          {/* <div className={s.donationButtonRow}>
            <Button
              className={gS.nextButton}
              onClick={() => setShowDonationForm(true)}>
              Jetzt spenden
          </Button><br />

            <Button
              className={gS.nextButton}>
              Später erinnern
          </Button>
          </div> */}

          <div className={gS.buttonRow}>
            <div
              aria-hidden="true"
              className={s.engagementOption}
              onClick={() => setShowDonationForm(true)}>
              Jetzt spenden
            </div>

            <div
              aria-hidden="true"
              className={s.engagementOption}
              onClick={() => setCurrentElementByIndex(compIndex + 1)}>
              Später erinnern
            </div>
          </div>

          <div className={gS.fullWidthFlex}>
            <span
              aria-hidden="true"
              className={gS.linkLikeFormatted}
              onClick={() => setCurrentElementByIndex(compIndex + 1)}>
              Überspringen
            </span>
          </div>

        </>}
    </section>
  );
};