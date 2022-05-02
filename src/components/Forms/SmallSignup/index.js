import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/Authentication';
import { stateToAgs } from '../../utils';
import { FinallyMessage } from '../FinallyMessage';
import SignUp from '../SignUp';

export const SmallSignup = ({ ags = stateToAgs.berlin }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  if (success && isAuthenticated) {
    return (
      <FinallyMessage>
        <p>Vielen Dank für die Anmeldung!</p>
      </FinallyMessage>
    );
  }

  return (
    <SignUp
      fieldsToRender={['email']}
      // If this is a signup for a specific collection (date and location set), that should be saved.
      // Otherwise we pass that user wants to collect in general
      additionalData={{
        ags,
      }}
      showHeading={false}
      smallFormMargin={true}
      postSignupAction={() => setSuccess(true)}
      loginCodeInModal={true}
    />
  );
};
