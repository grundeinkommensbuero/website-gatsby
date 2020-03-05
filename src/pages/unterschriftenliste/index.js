import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { LinkButton } from '../../components/Forms/Button';
import { useCreateSignatureList } from '../../hooks/Api/Signatures/Create';
import DownloadListsNextSteps from '../../components/Forms/DownloadListsNextSteps';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import { trackEvent, addActionTrackingId } from '../../components/utils';
import { StepListItem } from '../../components/StepList';
import querystring from 'query-string';
import { Link } from 'gatsby';

const trackingCategory = 'ListDownload';

const Unterschriftenliste = () => {
  const [state, pdf, , createPdf] = useCreateSignatureList({});
  const [campaignCode, setCampaignCode] = useState(null);

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    setCampaignCode(urlParams.campaignCode);

    if (urlParams.campaignCode !== 'berlin-1') {
      createPdf({
        userId: urlParams.userId,
        campaignCode: urlParams.campaignCode,
      });
    }
  }, []);

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
          {pdf && (
            <>
              <DownloadListsNextSteps>
                <StepListItem icon="download">
                  <LinkButton target="_blank" href={pdf.url}>
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

          {campaignCode === 'berlin-1' && (
            <FinallyMessage state="error">
              Für Berlin gibt es noch keine Unterschriftenlisten. Wir melden uns
              bei dir, sobald sie zur Verfügung stehen.
            </FinallyMessage>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Unterschriftenliste;
