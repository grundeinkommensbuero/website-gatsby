import React from 'react';
import { Router } from '@reach/router';
import ProfilePage from './ProfilePage';

/**
 * Single Page Application for user profile pages.
 */
const App = () => {
  return (
    <>
      <Router basepath="/mensch">
        <ProfilePage path="/:id" />
      </Router>
    </>
  );
};

export default App;
