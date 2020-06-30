import React, { useState, useContext, useEffect } from 'react';

import Layout from '../../components/Layout';
import {
  Section,
  SectionInner,
  SectionWrapper,
  SectionHeader,
} from '../../components/Layout/Sections';

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
      console.log(customUserData);
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

  if (!displayUserData) return null;

  const title =
    displayUserData === undefined ? 'Lade...' : displayUserData.username;

  return (
    <Layout>
      <SectionWrapper>
        <Section>
          <SectionInner>
            <h1 className={s.username}>
              <AvatarImage className={s.avatar} />
              {title}
            </h1>
            <p>This is the user Data</p>
          </SectionInner>
          {/* <SectionInner>
            <p>This is the user Data</p>
          </SectionInner> */}
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default ProfilePage;
