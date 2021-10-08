import React, { useEffect, useState } from 'react';
import AvatarImage from '../../AvatarImage';
import SignatureStats from '../../SignatureStats';
import { formatDate, stateToAgs } from '../../utils';
import * as s from './style.module.less';
import * as gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { getReferredUserMessage } from '../utils/referredUserMessage';
import { getCustomNewsletterEnumeration } from '../utils/customNewsletterEnumeration';

export const ProfileOverview = ({ userData, signatureCountOfUser }) => {
  const [pledgePackages, setPledgePackages] = useState([]);

  // list newsletters of current user as human readable string
  const customNewsletterEnumeration = getCustomNewsletterEnumeration({
    userData,
  });
  // list referred users, if any
  const referredUserMessage = getReferredUserMessage({ userData });

  // NOTE: not needed for now, reactivate as soon as pledge packages are used for berlin
  // const isSignedUpForBerlin =
  //   userData.municipalities?.findIndex(
  //     ({ ags }) => ags === stateToAgs['berlin']
  //   ) !== -1;

  const isSignedUpForBremen =
    userData.municipalities?.findIndex(
      ({ ags }) => ags === stateToAgs['bremen']
    ) !== -1;

  // Filter interactions to only use interactions which were created
  // as pledge package
  useEffect(() => {
    if (userData?.interactions) {
      setPledgePackages(
        userData.interactions.filter(
          interaction => interaction.type === 'pledgePackage'
        )
      );
    }
  }, [userData]);

  return (
    <section className={gS.profilePageGrid}>
      <Link
        to="stammdaten"
        className={cN(s.profilePageSection, s.profilePageSectionLarge)}
      >
        <section className={gS.userInfo}>
          <AvatarImage user={userData} className={gS.avatar} />
          <div>
            <h2 className={cN({ [gS.username]: userData.username })}>
              {userData.username || userData.email}
            </h2>
            <div className={gS.placeInfo}>{userData.city}</div>
            <div className={gS.details}>
              Dabei seit dem{' '}
              {userData.createdAt && formatDate(new Date(userData.createdAt))}
            </div>
            {referredUserMessage && (
              <div className={s.referredUsersMessage}>
                {referredUserMessage}
              </div>
            )}
          </div>
          <div className={s.sectionLink}>
            <span>Stammdaten bearbeiten</span>
          </div>
        </section>
      </Link>

      <Link to="spenden-einstellungen" className={s.profilePageSection}>
        <section>
          <h2>Spenden-Einstellungen</h2>
          {userData?.donations?.recurringDonation?.amount > 0 ? (
            <h4>
              Du bist Dauerspender*in.
              <br />
              Vielen Dank!
            </h4>
          ) : (
            <p>Hier kannst du deine Spende verwalten.</p>
          )}
          <div className={s.sectionLink}>
            <span>Spendeneinstellungen ändern</span>
          </div>
        </section>
      </Link>

      <Link to="kontakt-einstellungen" className={s.profilePageSection}>
        <section>
          <h2>Newsletter & Kontakt</h2>
          {customNewsletterEnumeration.length > 0 ? (
            <>
              <p>Du erhältst folgende Newsletter: </p>
              <p>{customNewsletterEnumeration}</p>
            </>
          ) : (
            <p>Du erhältst keinen Newsletter von uns.</p>
          )}
          <div className={s.sectionLink}>
            <span>Einstellungen ändern</span>
          </div>
        </section>
      </Link>

      <Link
        to="unterschriften-eintragen"
        className={cN(s.profilePageSection, {
          [s.profilePageSectionLarge]: !isSignedUpForBremen,
        })}
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
                <span>Mehr sehen und eintragen</span>
              </div>
            </>
          )}
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

      {/* Only show this section if user is signed up for berlin */}
      {isSignedUpForBremen && (
        <Link
          to="paket-nehmen"
          className={cN(s.profilePageSection, {
            [s.profilePageSectionLarge]: !isSignedUpForBremen,
          })}
        >
          <section>
            <h2>Dein Sammelpaket</h2>
            <p>
              {pledgePackages.length ? (
                <>
                  Du hast dir {pledgePackages.length} Paket
                  {pledgePackages.length > 1 && 'e'} geschnappt und somit
                  versprochen, 50 Unterschriften zu sammeln.
                  <br />
                  <br />
                  {/* TODO: design package */}
                  {/* Find package with message if exists to show this package (maybe in the future
                    show most recent (was kinda in a hurry) */}
                  "
                  {
                    pledgePackages.find(pledgePackage => pledgePackage.body)
                      ?.body
                  }
                  "
                </>
              ) : (
                <>Du hast noch kein Sammelpaket genommen.</>
              )}
            </p>
            <div className={s.sectionLink}>
              <span>
                {pledgePackages.length
                  ? 'Weiteres Paket nehmen'
                  : 'Nimm dein Paket'}
              </span>
            </div>
          </section>
        </Link>
      )}
    </section>
  );
};
