import Layout from '../../components/Layout';
import React, { useContext } from 'react';
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
  const { isAuthenticated } = useContext(AuthContext);

  const urlParams = querystring.parse(window.location.search);

  // If user is authenticated, navigate to home page
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
