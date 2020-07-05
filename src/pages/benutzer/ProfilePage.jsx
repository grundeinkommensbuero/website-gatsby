import React, { useState, useContext, useEffect } from 'react';
import cN from 'classnames';
import Layout from '../../components/Layout';
import {
  Section,
  SectionInner,
  SectionWrapper,
  SectionHeader,
} from '../../components/Layout/Sections';
import { CTAButton } from '../../components/Layout/CTAButton';

import ListQuestions from '../../components/QuestionUbi/ListQuestions';

import s from './style.module.less';

import AuthContext from '../../context/Authentication';
import { getUser } from '../../hooks/Api/Users/Get';
import AvatarImage from '../../components/AvatarImage';

// const getUserData = async slugId => {
//   const response = await getUser(slugId);
//   if ((response.status = 'success')) return response.user;
//   return undefined;
// };

const ProfilePage = ({ id: slugId }) => {
  const [displayUserData, setDisplayUserData] = useState();
  const { userId, isAuthenticated, customUserData } = useContext(AuthContext);

  // Get user data on page load
  useEffect(() => {
    // If user is viewing own page
    if (userId && userId === slugId && customUserData) {
      // Use the user data from the existing auth context
      setDisplayUserData(customUserData);
    } else if (userId !== slugId) {
      // If user is viewing other page
      getUser(slugId).then(({ state, user }) => {
        if (state === 'success') setDisplayUserData(user);
        // If no data found for user with slug id, set value to null
        else setDisplayUserData(null);
      });
    }
  }, [customUserData]);

  if (!displayUserData || displayUserData === {}) return null;

  console.log(displayUserData);

  const title =
    displayUserData === undefined ? 'Lade...' : displayUserData.username;

  return (
    <Layout>
      <SectionWrapper>
        <Section>
          <div className={s.profilePageGrid}>
            <AvatarImage className={s.avatar} />
            <h1 className={s.username}>{title}</h1>
            {/* Show profile edit button if own page */}
            {userId === slugId && (
              <CTAButton className={s.editProfileButton}>
                Profil editieren
              </CTAButton>
            )}
            <div className={cN(s.profilePageSection, s.details)}>
              <h2>Details</h2>
            </div>
            <div className={s.profilePageSection}>
              <h2>Deine Frage ans Grundeinkommen</h2>
              <ListQuestions userId={slugId} />
            </div>
          </div>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default ProfilePage;
