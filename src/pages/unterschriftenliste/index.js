import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { LinkButton } from '../../components/Forms/Button';
import { useCreatePdfWithUser } from '../../hooks/Api/Signatures';

const Unterschriftenliste = () => {
  const [state, createPdf] = useCreatePdfWithUser({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    createPdf({
      email: urlParams.get('email'),
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
            <LinkButton target="_blank" href={state.pdf.url}>
              Download!
            </LinkButton>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Unterschriftenliste;
