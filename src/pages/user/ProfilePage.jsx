import React, { useContext } from 'react';

import Layout from '../../components/Layout';
import { Section } from '../../components/Layout/Sections';

import AuthContext from '../../context/Authentication';

const ProfilePage = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);

  return (
    <Layout>
      <Section>
        <p>{userId}</p>
      </Section>
    </Layout>
  );
};

export default ProfilePage;
