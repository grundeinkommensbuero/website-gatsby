import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { LinkButton } from '../../components/Forms/Button';
import { useCreateSignatureList } from '../../hooks/Api/Signatures';
import DownloadListsNextSteps from '../../components/Forms/DownloadListsNextSteps';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import s from './style.module.less';
import { trackEvent, addActionTrackingId } from '../../components/utils';

const trackingCategory = 'ListDownload';

const Unterschriftenliste = () => {
  const [state, createPdf] = useCreateSignatureList({});
  let campaignCode;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    campaignCode = urlParams.get('campaignCode');
    createPdf({
      userId: urlParams.get('userId'),
      campaignCode: urlParams.get('campaignCode'),
    });
  }, []);

  if (state.state === 'error') {
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('downloadCreationDirectError', campaignCode),
    });
  }

  if (state.state === 'created') {
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
