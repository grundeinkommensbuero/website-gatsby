import React, { useState } from 'react';
import Auth from '@aws-amplify/auth';

/**
 * This class serves as a provider (reacts context API) which is used
 * to maintain a global state. The application is wrapped around such a provider.
 * https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
 *
 * Another option would be to make use of Amplifys Auth functions, but I think that
 * would be less efficient than keeping an aditional local state
 */

const AuthContext = React.createContext();

const AuthProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const setIban = async iban => {
    if (user !== null) {
      try {
        await Auth.updateUserAttributes(state.user, { iban });
        //save the changed user in the global state
        const updatedUser = await Auth.currentAuthenticatedUser();
        setState({ user: updatedUser });
      } catch (error) {
        console.log('Error while updating iban');
      }
    }
  };

  const setIsDonationActive = async isDonationActive => {
    if (user !== null) {
      try {
        await Auth.updateUserAttributes(state.user, { isDonationActive });
        //save the changed user in the global state
        const updatedUser = await Auth.currentAuthenticatedUser();
        setState({ user: updatedUser });
      } catch (error) {
        console.log('Error while updating if donation is active');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state: { isAuthenticated, user },
        setIsAuthenticated: setIsAuthenticated,
        setUser: setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
