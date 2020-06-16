import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../components/Layout';
import { LinkButton, InlineButton } from '../../components/Forms/Button';
import { useCreateSignatureList } from '../../hooks/Api/Signatures/Create';
import DownloadListsNextSteps from '../../components/Forms/DownloadListsNextSteps';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import { trackEvent, addActionTrackingId } from '../../components/utils';
import { StepListItem } from '../../components/StepList';
import querystring from 'query-string';
import { Link } from 'gatsby';
import EnterLoginCode from '../../components/EnterLoginCode';
import AuthContext from '../../context/Authentication';

const trackingCategory = 'ListDownload';

const Unterschriftenliste = () => {
  const [state, pdf, , createPdf] = useCreateSignatureList({});
  const [campaignCode, setCampaignCode] = useState(null);
  const { userId, setUserId, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    setCampaignCode(urlParams.campaignCode);
    setUserId(urlParams.userId);
  }, []);

  useEffect(() => {
    if (campaignCode && userId && !isAuthenticated) {
      createPdf({
        campaignCode,
        userExists: true,
      });
    }
  }, [userId]);

  useEffect(() => {
    // We also need to check if the state is 'unauthorized',
    // otherwise we might make a successful call twice if user already had a sesssion
    // (because it takes some time for that be checked)
    if (campaignCode && isAuthenticated && state === 'unauthorized') {
      createPdf({
        campaignCode,
        userExists: true,
        shouldNotUpdateUser: true,
      });
    }
  }, [isAuthenticated, state]);

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
          {state === 'unauthorized' && (
            <EnterLoginCode>
              <p>
                Hey, wir kennen dich schon! Bitte gib den Code ein, den wir dir
                gerade in einer E-Mail geschickt haben. Alternativ kannst du
                auch eine Liste{' '}
                <InlineButton
                  onClick={() => {
                    createPdf({ campaignCode });
                  }}
                  type="button"
                >
                  hier
                </InlineButton>{' '}
                anonym herunterladen.
              </p>
            </EnterLoginCode>
          )}
          {state === 'created' && (
            <>
              <DownloadListsNextSteps>
                <StepListItem icon="download">
                  <LinkButton target="_blank" href={"/0337185.pdf"/*just demo magic*/}>
                    Listen herunterladen
                  </LinkButton>
                  {campaignCode === 'hamburg-1' && (
                    <p>
                      Den Gesetzestext findest du im{' '}
                      <Link to="downloads/#Gesetzestexte">Downloadbereich</Link>
                      .
                    </p>
                  )}
                </StepListItem>
              </DownloadListsNextSteps>
            </>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Unterschriftenliste;
