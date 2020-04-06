/**
 * This file holds several hook functions regarding everything concerning authentication
 */
import Auth from '@aws-amplify/auth';
import { getRandomString } from '../../components/utils';
import { sleep } from '../utils';
import { useContext, useState } from 'react';
import AuthContext from '../../context/Authentication';

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

export const useAnswerChallenge = () => {
  const [state, setState] = useState({});

  //get global context
  const context = useContext(AuthContext);

  return [state, answer => answerCustomChallenge(answer, setState, context)];
};

export const useVerification = () => {
  const [verificationState, setVerificationState] = useState('verifying');
  return [
    verificationState,
    (email, code) => confirmSignUp(email, code, setVerificationState),
    email => resendEmail(email, setVerificationState),
  ];
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

// Amplifys Auth Class is used to send a confirmation code to verify the mail address
const confirmSignUp = async (email, confirmationCode, setVerificationState) => {
  try {
    //use auth class to confirm sing up
    const response = await Auth.confirmSignUp(email, confirmationCode);
    setVerificationState('verified');
    return true;
  } catch (error) {
    console.log('error confirming email', error);
    const errorCode = error.code;
    if (errorCode === 'UserNotFoundException') {
      setVerificationState('userNotFound');
    } else if (errorCode === 'CodeMismatchException') {
      setVerificationState('wrongCode');
    } else if (errorCode === 'NotAuthorizedException') {
      setVerificationState('alreadyVerified');
    } else if (errorCode === 'ExpiredCodeException') {
      setVerificationState('expiredCode');
    } else {
      setVerificationState('error');
    }
    return false;
  }
};

// Amplifys Auth Class is used to resend the confirmation mail
const resendEmail = async (email, setVerificationState) => {
  try {
    setVerificationState('resendingEmail');
    await Auth.resendSignUp(email);
    setVerificationState('resentEmail');
    return true;
  } catch (error) {
    console.log('error resending confirmation mail');
    setVerificationState('error');
    //TODO: more specific error states
    return false;
  }
};

// Sign in user through AWS Cognito (passwordless)
const signIn = async (setState, { setCognitoUser, tempEmail }) => {
  try {
    // This will initiate the custom flow, which will lead to the user receiving a mail.
    // The code will timeout after 3 minutes (enforced server side by AWS Cognito).
    const user = await Auth.signIn(tempEmail);

    // We already set the user here in the global context,
    // because we need the object in answerCustomChallenge()
    setCognitoUser(user);
    setState('success');
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      setState('userNotFound');
    } else {
      setState('error');
    }
    console.log('Error while signing in', error);
  }
};

// Function to send login code to aws
const answerCustomChallenge = async (
  answer,
  setState,
  { cognitoUser, setCognitoUser }
) => {
  // Send the answer to the User Pool
  try {
    setState('loading');
    // sendCustomChallengeAnswer() will throw an error if it’s the 3rd wrong answer
    const tempUser = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);

    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    try {
      // This will throw an error if the user is not yet authenticated:
      await Auth.currentSession();
      //User is now signed in
      setState('success');

      //use context to set user in global state
      setCognitoUser(tempUser);
    } catch (error) {
      setState('wrongCode');
      console.log('Apparently the user did not enter the right code', error);
    }
  } catch (error) {
    setState('wrongCode');
    console.log(
      'User entered wrong code three times or user was never set',
      error
    );
  }
};

//Function, which uses the amplify api to sign out user
const signOut = async ({ setCognitoUser }) => {
  try {
    await Auth.signOut();

    //use context to set user in global state
    setCognitoUser(null);
  } catch (error) {
    console.log('Error while signing out', error);
  }
};
