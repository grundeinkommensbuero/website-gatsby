import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { LinkButtonLocal, LinkButton } from '../../components/Forms/Button';
import { useCreateSignatureList } from '../../hooks/Api/Signatures/Create';
import DownloadListsNextSteps from '../../components/Forms/DownloadListsNextSteps';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import s from './style.module.less';
import { trackEvent, addActionTrackingId } from '../../components/utils';
import { CTAButtonContainer } from '../../components/Layout/CTAButton';
import { StepListItem } from '../../components/StepList';
import querystring from 'query-string';
import { Link } from 'gatsby';

const trackingCategory = 'ListDownload';

const CTAs = {
  'schleswig-holstein-1': {
    text: 'Mehr Infos',
    link: 'schleswig-holstein',
  },
  'brandenburg-1': {
    text: 'Mehr Infos',
    link: 'brandenburg',
  },
  'hamburg-1': {
    text: 'Mehr Infos',
    link: 'hamburg',
  },
  'bremen-1': {
    text: 'Mehr Infos',
    link: 'bremen',
  },
  'berlin-1': {
    text: 'Mehr Infos',
    link: 'berlin',
  },
};

const Unterschriftenliste = () => {
  const [state, createPdf] = useCreateSignatureList({});
  const [campaignCode, setCampaignCode] = useState(null);

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    setCampaignCode(urlParams.campaignCode);
    createPdf({
      userId: urlParams.userId,
      campaignCode: urlParams.campaignCode,
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
          <p>Schön, dass du mit uns sammelst. So geht’s weiter:</p>
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
            <>
              <DownloadListsNextSteps>
                <StepListItem icon="download">
                  <LinkButton target="_blank" href={state.pdf.url}>
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
              {CTAs[campaignCode] && (
                <CTAButtonContainer>
                  <LinkButtonLocal to={CTAs[campaignCode].link}>
                    {CTAs[campaignCode].text}
                  </LinkButtonLocal>
                </CTAButtonContainer>
              )}
            </>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Unterschriftenliste;
