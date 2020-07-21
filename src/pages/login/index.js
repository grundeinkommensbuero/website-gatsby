import Layout from '../../components/Layout';
import React, { useState, useContext, useEffect } from 'react';
import cN from 'classnames';
import { navigate } from '@reach/router';

import AuthContext from '../../context/Authentication';
import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { RequestLoginCodeWithEmail } from '../../components/Login/RequestLoginCode';

const LoginPage = () => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/');
    }
  }, isAuthenticated);

  // Show nothing is waiting to find login state
  // if (loading) return null;

  // If user isn't authenticated, show the page to get them authenticated
  return (
    <Layout>
      <SectionWrapper>
        <Section>
          <SectionInner>
            <RequestLoginCodeWithEmail>
              <p>
                What's up dude, I heard you want to login. Please enter your
                email address.
              </p>
            </RequestLoginCodeWithEmail>
          </SectionInner>
        </Section>
      </SectionWrapper>
    </Layout>
  );
};

export default LoginPage;
