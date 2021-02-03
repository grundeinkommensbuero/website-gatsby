import React from 'react';
import { Router } from '@reach/router';
import ProfileWrapper from '../../components/Profile/ProfileWrapper';

/**
 * Single Page Application for user profile pages.
 */
const App = () => {
  return (
    <>
      <Router basepath="/mensch">
        <ProfileWrapper path="/:id/*" />
      </Router>
    </>
  );
};

export default App;
