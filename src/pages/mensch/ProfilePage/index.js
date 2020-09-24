import React, { useState, useContext, useEffect } from 'react';
import cN from 'classnames';
import AuthContext from '../../../context/Authentication';
import Layout from '../../../components/Layout';
import {
  Section,
  SectionInner,
  SectionWrapper,
} from '../../../components/Layout/Sections';
import AvatarImage from '../../../components/AvatarImage';

import s from './style.module.less';
import { useSignatureCountOfUser } from '../../../hooks/Api/Signatures/Get';
import SignatureStats from '../../../components/SignatureStats';
import { formatDate } from '../../../components/utils';
import { useBounceToIdentifiedState } from '../../../hooks/Authentication';
import { LinkButtonLocal } from '../../../components/Forms/Button';
import { FinallyMessage } from '../../../components/Forms/FinallyMessage';

// We need the following mappings for the link to the self scan page
const SELF_SCAN_SLUGS = {
  brandenburg: 'qr/bb',
  berlin: 'qr/b',
  'schlewsig-holstein': 'qr/sh',
  hamburg: 'qr/hh',
  bremen: 'qr/hb',
};

const ProfilePage = ({ id: slugId }) => {
  const { userId, isAuthenticated, customUserData: userData } = useContext(
    AuthContext
  );
  const [
    signatureCountOfUser,
    getSignatureCountOfUser,
  ] = useSignatureCountOfUser();
  const bounceToIdentifiedState = useBounceToIdentifiedState();

  const [isLoading, setIsLoading] = useState(true);

  // Get user data on page load
  useEffect(() => {
    console.log('gets called', { isAuthenticated }, { userId }, { slugId });
    // If user isn't authenticated
    if (isAuthenticated === false) {
      // Navigate to home page
      // navigate('/', { replace: true });
    } else if (isAuthenticated && userId !== slugId) {
      console.log('about to bounce');
      // We want to tell the user that they are trying to view the page
      // of a different user. Furthermore we want to bounce the user back
      // to the identified state.
      bounceToIdentifiedState();

      setIsLoading(false);
    } else {
      getSignatureCountOfUser({ userId });

      setIsLoading(false);
    }
  }, [userId, isAuthenticated]);

  return (
    <Layout>
      <SectionWrapper>
        {isLoading && (
          <Section>
            <div className={s.profilePageGrid}>
              <h1>Lade...</h1>
            </div>
          </Section>
        )}
        {!isLoading && isAuthenticated && (
          <Section>
            <div className={s.profilePageGrid}>
              <AvatarImage user={userData} className={s.avatar} />
              <h1
                className={cN({
                  [s.username]: userData.username,
                  [s.email]: !userData.username,
                })}
              >
                {userData.username || userData.email}
              </h1>
              {/* Show profile edit button if own page */}
              <div className={cN(s.profilePageSection, s.details)}>
                Dabei seit dem{' '}
                {userData.createdAt && formatDate(new Date(userData.createdAt))}
              </div>
              <div className={cN([s.profilePageSection, s.signaturesSection])}>
                <h2>Eingegangene Unterschriften</h2>
                {signatureCountOfUser && (
                  <>
                    <SignatureStats
                      signatureCount={signatureCountOfUser}
                      className={s.signatureStats}
                      layout="horizontal"
                    />

                    <div className={s.link}>
                      <a
                        href={`/${
                          signatureCountOfUser.mostRecentCampaign
                            ? SELF_SCAN_SLUGS[
                                signatureCountOfUser.mostRecentCampaign.state
                              ]
                            : 'qr/b' // if user has no recent campaign default is just berlin
                        }?userId=${userId}`}
                      >
                        Hier mehr eintragen...
                      </a>
                    </div>
                  </>
                )}
              </div>
              <div className={cN(s.profilePageSection, s.supportText)}>
                Falls du deine persönlichen Daten ändern oder deinen Account
                löschen möchtest, schick eine E-Mail an{' '}
                <a href="mailto:support@expedition-grundeinkommen.de">
                  support@expedition-grundeinkommen.de
                </a>
                .
              </div>
            </div>
          </Section>
        )}

        {/* If not authenticated show option to go to own user page */}
        {!isLoading && !isAuthenticated && (
          <Section>
            <SectionInner>
              <FinallyMessage>
                <p>
                  Du bist mit der E-Mail-Adresse {userData.email} eingeloggt und
                  versuchst eine andere Profilseite aufzurufen.
                </p>
                <LinkButtonLocal to={`/login/?nextPage=mensch%2F${userId}`}>
                  Zu meinem Profil{' '}
                </LinkButtonLocal>
              </FinallyMessage>
            </SectionInner>
          </Section>
        )}
      </SectionWrapper>
    </Layout>
  );
};

export default ProfilePage;
