import React from 'react';
import { Router } from '@reach/router';
import { OnboardingOverview } from '../OnboardingOverview';
import { StepOne } from '../StepOne';

import Layout from '../../Layout';
import { SectionWrapper } from '../../Layout/Sections';

export const OnboardingWrapper = ({ userData, userId }) => {
  return (
    <>
      <Layout>
        <SectionWrapper>
          <Router>
            <OnboardingOverview
              userData={userData}
              userId={userId}
              path="/"
            />
            <StepOne
              userData={userData}
              userId={userId}
              path="teilen"
            />
          </Router>
        </SectionWrapper>
      </Layout>
    </>
  );
};