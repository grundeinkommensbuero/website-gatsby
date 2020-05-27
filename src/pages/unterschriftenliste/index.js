import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../components/Layout';
import { LinkButton, InlineButton } from '../../components/Forms/Button';
import { useCreateSignatureList } from '../../hooks/Api/Signatures/Create';
import DownloadListsNextSteps from '../../components/Forms/DownloadListsNextSteps';
import { FinallyMessage } from '../../components/Forms/FinallyMessage';
import { trackEvent, addActionTrackingId } from '../../components/utils';
import { StepListItem } from '../../components/StepList';
import querystring from 'query-string';
import { Link, useStaticQuery, graphql } from 'gatsby';
import EnterLoginCode from '../../components/EnterLoginCode';
import AuthContext from '../../context/Authentication';
import { CrowdFundingVisualistation } from '../../components/CampaignVisualisations';

const trackingCategory = 'ListDownload';

const Unterschriftenliste = () => {
  const [state, pdf, , createPdf] = useCreateSignatureList({});
  const [campaignCode, setCampaignCode] = useState(null);
  const { userId, isAuthenticated } = useContext(AuthContext);

  const { contentfulKampagnenvisualisierung } = useStaticQuery(graphql`
    query CrowdFunding2 {
      contentfulKampagnenvisualisierung(
        id: {}
        contentful_id: { eq: "CtJiVXntFoWu7oWhehzvf" }
      ) {
        campainCode
        goal
        startDate
        title
        minimum
        maximum
        addToSignatureCount
        ctaLink
        eyeCatcher {
          json
        }
        goalUnbuffered
        goalInbetweenMultiple
        startnextId
        hint {
          hint
        }
      }
    }
  `);

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    setCampaignCode(urlParams.campaignCode);
  }, []);

  useEffect(() => {
    if (campaignCode && userId) {
      // This will fail if userId has newsletter consent value of false
      createPdf({
        campaignCode,
        userExists: true,
      });
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

          {state === 'created' && (
            <>
              {/* <FinallyMessage>
                Juhu! Die Unterschriftslisten samt Leitfaden sind in deinem
                Postfach!
              </FinallyMessage> */}
              <p>
                Bitte unterstütze auch unser Crowdfunding! Mit 24.000 Euro
                können wir die Unterschriftensammlung in Berlin zu Ende bringen.
              </p>
              <CrowdFundingVisualistation
                {...contentfulKampagnenvisualisierung}
              />
            </>
          )}
        </>
      ),
    },
  ];

  return <Layout sections={sections} />;
};

export default Unterschriftenliste;
