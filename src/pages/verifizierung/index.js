import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useVerification } from '../../hooks/Authentication';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import SocialMediaButtons from '../../components/SocialMedia/Share';
import s from './style.module.less';
import { HurrayCrowd } from '../../components/HurrayCrowd';
import cN from 'classnames';
import { Button } from '../../components/Forms/Button';
import {
  CTAButtonContainer,
  CTALinkExternal,
} from '../../components/Layout/CTAButton';

const Verification = () => {
  const [verificationState, confirmSignUp, resendEmail] = useVerification();
  const [urlParamsComplete, setUrlParamsComplete] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    //get the verification code from the url
    const urlParams = new URLSearchParams(window.location.search);
    const confirmationCode = urlParams.get('code');
    setEmail(urlParams.get('email'));
    if (email && confirmationCode) {
      setUrlParamsComplete(true);
    }
    //only call confirm sign up the first time rendering
    if (verificationState === 'verifying') {
      confirmSignUp(email, confirmationCode).then(success =>
        console.log('success confirming ?', success)
      );
    }
  }, [email]);

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
          {hasError && 'Oooooops - Verifizierung fehlgeschlagen'}
        </>
      ),
      bodyTextSizeHuge: true,
      body: (
        <>
          {!isOk && (
            <FinallyMessage
              className={cN(s.finallyMessage, {
                [s.finallyMessageError]: hasError,
              })}
              state={finallyMessageState}
            >
              {verificationState === 'verifying' &&
                'Warte auf Verifizierung...'}
              {hasError && (
                <>
                  {!urlParamsComplete && (
                    <>
                      Der Link ist nicht komplett. Bitte kopiere ihn noch Mal
                      aus der Mail.
                      <br />
                      <br />
                    </>
                  )}
                  {verificationState === 'userNotFound' && (
                    <>
                      Wir haben den Benutzer "{email}" nicht in unserer
                      Datenbank gefunden. Ist die Registrierung vielleicht sehr
                      lange her?
                      <br />
                      <br />
                    </>
                  )}
                  Probiere es bitte ein weiteres Mal oder melde dich bei uns mit
                  dem Hinweiß zu der genauen Fehlermeldung. Nenne uns bitte
                  außerdem falls möglich deinen Browser und die Version:
                  <br />
                  <br />
                  <a href="mailto:support@expedition-grundeinkommen.de">
                    support@expedition-grundeinkommen.de
                  </a>
                </>
              )}
              {verificationState === 'expiredCode' && (
                <>
                  Dein Verifizierungslink ist abgelaufen. Bitte klicke diesen
                  Button, um einen neuen zu erhalten: <br /> <br />
                  <Button
                    onClick={() => {
                      resendEmail(email);
                    }}
                  >
                    Sende neue Verifizierungs-E-Mail
                  </Button>
                </>
              )}
              {verificationState === 'resendingEmail' && 'Sende neue E-Mail...'}
              {verificationState === 'resentEmail' &&
                'Wir haben dir eine neue E-Mail geschickt. Bitte klicke darin den Link, dann bist du dabei!'}
            </FinallyMessage>
          )}
          {isOk && <HurrayCrowd color="RED" />}
          <SocialMediaButtons
            className={cN(s.socialMedia, { [s.socialMediaSuccess]: isOk })}
          >
            Erzähl' auch anderen davon!
          </SocialMediaButtons>
        </>
      ),
    },
    {
      bodyTextSizeHuge: true,
      body: (
        <>
          <h2>Spende jetzt für die Expedition Grundeinkommen:</h2>
          <CTAButtonContainer illustration="POINT_LEFT">
            <CTALinkExternal href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8W54KDCT69GNU&source=url">
              Spenden mit Paypal/Kreditkarte
            </CTALinkExternal>
          </CTAButtonContainer>
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Verification;
