import React, { useState, useEffect } from 'react';
import querystring from 'query-string';

import { getCurrentUser, getUser } from '../../hooks/Api/Users/Get';
import { useLocalStorageUser, useSignOut } from '../../hooks/Authentication/';

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
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [cognitoUser, setCognitoUser] = useState();
  const [customUserData, setCustomUserData] = useState({});
  const [token, setToken] = useState();
  const [tempEmail, setTempEmail] = useState();
  const signOut = useSignOut();
  const [userId, setUserId] = useLocalStorageUser();

  // On page load
  useEffect(() => {
    if (typeof window !== `undefined`) {
      // Check if the user is already signed in
      import(/* webpackChunkName: "Amplify" */ '@aws-amplify/auth').then(
        ({ default: Amplify }) => {
          Amplify.currentAuthenticatedUser()
            .then(user => {
              if (user) {
                setCognitoUser(user);
                setIsAuthenticated(true);
              }
            }) // set user in context (global state)
            .catch(() => {
              //error is thrown if user is not authenticated
              setIsAuthenticated(false);
            });
        }
      );
    }
  }, []);

  //define function to update token upon change of state
  useEffect(() => {
    // Set user in localhost
    //only if user is authenticated
    if (cognitoUser && cognitoUser.attributes) {
      // token from state would be available only in the next lifecycle
      // therefore the whole tempToken thing
      const tempToken = cognitoUser.signInUserSession.idToken.jwtToken;
      setToken(tempToken);
      // Update userId in localStorage if different than login user
      if (cognitoUser.attributes.sub !== userId) {
        setUserId(cognitoUser.attributes.sub);
      }

      // Update user data with data from backend
      updateCustomUserData({
        isAuthenticated: true,
        token: tempToken,
        setCustomUserData,
      });
    }
  }, [cognitoUser]);

  useEffect(() => {
    // If user is not authenticated but userId is known
    if (isAuthenticated === false && userId) {
      // Get user data
      updateCustomUserData({
        isAuthenticated,
        userId,
        setCustomUserData,
        signOut,
      });
    }

    // Check for URL param for userId
    const params = querystring.parse(window.location.search);
    // If there is a userId in the params
    if (params.userId) {
      if (userId !== undefined) setUserId(params.userId);
      // If userId in params is same as setUserId do nothing
      if (userId === params.userId) return;
      // if userId in params is different than in state
      setUserId(params.userId);
    }
  }, [userId, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        cognitoUser,
        setCognitoUser,
        isAuthenticated,
        setIsAuthenticated,
        token,
        userId,
        setUserId,
        tempEmail,
        setTempEmail,
        customUserData,
        updateCustomUserData: () =>
          updateCustomUserData({
            isAuthenticated,
            token,
            setCustomUserData,
            signOut,
          }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Updates user data with data from backend
const updateCustomUserData = async ({
  isAuthenticated,
  token,
  setCustomUserData,
  userId,
  signOut,
}) => {
  try {
    if (isAuthenticated === true) {
      // Get current user data if authenticated
      const result = await getCurrentUser(token);
      setCustomUserData(result.user);
    } else if (isAuthenticated === false) {
      // Get minimal user data if not authenticated but has userId
      const result = await getUser(userId);
      // If user is not found
      if (result.state !== 'success') {
        signOut();
        return;
      }
      setCustomUserData(result.user);
    }
  } catch (error) {
    console.log(error);
  }
};

export default AuthContext;
export { AuthProvider };
