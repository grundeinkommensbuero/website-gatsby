import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useVerification } from '../../hooks/Authentication';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import SocialMediaButtons from '../../components/SocialMedia/Share';
import s from './style.module.less';
import { HurrayCrowd } from '../../components/HurrayCrowd';
import cN from 'classnames';
import { Button } from '../../components/Forms/Button';
import { CTALink } from '../../components/Layout/CTAButton';
import querystring from 'query-string';

const Verification = () => {
  const [verificationState, confirmSignUp, resendEmail] = useVerification();
  const [urlParams, setUrlParams] = useState(null);
  const urlParamsComplete = !!(urlParams && urlParams.code && urlParams.email);

  useEffect(() => {
    const params = querystring.parse(window.location.search);

    setUrlParams(params);
  }, [setUrlParams]);

  useEffect(() => {
    if (urlParams) {
      confirmSignUp(urlParams.email, urlParams.code);
    }
  }, [urlParams]);

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
                      Wir haben "{urlParams.email}" nicht in unserer Datenbank
                      gefunden. Ist die Registrierung vielleicht sehr lange her?
                      <br />
                      <br />
                    </>
                  )}
                  Probiere es bitte ein weiteres Mal oder melde dich bei uns mit
                  dem Hinweis zu der genauen Fehlermeldung. Nenne uns bitte
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
                      resendEmail(urlParams.email);
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
          {isOk && (
            <>
              <FinallyMessage>
                <p>
                  Wir sind gemeinnützig und auf Spenden angewiesen. Bitte
                  unterstütze uns auch finanziell.
                </p>
                <CTALink to="/spenden">Jetzt spenden</CTALink>
              </FinallyMessage>

              <HurrayCrowd color="RED" />
            </>
          )}
        </>
      ),
    },
    {
      bodyTextSizeHuge: true,
      body: (
        <SocialMediaButtons>Erzähl’ auch anderen davon!</SocialMediaButtons>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Verification;
