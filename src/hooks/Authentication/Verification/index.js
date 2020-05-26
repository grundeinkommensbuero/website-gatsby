import { useState } from 'react';

export const useVerification = () => {
  const [verificationState, setVerificationState] = useState('verifying');
  return [
    verificationState,
    (email, code) => confirmSignUp(email, code, setVerificationState),
    email => resendEmail(email, setVerificationState),
  ];
};

// Amplifys Auth Class is used to send a confirmation code to verify the mail address
const confirmSignUp = async (email, confirmationCode, setVerificationState) => {
  try {
    const { default: Auth } = await import(
      /* webpackChunkName: "Amplify" */ '@aws-amplify/auth'
    );

    //use auth class to confirm sing up
    await Auth.confirmSignUp(email.toLowerCase(), confirmationCode);
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

    const { default: Auth } = await import(
      /* webpackChunkName: "Amplify" */ '@aws-amplify/auth'
    );

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
