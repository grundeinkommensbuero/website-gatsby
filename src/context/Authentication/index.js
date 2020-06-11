import React, { useState, useEffect } from 'react';
import querystring from 'query-string';

import { getCurrentUser, getUser } from '../../hooks/Api/Users/Get';
import { useLocalStorageUser, signOut } from '../../hooks/Authentication/';

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
  const [userId, setUserId] = useLocalStorageUser();

  const signUserOut = () =>
    signOut({ setCognitoUser, setUserId, setIsAuthenticated });

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
      setToken(cognitoUser.signInUserSession.idToken.jwtToken);
      // Update userId in localStorage if different than login user
      if (cognitoUser.attributes.sub !== userId) {
        setUserId(cognitoUser.attributes.sub);
      }
    }
  }, [cognitoUser]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      // Update user data with data from backend
      updateCustomUserData({
        isAuthenticated,
        token,
        userId,
        setCustomUserData,
        signUserOut,
      });
    }
    // If user is not authenticated but userId is known
    if (isAuthenticated === false && userId) {
      // Get user data
      updateCustomUserData({
        isAuthenticated,
        userId,
        setCustomUserData,
        signUserOut,
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
  signUserOut,
}) => {
  try {
    // Get user data from protected or public endpoint
    const result = isAuthenticated
      ? await getCurrentUser(token)
      : await getUser(userId);

    if (
      // If error finding user data, log out user
      result.state !== 'success' ||
      // If user logged in different userId passed in params
      (isAuthenticated && userId !== result.user.cognitoId)
    ) {
      signUserOut();
      return;
    }

    // If no error, update custom user data
    setCustomUserData(result.user);
  } catch (error) {
    console.log(error);
  }
};

export default AuthContext;
export { AuthProvider };
