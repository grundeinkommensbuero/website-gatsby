import Layout from '../../components/Layout';
import React, { useContext, useEffect } from 'react';
import querystring from 'query-string';
import { navigate } from '@reach/router';

import AuthContext from '../../context/Authentication';

import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { RequestLoginCodeWithEmail } from '../../components/Login/RequestLoginCode';

const LoginPage = () => {
  const { isAuthenticated, setTempEmail } = useContext(AuthContext);

  // Remove tempEmail when user navigates away
  useEffect(() => {
    return () => {
      setTempEmail(undefined);
    };
  }, []);

  // Get next page from query params
  const urlParams = querystring.parse(window.location.search);

  // If user is authenticated, navigate to home page or the specified next page
  if (isAuthenticated === true)
    navigate(urlParams.nextPage ? `/${urlParams.nextPage}` : '/');

  // If user isn't authenticated, show the page to get them authenticated
  if (isAuthenticated === false) {
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
  }

  // If waiting for authentication state
  return null;
};

export default LoginPage;
