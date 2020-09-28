import React, { useState, useContext, useEffect } from 'react';
import cN from 'classnames';
import { navigate } from '@reach/router';
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
import { EnterLoginCode } from '../../../components/Login/EnterLoginCode';

// We need the following mappings for the link to the self scan page
const SELF_SCAN_SLUGS = {
  brandenburg: 'qr/bb',
  berlin: 'qr/b',
  'schlewsig-holstein': 'qr/sh',
  hamburg: 'qr/hh',
  bremen: 'qr/hb',
};

const ProfilePage = ({ id: slugId }) => {
  const {
    userId,
    isAuthenticated,
    customUserData: userData,
    previousAction,
    setPreviousAction,
  } = useContext(AuthContext);

  const [
    signatureCountOfUser,
    getSignatureCountOfUser,
  ] = useSignatureCountOfUser();

  const bounceToIdentifiedState = useBounceToIdentifiedState();

  const [isLoading, setIsLoading] = useState(true);

  // Get user data on page load and handle redirects
  useEffect(() => {
    // If user isn't authenticated
    if (isAuthenticated === false) {
      setIsLoading(false);
    } else if (isAuthenticated) {
      if (userId !== slugId) {
        // We want to tell the user that they are trying to view the page
        // of a different user. Furthermore we want to bounce the user back
        // to the identified state.
        bounceToIdentifiedState();
      } else {
        getSignatureCountOfUser({ userId });
      }

      setIsLoading(false);
    }
  }, [userId, isAuthenticated]);

  // If the user signed out (e.g. through the menu, we want to navigate to homepage)
  useEffect(() => {
    if (previousAction === 'signOut') {
      setPreviousAction(undefined);
      navigate('/');
    }
  }, previousAction);

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

        {/* If not authenticated and trying to access different profile show option to go to own user page */}
        {!isLoading && slugId !== userId && (
          <Section>
            <SectionInner>
              <FinallyMessage>
                {userId && (
                  <p>
                    Du bist mit der E-Mail-Adresse {userData.email} eingeloggt
                    und versuchst eine andere Profilseite aufzurufen.
                  </p>
                )}

                {!userId && (
                  <p>
                    Du versuchst auf ein Profil zuzugreifen. Dafür musst dich
                    zuerst einloggen.
                  </p>
                )}

                {/* If user id is undefined we don't want to redirect the next page to be the profile */}
                <LinkButtonLocal
                  to={userId ? `/login/?nextPage=mensch%2F${userId}` : '/login'}
                >
                  {userId ? 'Zu meinem Profil' : 'Zum Login'}
                </LinkButtonLocal>
              </FinallyMessage>
            </SectionInner>
          </Section>
        )}

        {/* If not authenticated show login code */}
        {!isLoading && !isAuthenticated && slugId === userId && (
          <Section>
            <SectionInner>
              <EnterLoginCode>
                <p>
                  {' '}
                  Du bist mit der E-Mail-Adresse {userData.email} eingeloggt. Um
                  dich zu identifizieren, haben wir dir einen Code per E-Mail
                  geschickt. Bitte gib diesen ein, um dein Profil zu sehen:
                </p>
              </EnterLoginCode>
            </SectionInner>
          </Section>
        )}
      </SectionWrapper>
    </Layout>
  );
};

export default ProfilePage;
