import React from 'react';
import { Router } from '@reach/router';
import { OnboardingWrapper } from '../../components/Onboarding/OnboardingWrapper';

/**
 * Single Page Application for user onboarding.
 */
const App = () => {
  return (
    <>
      <Router basepath="/onboarding">
        <OnboardingWrapper path="/*" />
      </Router>
    </>
  );
};

export default App;