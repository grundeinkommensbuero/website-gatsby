import React, { useState, useContext, useEffect } from 'react';
import cN from 'classnames';
import { navigate } from '@reach/router';

import AuthContext from '../../../context/Authentication';

import Layout from '../../../components/Layout';
import { Section, SectionWrapper } from '../../../components/Layout/Sections';
import AvatarImage from '../../../components/AvatarImage';

import s from './style.module.less';
import { useSignatureCountOfUser } from '../../../hooks/Api/Signatures/Get';
import SignatureStats from '../../../components/SignatureStats';

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

  const [isLoading, setIsLoading] = useState(true);

  // Get user data on page load
  useEffect(() => {
    // If user is viewing other user's page
    //if (!isAuthenticated || userId !== slugId) {
    if (false || userId !== slugId) {
      // Navigate to home page
      navigate('/', { replace: true });
    } else {
      getSignatureCountOfUser({ userId });

      setIsLoading(false);
    }
  }, [userId]);

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
        {!isLoading && (
          <Section>
            <div className={s.profilePageGrid}>
              <AvatarImage
                // srcOverwrite={userData.profilePictures['500']}
                className={s.avatar}
              />
              <h1 className={s.username}>{userData.username}</h1>
              {/* Show profile edit button if own page */}
              <div className={cN(s.profilePageSection, s.details)}>
                <h2>Details</h2>
              </div>
              <div className={s.profilePageSection}>
                <h2>Frage ans Grundeinkommen</h2>
                <div className={s.questionsList}></div>
              </div>
              <div className={s.profilePageSection}>
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
                        href={`https://expedition-grundeinkommen.de/${
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
            </div>
          </Section>
        )}
      </SectionWrapper>
    </Layout>
  );
};

export default ProfilePage;