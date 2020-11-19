import React from 'react';
import AvatarImage from '../../AvatarImage';
import SignatureStats from '../../SignatureStats';
import { formatDate } from '../../utils';
import s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

// We need the following mappings for the link to the self scan page
const SELF_SCAN_SLUGS = {
  brandenburg: 'qr/bb',
  berlin: 'qr/b',
  'schlewsig-holstein': 'qr/sh',
  hamburg: 'qr/hh',
  bremen: 'qr/hb',
};

export default ({ userData, signatureCountOfUser, userId }) => {
  return (
    <section className={s.profilePageGrid}>
      <section className={cN(s.profilePageSection, s.userInfo)}>
        <AvatarImage user={userData} className={s.avatar} />
        <div>
          <h1
            className={cN({
              [s.username]: userData.username,
              [s.email]: !userData.username,
            })}
          >
            {userData.username || userData.email}
          </h1>
          {/* Show profile edit button if own page */}
          <div className={s.details}>
            Dabei seit dem{' '}
            {userData.createdAt && formatDate(new Date(userData.createdAt))}
          </div>
        </div>
        <div className={s.sectionLink}>
          <Link to="stammdaten">Stammdaten bearbeiten</Link>
        </div>
      </section>

      <section className={cN([s.profilePageSection, s.signaturesSection])}>
        <h2>Eingegangene Unterschriften</h2>
        {signatureCountOfUser && (
          <>
            <SignatureStats
              signatureCount={signatureCountOfUser}
              className={s.signatureStats}
              layout="horizontal"
            />

            <div className={s.sectionLink}>
              <a
                href={`/${
                  signatureCountOfUser.mostRecentCampaign
                    ? SELF_SCAN_SLUGS[
                        signatureCountOfUser.mostRecentCampaign.state
                      ]
                    : 'qr/b' // if user has no recent campaign default is just berlin
                }?userId=${userId}`}
              >
                Mehr sehen und eintragen
              </a>
            </div>
          </>
        )}
      </section>

      <section className={cN([s.profilePageSection, s.contactInfo])}>
        <h2>Newsletter & Kontakt</h2>
        <p>Du erhältst folgende Newsletter: Berlin, Kiel</p>
        <div className={s.sectionLink}>
          <Link to="kontakt-einstellungen">Einstellungen ändern</Link>
        </div>
      </section>

      <div className={s.supportText}>
        Falls du deine persönlichen Daten ändern oder deinen Account löschen
        möchtest, schick eine E-Mail an{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>
        .
      </div>
    </section>
  );
};
