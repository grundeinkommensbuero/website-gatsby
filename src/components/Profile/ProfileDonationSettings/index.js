import React, { useState, useEffect } from 'react';
import * as s from './style.module.less';
import * as gS from '../style.module.less';
import * as nS from '../ProfileNotifications/style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Button } from '../../Forms/Button';
import DonationForm from '../../Forms/DonationForm';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';
import rocketIcon from './rocket-icon.min.svg';
const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

export const ProfileDonationSettings = ({
  userId,
  userData,
  updateCustomUserData,
}) => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showDeleteDonationDialog, setShowDeleteDonationDialog] =
    useState(false);
  const [waitingForApi, setWaitingForApi] = useState(false);
  const [updateUserState, updateUser] = useUpdateUser();

  useEffect(() => {
    if (updateUserState === 'loading') {
      setWaitingForApi(true);
    }
    if (updateUserState === 'updated') {
      setTimeout(() => {
        updateCustomUserData();
        setWaitingForApi(false);
        setShowDeleteDonationDialog(false);
      }, 750);
    }
    if (updateUserState === 'error') {
      setWaitingForApi(false);
    }
  }, [updateUserState]);

  useEffect(() => {
    // Update userData to get the most recent donation state
    updateCustomUserData();
  }, []);

  const removeDonation = () => {
    updateUser({ userId: userId, donation: { cancel: true } });
  };

  const DeleteDonationDialog = () => {
    return (
      <section className={nS.newsletterCard}>
        <p className={nS.newsletterCardHeading}>
          Bist du sicher, dass du deine Spende löschen möchtest?
        </p>
        <br />
        <div className={s.revokeButtonRow}>
          <Button onClick={() => setShowDeleteDonationDialog(false)}>
            Abbrechen
          </Button>
          {!waitingForApi ? (
            <Button onClick={removeDonation}>Meine Spende löschen</Button>
          ) : (
            <span className={s.loadingMessageContainer}>
              <span className={gS.loading}></span>
              <b className={gS.loadingMsg}>Speichern</b>
            </span>
          )}
        </div>
      </section>
    );
  };

  return (
    <section className={gS.profilePageGrid}>
      <section
        className={cN(gS.editPageSection, gS.editSettings, {
          [gS.rose]: IS_BERLIN_PROJECT,
        })}
      >
        <div className={gS.backToProfile}>
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>
        <h2>Spenden-Einstellungen</h2>
        <p>
          Die Expedition ist gemeinnützig und finanziert sich ausschließlich aus
          den Spenden vieler, vieler Expeditionsmitglieder und einiger
          Stiftungen. Deine Spende macht die Expedition also erst möglich!
        </p>
        {userData &&
        userData.donations &&
        userData.donations.recurringDonation &&
        !userData.donations.recurringDonation.cancelledAt &&
        !showDonationForm ? (
          <>
            <div className={cN(s.flexContainerSimple, s.donationStatusMessage)}>
              <img
                className={s.icon}
                src={rocketIcon}
                alt="Ein Raketensymbol"
              />
              <div>
                <h3>
                  Du bist Dauerspender*in! <br />
                  Vielen Dank!
                </h3>
                <p>
                  Du spendest aktuell monatlich{' '}
                  <span className={s.donationAmountRecurring}>
                    {userData.donations.recurringDonation.amount}€
                  </span>
                </p>
              </div>
            </div>
            {!showDeleteDonationDialog ? (
              <div className={s.flexContainer}>
                <button
                  className={gS.linkLikeFormattedButton}
                  onClick={() => setShowDonationForm(true)}
                >
                  Meine Spende bearbeiten
                </button>
                <button
                  className={gS.linkLikeFormattedButton}
                  onClick={() => setShowDeleteDonationDialog(true)}
                >
                  Meine Spende löschen
                </button>
              </div>
            ) : (
              <DeleteDonationDialog />
            )}
          </>
        ) : (
          <DonationForm />
        )}
      </section>
    </section>
  );
};
