import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useVerification } from '../../hooks/Authentication';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import SocialMediaButtons from '../../components/SocialMediaButtons';
import s from './style.module.less';
import { HurrayCrowd } from '../../components/HurrayCrowd';
import cN from 'classnames';

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
          {isOk && 'Juhuu - du bist dabei!'}
          {hasError && 'Oooooops - Verifizierung fehlgeschlagen 😕'}
        </>
      ),
      bodyTextSizeHuge: true,
      body: (
        <>
          {!isOk && (
            <FinallyMessage
              className={s.finallyMessage}
              state={finallyMessageState}
            >
              {verificationState === 'verifying' &&
                'Warte auf Verifizierung...'}
              {hasError && (
                <>
                  Das hat leider nicht geklappt. Bitte probiere es noch einmal,
                  oder schreib uns eine E-Mail an{' '}
                  <a href="mailto:support@expedition-grundeinkommen.de">
                    support@expedition-grundeinkommen.de
                  </a>
                  .
                </>
              )}
            </FinallyMessage>
          )}
          {isOk && <HurrayCrowd />}
          <SocialMediaButtons
            className={cN(s.socialMedia, { [s.socialMediaSuccess]: isOk })}
          >
            Folge uns in den sozialen Medien:
          </SocialMediaButtons>
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Verification;
