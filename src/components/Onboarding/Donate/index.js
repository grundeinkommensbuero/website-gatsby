import React, { useState } from 'react';
import gS from '../style.module.less';
import s from './style.module.less';
import DonationForm from '../../Forms/DonationForm';

export const Donate = ({ userData, userId, updateUser, updateCustomUserData, compIndex, setCurrentElementByIndex, municipality }) => {
  const [showDonationForm, setShowDonationForm] = useState(false);

  const saveDonationReaction = type => {
    const existingReactions = [...userData?.store?.donationOnboardingReaction];
    const reactionForMunicipality = {
      ags: municipality.ags,
      reaction: type,
      timestamp: new Date()
    }
    // Find and update reaction for ags or add a new one
    const reactionIndex = existingReactions.findIndex(el => el.ags === municipality.ags);
    if (reactionIndex !== -1) {
      existingReactions[reactionIndex] = reactionForMunicipality;
    } else {
      existingReactions.push(reactionForMunicipality);
    };
    // Save updated Reaction Array
    updateUser({
      userId: userId,
      store: {
        donationOnboardingReaction: existingReactions
      }
    });
    // Refresh local userData Object
    setTimeout(() => {
      updateCustomUserData();
    }, 500);
  };


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
              onClick={() => {
                saveDonationReaction('remindMeLater');
                setCurrentElementByIndex(compIndex + 1)
              }}>
              Später erinnern
            </div>
          </div>

          <div className={gS.fullWidthFlex}>
            <span
              aria-hidden="true"
              className={gS.linkLikeFormatted}
              onClick={() => {
                saveDonationReaction('skipedDonation');
                setCurrentElementByIndex(compIndex + 1)
              }}>
              Überspringen
            </span>
          </div>

        </>}
    </section>
  );
};