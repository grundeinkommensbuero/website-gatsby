import React, { useState, useContext, useEffect } from 'react';

import Layout from '../../components/Layout';
import {
  Section,
  SectionInner,
  SectionWrapper,
} from '../../components/Layout/Sections';

import AuthContext from '../../context/Authentication';
import { getUser } from '../../hooks/Api/Users/Get';

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
    if (userId && userId === slugId) {
      setDisplayUserData(customUserData);
    } else {
      getUser(slugId).then(({ state, user }) => {
        if (state === 'success') setDisplayUserData(user);
      });
    }
  }, []);

  console.log(displayUserData);

  if (!displayUserData) return null;

  return (
    <Layout>
      <SectionWrapper>
        <Section title={displayUserData.username}>
          <SectionInner>
            <p>Hewwo</p>
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default ProfilePage;
