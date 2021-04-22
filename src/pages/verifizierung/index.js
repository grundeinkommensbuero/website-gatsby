import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useVerification } from '../../hooks/Authentication';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import SocialMediaButtons from '../../components/SocialMedia/Share';
import * as s from './style.module.less';
import { HurrayCrowd } from '../../components/HurrayCrowd';
import cN from 'classnames';
import { CTALink } from '../../components/Layout/CTAButton';
import querystring from 'query-string';

const Verification = () => {
  const [verificationState, confirmSignUp] = useVerification();
  const [urlParams, setUrlParams] = useState(null);
  const urlParamsComplete = !!(
    urlParams &&
    urlParams.userId &&
    urlParams.token
  );

  useEffect(() => {
    const params = querystring.parse(window.location.search);

    setUrlParams(params);
  }, [setUrlParams]);

  useEffect(() => {
    if (urlParams) {
      confirmSignUp(urlParams.userId, urlParams.token);
    }
  }, [urlParams]);

  /*
    verificationState can now be:
    - verifying
    - verified
    - userNotFound
    - error (which is every other error)
  */

  const hasError = ['userNotFound', 'error'].includes(verificationState);

  const isOk = verificationState === 'verified';

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
                      Wir haben dich nicht in unserer Datenbank gefunden. Ist
                      die Registrierung vielleicht sehr lange her?
                      <br />
                      <br />
                    </>
                  )}
                  {verificationState === 'error' && urlParamsComplete && (
                    <>
                      Möglicherweise ist der Zeitraum der Verifizierung bereits
                      abgelaufen. Melde dich einfach bei{' '}
                      <a href="mailto:support@expedition-grundeinkommen.de">
                        support@expedition-grundeinkommen.de
                      </a>
                      , dann können wir dich manuell verifizieren.
                      <br />
                      <br />
                    </>
                  )}
                </>
              )}
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
