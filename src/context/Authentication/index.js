import React, { useState, useEffect } from 'react';
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

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [tempEmail, setTempEmail] = useState();

  // Check if the user is already signed in in the beginning
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('user upon start', user);
        setUser(user);
      }) // set user in context (global state)
      .error(() => setUser(null)); //error is thrown if user is not authenticated
  }, []);

  //define function to update token upon change of state
  useEffect(() => {
    console.log('user has changed in context', user);
    //only if user is authenticated
    if (user && user.attributes) {
      setToken(user.signInUserSession.idToken.jwtToken);
      setUserId(user.attributes.sub);

      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        token,
        userId,
        setUserId,
        tempEmail,
        setTempEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const checkForExistingSession = async () => {};

export default AuthContext;
export { AuthProvider };
