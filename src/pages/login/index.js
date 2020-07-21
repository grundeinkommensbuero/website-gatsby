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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setLoading(false);
    }
  }, isAuthenticated);

  // Show nothing is waiting to find login state
  if (loading) return null;

  // If user is authenticated, navigate to the page that they
  if (!loading && isAuthenticated) {
    navigate('/');
  }

  // If user isn't authenticated, show the page to get them authenticated
  if (!loading) {
    return (
      <Layout>
        <SectionWrapper>
          <Section>
            <SectionInner>
              <RequestLoginCodeWithEmail>
                <p>
                  What's up dude, I heard you want to login. Please click here
                </p>
              </RequestLoginCodeWithEmail>
            </SectionInner>
          </Section>
        </SectionWrapper>
      </Layout>
    );
  }
};

export default LoginPage;
