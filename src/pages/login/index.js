import Layout from '../../components/Layout';
import React, { useContext, useEffect, useState } from 'react';
import querystring from 'query-string';
import { navigate } from '@reach/router';

import AuthContext from '../../context/Authentication';

import {
  SectionWrapper,
  Section,
  SectionInner,
} from '../../components/Layout/Sections';
import { RequestLoginCodeWithEmail } from '../../components/Login/RequestLoginCode';
import * as s from './style.module.less';

const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

const LoginPage = () => {
  const { isAuthenticated, setTempEmail } = useContext(AuthContext);
  const [urlParams, setUrlParams] = useState();

  // Remove tempEmail when user navigates away
  useEffect(() => {
    return () => {
      setTempEmail(undefined);
    };
  }, []);

  // Get next page from query params
  useEffect(() => {
    const params =
      // Check for window to make sure that build works
      typeof window !== `undefined`
        ? // If window, parse params
          querystring.parse(window.location.search)
        : undefined;

    setUrlParams(params);
  }, []);

  // If user is authenticated, navigate to home page or the specified next page
  if (isAuthenticated === true)
    navigate(urlParams.nextPage ? `/${urlParams.nextPage}` : '/');

  // If user isn't authenticated, show the page to get them authenticated
  if (isAuthenticated === false) {
    return (
      <Layout>
        <SectionWrapper>
          <Section
            colorScheme={IS_BERLIN_PROJECT ? 'rose' : 'violet'}
            className={s.section}
          >
            <SectionInner className={s.wrapper}>
              <div className={s.content}>
                <RequestLoginCodeWithEmail inputClassName={s.input} />
              </div>
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
