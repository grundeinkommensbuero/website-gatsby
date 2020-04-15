import React, { useEffect, useState, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { TextInputWrapped } from '../TextInput';
import { validateEmail, addActionTrackingId, trackEvent } from '../../utils';
import s from './style.module.less';
import { CTAButton, CTAButtonContainer } from '../../Layout/CTAButton';
import DownloadListsNextSteps from '../DownloadListsNextSteps';
import { LinkButton, InlineButton } from '../Button';
import { FinallyMessage } from '../FinallyMessage';
import { StepListItem } from '../../StepList';
import { useCreateSignatureList } from '../../../hooks/Api/Signatures/Create';
import { useSignUp } from '../../../hooks/Authentication';
import EnterLoginCode from '../../EnterLoginCode';
import AuthContext from '../../../context/Authentication';
import AuthInfo from '../../AuthInfo';
import { graphql, useStaticQuery } from 'gatsby';
import { CrowdFundingVisualistation } from '../../CampaignVisualisations';

const trackingCategory = 'ListDownload';

export default ({ signaturesId }) => {
  const [state, pdf, anonymous, createPdf] = useCreateSignatureList();
  const [signUpState, signUp] = useSignUp();
  const [email, setEmail] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // We need the following flag to check if we want to update newsletter consent
  const [wasAlreadyAuthenticated, setWasAlreadyAuthenticated] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { contentfulKampagnenvisualisierung } = useStaticQuery(graphql`
    query CrowdFunding {
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
    // If user was registered proceed by creating list
    if (signUpState === 'success') {
      createPdf({ email, campaignCode: signaturesId });
    } else if (signUpState === 'userExists') {
      createPdf({
        email,
        campaignCode: signaturesId,
        userExists: true,
      });
    }
  }, [signUpState]);

  useEffect(() => {
    if (isAuthenticated && hasSubmitted) {
      createPdf({
        campaignCode: signaturesId,
        userExists: true,
        shouldNotUpdateUser: wasAlreadyAuthenticated,
      });
    }
  }, [isAuthenticated, hasSubmitted, wasAlreadyAuthenticated]);

  if (state === 'unauthorized') {
    return (
      <EnterLoginCode>
        <p>
          Hey, wir kennen dich schon! Bitte gib den Code ein, den wir dir gerade
          in einer E-Mail geschickt haben. Alternativ kannst du auch eine Liste{' '}
          <InlineButton
            onClick={() => {
              createPdf({ campaignCode: signaturesId });
            }}
            type="button"
          >
            hier
          </InlineButton>{' '}
          anonym herunterladen.
        </p>
      </EnterLoginCode>
    );
  }

  if (state === 'creating') {
    return (
      <FinallyMessage state="progress">
        Liste wird generiert, bitte einen Moment Geduld...
      </FinallyMessage>
    );
  }

  if (state === 'error') {
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('downloadCreationError', signaturesId),
    });

    return (
      <FinallyMessage state="error">
        Da ist was schief gegangen. Melde dich bitte bei uns{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>
        .
      </FinallyMessage>
    );
  }

  if (state === 'created') {
    return (
      <>
        {!anonymous ? (
          <>
            <p>
              Juhu! Die Unterschriftslisten und unser Sammelleitfaden sind in
              deinem Postfach. Du kannst sie dir auch{' '}
              <a target="_blank" href={pdf.url}>
                direkt im Browser herunterladen
              </a>{' '}
              - alle weiteren Infos findest du dort!
            </p>
          </>
        ) : (
          <p>
            Schön, dass du mit uns sammelst. Mit der Liste findest du einen
            Leitfaden für die weiteren Schritte.
          </p>
        )}

        {!anonymous && signUpState !== 'userExists' && (
          <StepListItem icon="mail">
            Check deine Mails und klick den Link, damit du dabei bist.
          </StepListItem>
        )}
        {anonymous && (
          <StepListItem icon="download">
            <LinkButton target="_blank" href={pdf.url}>
              Listen herunterladen
            </LinkButton>
          </StepListItem>
        )}
        <div className={s.crowdFunding}>
          <p>
            Noch eine Bitte: Gerade im Homeoffice haben viele Menschen keinen
            Zugang zu einem Drucker. Bitte hilf uns, damit wir diesen Menschen
            Listen per Post zusenden können. Ab 15.000 Euro beginnen wir mit dem
            Versand der Listen per Post - damit wir die Frist zur Bundestagswahl
            2021 in Berlin schaffen können, zählt jetzt jeder Tag und jede
            Unterschrift!{' '}
          </p>
          <CrowdFundingVisualistation {...contentfulKampagnenvisualisierung} />
        </div>
      </>
    );
  }

  return (
    <>
      <Form
        onSubmit={e => {
          if (!isAuthenticated) {
            setEmail(e.email);
            signUp(e.email);
          } else {
            setWasAlreadyAuthenticated(true);
          }

          setHasSubmitted(true);
        }}
        validate={values => validate(values, isAuthenticated)}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              {!isAuthenticated ? (
                <>
                  <p className={s.hint}>
                    Schickt mir die Unterschriftenliste, erinnert mich an das
                    Zurücksenden und haltet mich auf dem Laufenden. Ich kann die
                    Liste{' '}
                    <InlineButton
                      onClick={() => {
                        createPdf({ campaignCode: signaturesId });
                      }}
                      type="button"
                    >
                      hier auch anonym herunterladen
                    </InlineButton>
                    .
                    <br />
                    Kein Drucker?{' '}
                    <a
                      target="_blanl"
                      href="https://expeditionbge.typeform.com/to/Dq3SOi"
                    >
                      Bitte schickt mir Unterschriftenlisten per Post
                    </a>
                    !
                  </p>
                  <div className={s.textInputContainer}>
                    <Field
                      name="email"
                      label="E-Mail"
                      placeholder="E-Mail"
                      component={TextInputWrapped}
                    ></Field>
                  </div>
                </>
              ) : (
                <FinallyMessage className={s.hint} preventScrolling={true}>
                  <p>
                    <AuthInfo />
                  </p>
                </FinallyMessage>
              )}
              <CTAButtonContainer illustration="POINT_LEFT">
                <CTAButton type="submit">Her mit den Listen</CTAButton>
              </CTAButtonContainer>
            </form>
          );
        }}
      />
    </>
  );
};

const validate = (values, isAuthenticated) => {
  const errors = {};

  if (!isAuthenticated) {
    if (values.email && values.email.includes('+')) {
      errors.email = 'Zurzeit unterstützen wir kein + in E-Mails';
    }

    if (!validateEmail(values.email)) {
      errors.email = 'Wir benötigen eine valide E-Mail Adresse';
    }
  }

  return errors;
};
