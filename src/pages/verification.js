import React from 'react';
import Auth from '@aws-amplify/auth';
import Layout from '../components/Layout';

const Verification = () => {
  let message;
  confirmSignUp().then(success => {
    if (success) {
      message = 'Deine E-Mail wurde erfolgreich verifiziert';
    } else {
      message = 'Verifizierung fehlgeschlagen';
    }
  });

  return (
    <Layout>
      <p>{message}</p>
    </Layout>
  );
};

const confirmSignUp = async () => {
  //get the verification code from the url
  const urlParams = new URLSearchParams(window.location.search);
  const confirmationCode = urlParams.get('code');
  const email = urlParams.get('email');
  try {
    //use auth class to confirm sing up
    const response = await Auth.confirmSignUp(email, confirmationCode);
    console.log('response', response);
    return true;
  } catch (error) {
    console.log('error confirming email');
    return false;
  }
};

export default Verification;
