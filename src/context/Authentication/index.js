import React, { useState, useEffect } from 'react';
import querystring from 'query-string';

import { getCurrentUser } from '../../hooks/Api/Users/Get';
import { useLocalStorageUser } from '../../hooks/Authentication/';

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
  const [cognitoUser, setCognitoUser] = useState();
  // customUserData refers to the attributes we have saved in dynamo
  const [customUserData, setCustomUserData] = useState();
  const [token, setToken] = useState();
  const [tempEmail, setTempEmail] = useState();
  // Replaces the basic useState for the userId
  // This way, all the updates to this value will also be saved to localhost
  const [userId, setUserId] = useLocalStorageUser();

  // On page load
  useEffect(() => {
    if (typeof window !== `undefined`) {
      // Check if the user is already signed in
      import(/* webpackChunkName: "Amplify" */ '@aws-amplify/auth').then(
        ({ default: Amplify }) => {
          Amplify.currentAuthenticatedUser()
            .then(user => setCognitoUser(user)) // set user in context (global state)
            .catch(() => setCognitoUser(null)); //error is thrown if user is not authenticated
        }
      );

      // Check for URL param for user ID
      const { paramsUserId } = querystring.parse(window.location.search);
      // If params, set that user as the userId and via localStorage
      if (paramsUserId) {
        console.log('Update user id from query params');
        setUserId(paramsUserId);
      }
    }
  }, []);

  //define function to update token upon change of state
  useEffect(() => {
    // Set user in localhost
    //only if user is authenticated
    if (cognitoUser && cognitoUser.attributes) {
      console.log('Authenticated');
      // token from state would be available only in the next lifecycle
      // therefore the whole tempToken thing
      const tempToken = cognitoUser.signInUserSession.idToken.jwtToken;
      setToken(tempToken);
      // Update userId in localStorage if different than login user
      if (cognitoUser.attributes.sub !== userId) {
        setUserId(cognitoUser.attributes.sub);
      }

      setIsAuthenticated(true);

      // Update user data with data from backend
      updateCustomUserData(true, tempToken, setCustomUserData);
    } else {
      setIsAuthenticated(false);
    }
  }, [cognitoUser]);

  return (
    <AuthContext.Provider
      value={{
        cognitoUser,
        setCognitoUser,
        isAuthenticated,
        token,
        userId,
        setUserId,
        tempEmail,
        setTempEmail,
        customUserData,
        updateCustomUserData: () =>
          updateCustomUserData(isAuthenticated, token, setCustomUserData),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Updates user data with data from backend
const updateCustomUserData = async (
  isAuthenticated,
  token,
  setCustomUserData
) => {
  try {
    if (isAuthenticated) {
      const result = await getCurrentUser(token);

      setCustomUserData(result.user);
    }
  } catch (error) {
    console.log(error);
  }
};

export default AuthContext;
export { AuthProvider };
