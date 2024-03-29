import React, { useState, useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import { navigate } from '@reach/router';
import AuthContext from '../../../context/Authentication';
import Layout from '../../Layout';
import { Section, SectionInner, SectionWrapper } from '../../Layout/Sections';

import { useSignatureCountOfUser } from '../../../hooks/Api/Signatures/Get';
import { useBounceToIdentifiedState } from '../../../hooks/Authentication';
import { LinkButtonLocal } from '../../Forms/Button';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { EnterLoginCode } from '../../Login/EnterLoginCode';
import { ProfileNotifications } from '../ProfileNotifications';
import { ProfileOverview } from '../ProfileOverview';
import { PersonalSettings } from '../PersonalSettings';
import { ProfileSignatures } from '../ProfileSignatures';
import { ProfilePledgePackage } from '../ProfilePledgePackage';
import { ProfileDonationSettings } from '../ProfileDonationSettings';

const ProfilePage = ({ id: slugId }) => {
  const {
    userId,
    isAuthenticated,
    setUserId,
    customUserData: userData,
    previousAction,
    setPreviousAction,
    updateCustomUserData,
  } = useContext(AuthContext);

  const [signatureCountOfUser, getSignatureCountOfUser] =
    useSignatureCountOfUser();

  const bounceToIdentifiedState = useBounceToIdentifiedState();

  const [isLoading, setIsLoading] = useState(true);

  // Get user data on page load and handle redirects
  useEffect(() => {
    // If user isn't authenticated
    if (isAuthenticated === false) {
      setIsLoading(false);

      // Set user id to slug id, so people get immediately sent the login code.
      // This is relevant if people click a link in a newsletter to update contact settings.
      setUserId(slugId);
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
      navigate('/');
    }

    // We want to reset previous action in a clean up function
    // so that we can set the userId to undefined, which might have been
    // set to slugId after signout in the useEffect above.
    // It was a bit complicated to work around that
    return () => {
      if (previousAction === 'signOut') {
        setUserId(undefined);
        setPreviousAction(undefined);
      }
    };
  }, [previousAction]);

  const triggerUpdateCustomUserData = () => {
    updateCustomUserData();
  };

  return (
    <Layout>
      <SectionWrapper>
        {isLoading && (
          <Section>
            <div>
              <h2>Lade...</h2>
            </div>
          </Section>
        )}
        {!isLoading && isAuthenticated && (
          <Router>
            <ProfileOverview
              userData={userData}
              signatureCountOfUser={signatureCountOfUser}
              userId={userId}
              path="/"
            />
            <PersonalSettings
              userData={userData}
              updateCustomUserData={triggerUpdateCustomUserData}
              userId={userId}
              path="stammdaten"
            />
            <ProfileSignatures
              userData={userData}
              path="unterschriften-eintragen"
              userId={userId}
            />
            <ProfileNotifications
              userData={userData}
              updateCustomUserData={triggerUpdateCustomUserData}
              path="kontakt-einstellungen"
              userId={userId}
            />
            <ProfilePledgePackage
              userData={userData}
              updateCustomUserData={triggerUpdateCustomUserData}
              path="paket-nehmen"
              userId={userId}
            />
            <ProfileDonationSettings
              userData={userData}
              updateCustomUserData={triggerUpdateCustomUserData}
              path="spenden-einstellungen"
              userId={userId}
            />
          </Router>
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
