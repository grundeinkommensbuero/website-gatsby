import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../components/Layout';
import { InlineButton } from '../../components/Forms/Button';
import { useCreateSignatureList } from '../../hooks/Api/Signatures/Create';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import { trackEvent, addActionTrackingId } from '../../components/utils';
import querystring from 'query-string';
import { navigate } from 'gatsby';
import { EnterLoginCode } from '../../components/Login/EnterLoginCode';
import AuthContext from '../../context/Authentication';

const trackingCategory = 'ListDownload';

const Unterschriftenliste = () => {
  const [state, pdf, anonymous, createPdf] = useCreateSignatureList({});
  // Default should be berlin-2, if people forget it in a newsletter or wherever
  const [campaignCode, setCampaignCode] = useState('berlin-2');
  const { userId, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);

    if (urlParams.campaignCode) {
      setCampaignCode(urlParams.campaignCode);
    }
  }, []);

  // As soon as signature list is created we navigate to to "checkpoints" page
  // But only if download was not anonymous

  useEffect(() => {
    if (state === 'created' && pdf.url && !anonymous) {
      navigate('/unterschreiben-schritte', { state: { pdfUrl: pdf.url } });
    }
  }, [state, pdf]);

  useEffect(() => {
    if (campaignCode && userId) {
      if (isAuthenticated) {
        createPdf({
          campaignCode,
          userExists: true,
          shouldNotUpdateUser: true,
        });
      }
    }
  }, [isAuthenticated, userId, campaignCode]);

  if (state === 'error') {
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('downloadCreationDirectError', campaignCode),
    });
  }

  if (state === 'created') {
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('downloadCreatedFromMail', campaignCode),
    });
  }

  const sections = [
    {
      bodyTextSizeHuge: true,
      body: (
        <>
          <p>Schön, dass du mit uns sammelst. So geht’s weiter:</p>
          {state === 'creating' && (
            <FinallyMessage state="progress">
              Liste wird generiert, bitte einen Moment Geduld...
            </FinallyMessage>
          )}
          {state === 'error' && (
            <FinallyMessage state="error">
              Da ist was schief gegangen
            </FinallyMessage>
          )}
          {isAuthenticated === false && !state && (
            <EnterLoginCode
              wrongCodeMessage={
                <>
                  <p>
                    Der eingegebene Code ist falsch oder bereits abgelaufen.
                    Bitte überprüfe die Email erneut oder fordere unten einen
                    neuen Code an.
                  </p>
                  <p>
                    Du kannst auch eine Liste{' '}
                    <InlineButton
                      onClick={() => {
                        createPdf({ campaignCode, anonymous: true });
                      }}
                      type="button"
                    >
                      hier
                    </InlineButton>{' '}
                    anonym herunterladen.
                  </p>
                </>
              }
            >
              <p>
                Hey, wir kennen dich schon! Bitte gib den Code ein, den wir dir
                gerade in einer E-Mail geschickt haben. Alternativ kannst du
                auch eine Liste{' '}
                <InlineButton
                  onClick={() => {
                    createPdf({ campaignCode, anonymous: true });
                  }}
                  type="button"
                >
                  hier
                </InlineButton>{' '}
                anonym herunterladen.
              </p>
            </EnterLoginCode>
          )}

          {state === 'created' && anonymous && (
            <FinallyMessage state="success">
              <p>
                Juhu!{' '}
                <a target="_blank" rel="noreferrer" href={pdf.url}>
                  Hier
                </a>{' '}
                kannst du die Unterschriftslisten herunterladen!
              </p>
            </FinallyMessage>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Unterschriftenliste;
