import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useVerification } from '../hooks/Authentication';
import { FinallyMessage } from '../components/Forms/FinallyMessage';
import SocialMediaButtons from '../components/SocialMediaButtons';

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

  const hasError = ['userNotFound', 'wrongCode', 'error'].includes(
    verificationState
  );

  const isOk = ['verified', 'alreadyVerified'].includes(verificationState);

  let finallyMessageState;

  if (isOk) {
    finallyMessageState = 'success';
  }

  if (verificationState === 'verifying') {
    finallyMessageState = 'progress';
  }

  const sections = [
    {
      title: (
        <>
          {verificationState === 'verifying' && 'Verifizierung...'}
          {isOk && 'Juhuu - Du bist dabei!'}
          {hasError && 'Oooooops - Verifizierung fehlgeschlagen 😕'}
        </>
      ),
      bodyTextSizeHuge: true,
      body: (
        <>
          <FinallyMessage state={finallyMessageState}>
            {verificationState === 'verifying' && 'Warte auf Verifizierung...'}
            {isOk &&
              'Super! Du bist dabei! Du bekommst Mails von uns, wenn es etwas zu tun gibt, was deinen Interessen entspricht.'}
            {hasError && (
              <>
                Das hat leider nicht geklappt. Bitte probiere es noch ein Mal,
                oder schreib uns auch gerne eine Mail an{' '}
                <a href="mailto:support@expedition-grundeinkommen.de">
                  support@expedition-grundeinkommen.de
                </a>
                .
              </>
            )}
          </FinallyMessage>
          <SocialMediaButtons message="Folge uns in den sozialen Medien!" />
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Verification;
