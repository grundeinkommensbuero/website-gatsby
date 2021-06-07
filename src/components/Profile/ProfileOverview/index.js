import React from 'react';
import AvatarImage from '../../AvatarImage';
import SignatureStats from '../../SignatureStats';
import { formatDate } from '../../utils';
import * as s from './style.module.less';
import * as gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

export const ProfileOverview = ({ userData, signatureCountOfUser, userId }) => {
  /* list newsletters of current user as human readable string */
  const customNewsletterEnumeration = () => {
    const newsletterLabels = [];
    if (userData && userData.newsletterConsent && userData.customNewsletters) {
      if (userData.newsletterConsent.value) {
        newsletterLabels.push('Expeditions-Letter');
      }
      userData.customNewsletters.forEach(n => {
        if (n.value) {
          newsletterLabels.push(n.name);
        }
      });
    }
    return [newsletterLabels.slice(0, -1).join(', '), newsletterLabels.slice(-1)[0]].join(newsletterLabels.length < 2 ? '' : ' und ');
  }

  const getReferredUserMessage = () => {
    if (userData.referredUsers.length === 1) {
      return `Dank dir hat sich ein:e weitere User:in angemeldet!`;
    } else {
      return `Dank dir haben sich ${userData.referredUsers.length} weitere User:innen angemeldet!`;
    }
  }

  return (
    <section className={gS.profilePageGrid}>
      <Link to="stammdaten" className={cN(s.profilePageSection, s.profilePageSectionLarge)}>
        <section className={gS.userInfo}>
          <AvatarImage user={userData} className={gS.avatar} />
          <div>
            <h2
              className={cN({
                [gS.username]: userData.username
              })}
            >
              {userData.username || userData.email}
            </h2>
            <div className={gS.placeInfo}>{userData.city}</div>
            {/* Show profile edit button if own page */}
            <div className={gS.details}>
              Dabei seit dem{' '}
              {userData.createdAt && formatDate(new Date(userData.createdAt))}
            </div>
            {userData && userData.referredUsers && userData.referredUsers[0] ?
              <div className={s.referredUsersMessage}>
                {getReferredUserMessage()}
              </div> : null}
          </div>
          <div className={s.sectionLink}>
            <span>Stammdaten bearbeiten</span>
          </div>
        </section>
      </Link>

      <Link to="spenden-einstellungen" className={s.profilePageSection}>
        <section>
          <h2>Spenden-Einstellungen</h2>
          {userData && userData.donations && userData.donations.recurringDonation && userData.donations.recurringDonation.amount > 0 ?
            <h4>Du bist Dauerspender:in.<br />Vielen Dank!</h4> :
            <p>Hier kannst du deine Spende verwalten.</p>}
          <div className={s.sectionLink}>
            <span>Spendeneinstellungen ändern</span>
          </div>
        </section>
      </Link>

      <Link to="kontakt-einstellungen" className={s.profilePageSection}>
        <section>
          <h2>Newsletter & Kontakt</h2>
          {
            customNewsletterEnumeration().length > 0 ?
              <>
                <p>Du erhältst folgende Newsletter: </p>
                <p>{customNewsletterEnumeration()}</p>
              </> :
              <p>Du erhältst keinen Newsletter von uns.</p>
          }
          <div className={s.sectionLink}>
            <span>Einstellungen ändern</span>
          </div>
        </section>
      </Link>

      {/* {signatureCountOfUser && (
        <a className={cN(s.profilePageSection, s.profilePageSectionLarge)}
          href={`/${signatureCountOfUser.mostRecentCampaign
            ? SELF_SCAN_SLUGS[
            signatureCountOfUser.mostRecentCampaign.state
            ]
            : 'qr/b' // if user has no recent campaign default is just berlin
            }?userId=${userId}`}
        >
          <section className={s.signaturesSection}>
            <h2>Eingegangene Unterschriften</h2>
            {signatureCountOfUser && (
              <>
                <SignatureStats
                  signatureCount={signatureCountOfUser}
                  className={s.signatureStats}
                  layout="horizontal"
                />

                <div className={s.sectionLink}>
                  <span>
                    Mehr sehen und eintragen
                  </span>
                </div>
              </>
            )}
          </section>
        </a>
      )} */}

      <Link to="unterschriften-eintragen" className={cN(s.profilePageSection, s.profilePageSectionLarge)}>
        <section className={s.signaturesSection}>
          <h2>Eingegangene Unterschriften</h2>
          {signatureCountOfUser && (
            <>
              <SignatureStats
                signatureCount={signatureCountOfUser}
                className={s.signatureStats}
                layout="horizontal"
              />

              <div className={s.sectionLink}>
                <span>
                  Mehr sehen und eintragen
                </span>
              </div>
            </>
          )}
        </section>
      </Link>

      {/* <Link to="frage-an-das-grundeinkommen" className={s.profilePageSection}>
        <section>
          <h2>Deine Frage ans Grundeinkommen</h2>
          <p>Würden sich mehr Menschen selbstständig machen?</p>
          <div className={s.sectionLink}>
            <span>Mehr</span>
          </div>
        </section>
      </Link> */}

      {/* <div className={cN(s.profilePageSectionLarge, s.supportText)}>
        Falls du deine persönlichen Daten ändern oder deinen Account löschen
        möchtest, schick eine E-Mail an{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>
        .
      </div> */}
    </section>
  );
};
