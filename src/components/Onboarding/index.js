import React, { useContext } from 'react';
import { Router } from '@reach/router';
import AuthContext from '../../context/Authentication';
import s from './style.module.less';

import Layout from '../Layout';
import { SectionWrapper } from '../Layout/Sections';

import { BreadcrumbLinks } from './BreadcrumbLinks';
import { Mitmachen } from './Mitmachen';
import { Teilen } from './Teilen';
import { Spenden } from './Spenden';
import { ProfilEinrichten } from './ProfilEinrichten';
import { LoadingAnimation } from './LoadingAnimation';

export const Onboarding = () => {
  const {
    userId,
    isAuthenticated,
    customUserData: userData,
  } = useContext(AuthContext);

  const LoggedOutHint = () => {
    return (
      <h1 className={s.loggedOutHint}>
        <a href="/login">Logg dich ein</a>, um diese Seite zu sehen.
      </h1>
    )
  }

  return (
    <Layout>
      <SectionWrapper>
        {isAuthenticated && userData.username ?
          <>
            {userData.username ?
              <>
                <div className={s.breadcrumbContainer}>
                  <BreadcrumbLinks />
                </div>

                <Router basepath="onboarding">
                  <Mitmachen
                    userData={userData}
                    userId={userId}
                    path="/"
                  />
                  <Teilen
                    userData={userData}
                    userId={userId}
                    path="teilen"
                  />
                  <Spenden
                    userData={userData}
                    userId={userId}
                    path="spenden"
                  />
                  <ProfilEinrichten
                    userData={userData}
                    userId={userId}
                    path="profil-einrichten"
                  />
                </Router>
              </>
              : <LoggedOutHint />
            }
          </>
          : <LoadingAnimation />
        }
      </SectionWrapper>
    </Layout>
  );
};