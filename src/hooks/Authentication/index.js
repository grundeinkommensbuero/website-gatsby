/**
 * This file holds several hook functions regarding everything concerning authentication
 */
import { getRandomString } from '../../components/utils';
import { sleep } from '../utils';
import { useContext, useState } from 'react';
import querystring from 'query-string';
import { navigate } from '@reach/router';
import AuthContext from '../../context/Authentication';

export { useAnswerChallenge } from './AnswerChallenge';
export { useVerification } from './Verification';
export { useLocalStorageUser } from './LocalStorageUser';

export const useSignUp = () => {
  const [state, setState] = useState();

  //get global context
  const context = useContext(AuthContext);

  return [state, email => signUp(email, setState, context)];
};

export const useSignIn = () => {
  const [state, setState] = useState({});

  //get global context
  const context = useContext(AuthContext);

  return [state, () => signIn(setState, context)];
};

// hook for signing out
// in comparison to other hooks we only return the function, no state
export const useSignOut = () => {
  //get global context
  const context = useContext(AuthContext);

  return () => signOut(context);
};

// Amplifys Auth class is used to sign up user
const signUp = async (email, setState, { setUserId, setTempEmail }) => {
  try {
    setState('loading');

    const { default: Auth } = await import(
      /* webpackChunkName: "Amplify" */ '@aws-amplify/auth'
    );

    // We have to “generate” a password for them, because a password is required by Amazon Cognito when users sign up
    const { userSub } = await Auth.signUp({
      username: email,
      password: getRandomString(30),
    });

    //we want to set the newly generated id
    setUserId(userSub);
    setState('success');
  } catch (error) {
    //We have to check, if the error happened due to the user already existing
    if (error.code === 'UsernameExistsException') {
      // Save email, so we can use it for sign in later
      setTempEmail(email);
      setState('userExists');
    } else if (
      error.code === 'TooManyRequestsException' ||
      error.code === 'ThrottlingException'
    ) {
      // If the limit of cognito requests was reached we want to wait shortly and try again
      await sleep(1500);
      return signUp(email);
    } else {
      console.log('Error while signing up', error);
      setState('error');
    }
  }
};

// Sign in user through AWS Cognito (passwordless)
const signIn = async (setState, { setCognitoUser, userId, tempEmail }) => {
  try {
    const { default: Auth } = await import(
      /* webpackChunkName: "Amplify" */ '@aws-amplify/auth'
    );

    // This will initiate the custom flow, which will lead to the user receiving a mail.
    // The code will timeout after 3 minutes (enforced server side by AWS Cognito).
    const user = await Auth.signIn(userId || tempEmail);

    // We already set the user here in the global context,
    // because we need the object in answerCustomChallenge()
    setCognitoUser(user);
    setState('success');
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      setState('userNotFound');
    } else if (error.code === 'UserNotConfirmedException') {
      setState('userNotConfirmed');
    } else {
      setState('error');
    }
    console.log('Error while signing in', error);
  }
};

//Function, which uses the amplify api to sign out user
export const signOut = async ({
  setCognitoUser,
  setUserId,
  setIsAuthenticated,
}) => {
  console.log('sign out');
  try {
    const { default: Auth } = await import(
      /* webpackChunkName: "Amplify" */ '@aws-amplify/auth'
    );

    await Auth.signOut();

    // // Get scroll location
    // const scrollLocation = window.scrollY;
    // console.log(scrollLocation);

    // Remove URL params if existing
    const params = querystring.parse(window.location.search);
    if (params.userId) {
      params.userId = undefined;
    }
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${querystring.stringify(params)}`;
    navigate(newUrl, { replace: true });

    // Set scroll location
    // window.scroll(0, scrollLocation);

    // Update user state
    setCognitoUser(null);
    setUserId(undefined);
    setIsAuthenticated(false);
    return;
  } catch (error) {
    console.log('Error while signing out', error);
  }
};
