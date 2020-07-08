import React, { useState, useContext, useEffect } from 'react';
import cN from 'classnames';
import { navigate } from '@reach/router';

import Layout from '../../components/Layout';
import { Section, SectionWrapper } from '../../components/Layout/Sections';
import { CTAButton } from '../../components/Layout/CTAButton';
import AuthContext from '../../context/Authentication';
import { getUser } from '../../hooks/Api/Users/Get';
import AvatarImage from '../../components/AvatarImage';
import { Speechbubble } from '../../components/QuestionUbi/Speechbubble';

import s from './style.module.less';

const ProfilePage = ({ id: slugId }) => {
  const { userId, isAuthenticated, customUserData: userData } = useContext(
    AuthContext
  );

  // Get user data on page load
  useEffect(() => {
    // If user is viewing other user's page
    if (userId !== slugId) {
      // Navigate to home page
      navigate('/', { replace: true });
    }
  }, [userId]);

  return (
    <Layout>
      <SectionWrapper>
        <Section>
          <div className={s.profilePageGrid}>
            <AvatarImage
              // srcOverwrite={userData.profilePictures['500']}
              className={s.avatar}
            />
            <span className={s.username}>{userData.username}</span>
            {/* Show profile edit button if own page */}
            <div className={cN(s.profilePageSection, s.details)}>
              <h2>Details</h2>
            </div>
            <div className={s.profilePageSection}>
              <h2>Frage ans Grundeinkommen</h2>
              <div className={s.questionsList}></div>
            </div>
            <div className={s.profilePageSection}>
              <h2>Eingegaangene Unterschriften</h2>
              <p>Du hast 233 Unterschriften eingetragen.</p>
            </div>
          </div>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default ProfilePage;
