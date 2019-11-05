import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useVerification } from '../../hooks/Authentication';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import SocialMediaButtons from '../../components/SocialMedia/Share';
import s from './style.module.less';
import { HurrayCrowd } from '../../components/HurrayCrowd';
import cN from 'classnames';
import { Button } from '../../components/Forms/Button';

const Verification = () => {
  const [verificationState, confirmSignUp, resendEmail] = useVerification();
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

  /*
    verificationState can now be:
    - verifying
    - verified
    - alreadyVerified
    - userNotFound
    - wrongCode
    - expiredCode
    - resendingEmail
    - resentEmail
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

  if (
    verificationState === 'verifying' ||
    verificationState === 'resendingEmail'
  ) {
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
              {verificationState === 'expiredCode' && (
                <>
                  Dein Verfikationslink ist abgelaufen. Bitte klicke diese
                  Button, um einen neuen zu erhalten: <br /> <br />
                  <Button
                    onClick={() => {
                      resendEmail(urlParams.get('email'));
                    }}
                  >
                    Sende neue Verifikations-E-mail
                  </Button>
                </>
              )}
              {verificationState === 'resendingEmail' && 'Sende neue E-Mail...'}
              {verificationState === 'resentEmail' &&
                'Wir haben dir eine neue E-Mail geschickt. Bitte klicke darin den Link, und dann bist du dabei!'}
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
