import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { LinkButton } from '../../components/Forms/Button';
import { useCreateSignatureList } from '../../hooks/Api/Signatures';
import DownloadListsNextSteps from '../../components/Forms/DownloadListsNextSteps';

const Unterschriftenliste = () => {
  const [state, createPdf] = useCreateSignatureList({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    createPdf({
      userId: urlParams.get('userId'),
      campaignCode: urlParams.get('campaignCode'),
    });
  }, []);

  const sections = [
    {
      title: <>Lade deine Unterschriftenliste herunter!</>,
      bodyTextSizeHuge: true,
      body: (
        <>
          {state.state === 'creating' && 'Liste wird generiert'}
          {state.state === 'error' && 'Da ist was schief gegangen :-/'}
          {state.pdf && (
            <DownloadListsNextSteps needsVerification={false}>
              <LinkButton target="_blank" href={state.pdf.url}>
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
