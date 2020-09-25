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
  const [previousAction, setPreviousAction] = useState();
  const [userId, setUserId] = useLocalStorageUser();

  const signUserOut = async () =>
    await signOut({ setCognitoUser, setUserId, setIsAuthenticated, setToken });

  // On page load
  useEffect(() => {
    // Check for URL param for userId
    const params = querystring.parse(window.location.search);
    // If there is a userId in the params
    let userIdParams;
    if (params.userId) {
      if (userId !== undefined) userIdParams = params.userId;
      // if userId in params is different than in state
      if (userIdParams !== params.userId) userIdParams = params.userId;
    }
    // If userId in params but no userId in local storage
    if (userIdParams && !userId) {
      // Set user as pseudo logged in
      setUserId(userIdParams);
      setIsAuthenticated(false);
    }
    // If userId in params and userId in local storage and they don't match
    else if (userIdParams && userId && userIdParams !== userId) {
      // Sign current user out
      signUserOut().then(() => {
        // Set new userId so user is pseudo logged in. Can force a second sign out if invalid id.
        setUserId(userIdParams);
      });
    }
    // In any other case, check for authenticated user
    else {
      if (typeof window !== `undefined`) {
        // Check if the user is already signed in
        import(/* webpackChunkName: "Amplify" */ '@aws-amplify/auth').then(
          ({ default: Amplify }) => {
            Amplify.currentAuthenticatedUser()
              .then(user => {
                if (user) {
                  setCognitoUser(user);
                }
              }) // set user in context (global state)
              .catch(() => {
                //error is thrown if user is not authenticated
                setIsAuthenticated(false);
              });
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    // If identified cognito user
    if (cognitoUser && cognitoUser.attributes) {
      // Set user data
      setIsAuthenticated(true);
      setToken(cognitoUser.signInUserSession.idToken.jwtToken);
      // If userId needs to be overriddenz
      if (cognitoUser.attributes.sub !== userId) {
        setUserId(cognitoUser.attributes.sub);
      }
    }
  }, [cognitoUser]);

  // Getting user data from backend
  useEffect(() => {
    if (userId && isAuthenticated !== undefined) {
      updateCustomUserData({
        isAuthenticated,
        token,
        userId,
        setCustomUserData,
        signUserOut,
      });
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
        setToken,
        userId,
        setUserId,
        tempEmail,
        setTempEmail,
        customUserData,
        previousAction,
        setPreviousAction,
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
      // If error finding user data
      result.state !== 'success' ||
      // If user logged in different userId passed in params
      (isAuthenticated && userId !== result.user.cognitoId) ||
      // User doesn't have email or password
      (!result.user?.email && !result.user?.username)
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
