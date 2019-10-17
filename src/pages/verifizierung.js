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
    console.log('urlparams', urlParams);
    console.log('email param', email);
    //only call confirm sign up the first time rendering
    if (verificationState === 'verifying') {
      confirmSignUp(email, confirmationCode).then(success =>
        console.log('success confirming ?', success)
      );
    }
  });

  /*
    verificationState can now be: 
    - verifying
    - verified
    - alreadyVerified
    - userNotFound
    - wrongCode
    - error (which is every other error)
  */
  const sections = [
    {
      title: (
        <>
          {verificationState === 'verifying' && 'Verifizierung...'}
          {verificationState === 'verified' && 'Super! Du bist dabei!'}
          {verificationState === 'error' && 'Verifizierung fehlgeschlagen 😕'}
        </>
      ),
      bodyTextSizeHuge: true,
      body: (
        <>
          {verificationState === 'verified' && (
            <p>
              Super! Du bist dabei! Du bekommst Mails von uns, wenn es etwas zu
              tun gibt, was deinen Interessen entspricht.
            </p>
          )}
          {verificationState === 'error' && (
            <p>
              Das hat leider nicht geklappt. Bitte probiere es noch ein mal,
              oder schreib uns an{' '}
              <a href="mailto:support@expedition-grundeinkommen.de">
                support@expedition-grundeinkommen.de
              </a>
              .
            </p>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Verification;
