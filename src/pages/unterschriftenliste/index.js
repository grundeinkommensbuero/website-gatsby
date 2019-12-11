import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { LinkButton } from '../../components/Forms/Button';
import { useCreateSignatureList } from '../../hooks/Api/Signatures';
import DownloadListsNextSteps from '../../components/Forms/DownloadListsNextSteps';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import s from './style.module.less';
import { trackEvent } from '../../components/utils';

const Unterschriftenliste = () => {
  const [state, createPdf] = useCreateSignatureList({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    createPdf({
      userId: urlParams.get('userId'),
      campaignCode: urlParams.get('campaignCode'),
    });
  }, []);

  if (state.state === 'error') {
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('downloadCreationDirectError', signaturesId),
    });
  }

  if (state.state === 'created') {
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('downloadCreatedFromMail', signaturesId),
    });
  }

  const sections = [
    {
      bodyTextSizeHuge: true,
      body: (
        <>
          <p>Schön, dass du mit uns sammelst. So geht’s:</p>
          {state.state === 'creating' && (
            <FinallyMessage state="progress">
              Liste wird generiert, bitte einen Moment Geduld...
            </FinallyMessage>
          )}
          {state.state === 'error' && (
            <FinallyMessage state="error">
              Da ist was schief gegangen
            </FinallyMessage>
          )}
          {state.pdf && (
            <DownloadListsNextSteps needsVerification={false}>
              <LinkButton
                target="_blank"
                href={state.pdf.url}
                className={s.button}
              >
                Liste Herunterladen
              </LinkButton>
            </DownloadListsNextSteps>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Unterschriftenliste;
