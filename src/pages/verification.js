import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useVerification } from '../hooks/Authentication';

const Verification = () => {
  const [verificationState, confirmSignUp] = useVerification();
  //call the following in use effect, because window is not available during server side rendering
  useEffect(() => {
    //get the verification code from the url
    const urlParams = new URLSearchParams(window.location.search);
    const confirmationCode = urlParams.get('code');
    const email = urlParams.get('email');
    //only call confirm sign up the first time rendering
    if (verificationState === 'verifying') {
      confirmSignUp(email, confirmationCode).then(success =>
        console.log('success confirming ?', success)
      );
    }
  });

  let message = '';
  if (verificationState === 'verifying') {
    message = 'verifizierung...';
  } else if (verificationState === 'verified') {
    message = 'Deine E-Mail wurde erfolgreich verifiziert';
  } else if (verificationState === 'error') {
    message = 'Verifizierung fehlgeschlagen';
  }

  return (
    <Layout>
      <p>{message}</p>
    </Layout>
  );
};

export default Verification;
