/**
 * This file holds several hook functions regarding everything concerning authentication
 */
import Auth from '@aws-amplify/auth';
import { getRandomString } from '../../components/utils';
import { useContext, useState } from 'react';
import AuthContext from '../../context/Authentication';

export const useAuthentication = () => {
  return [signUp];
};

export const useVerification = () => {
  const [verificationState, setVerificationState] = useState('verifying');
  return [
    verificationState,
    (email, code) => confirmSignUp(email, code, setVerificationState),
    email => resendEmail(email, setVerificationState),
  ];
};

export const useGlobalState = () => {
  return useContext(AuthContext);
};

// Amplifys Auth class is used to sign up user
const signUp = async email => {
  try {
    // We have to “generate” a password for them, because a password is required by Amazon Cognito when users sign up
    const user = await Auth.signUp({
      username: email,
      password: getRandomString(30),
    });
    //we want to return the newly generated id
    return user.userSub;
  } catch (error) {
    //We have to check, if the error happened due to the user already existing
    if (error.code === 'UsernameExistsException') {
      return 'userExists';
    } else {
      //TODO: Error handling in UI?
      console.log('Error while signing up', error);
      return 'error';
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

/*
  Not needed anymore until we really need a login


// This functions calls signUp (which creates the user in aws user pool)
// and signIn (which starts the custom flow of sending the magic code to the mail address)
const startSignInProcess = async (mail, context) => {
  //const defaultMail = 'valentin@grundeinkommensbuero.de';
  const { state, setUser } = context;
  console.log('state', state);
  try {
    await signUp(mail);
    await signIn(mail, context);
  } catch (error) {
    //We have to check, if the error happened due to the user already existing
    //If that's the case we call signIn() anyway
    if (error.code === 'UsernameExistsException') {
      console.log('user already exists, signing in...');
      await signIn(mail, context);
    } else {
      //TODO: Error handling in UI?
      console.log('Error while signing up', error);
    }
  }
};

// Function to send login code to aws
const answerCustomChallenge = async (answer, context) => {
  // Send the answer to the User Pool
  try {
    //we want to get the user object, which we have saved in our global state,
    //because we need to pass it to sendCustomChallengeAnswer
    const { state, setUser, setIsAuthenticated } = context;
    console.log('state', state);
    // sendCustomChallengeAnswer() will throw an error if it’s the 3rd wrong answer
    const user = await Auth.sendCustomChallengeAnswer(state.user, answer);
    console.log('user after sending challenge', user);
    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    try {
      // This will throw an error if the user is not yet authenticated:
      await Auth.currentSession();
      //User is now signed in
      //use context hook to set user in global state
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      //TODO: Error handling in UI: wrong code
      console.log('Apparently the user did not enter the right code', error);
    }
  } catch (error) {
    console.log(
      'User entered wrong code three times or user was never set',
      error
    );
  }
};

//Function, which uses the amplify api to sign out user
export const signOut = async () => {
  try {
    await Auth.signOut();
    //use context hook to set user in global state
    const { setUser, setIsAuthenticated } = useContext(AuthContext);
    setUser(null);
    setIsAuthenticated(false);
  } catch (error) {
    //TODO: Error handling in UI: Sign out error
    console.log('Error while signing out', error);
  }
};

// helper function Function to sign up user through AWS Cognito
// Tutorial: https://aws.amazon.com/de/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito/
const signUp = async email => {
  // We have to “generate” a password for them, because a password is required by Amazon Cognito when users sign up
  console.log(
    await Auth.signUp({
      username: email,
      password: getRandomString(30),
      attributes: {
        name: 'testperson2',
      },
    })
  );
};

// Sign in user through AWS Cognito (passwordless)
const signIn = async (email, context) => {
  try {
    // This will initiate the custom flow, which will lead to the user receiving a mail.
    // The code will timeout after 3 minutes (enforced server side by AWS Cognito).
    const user = await Auth.signIn(email);
    console.log('called Auth.signIn()', user);
    //we already set the user here, because we need the object in answerCustomChallenge()
    context.setUser(user);
    console.log('context', context);
  } catch (error) {
    //TODO: Error handling in UI?
    console.log('Error while signing in', error);
  }
};

*/
