import React, { useEffect, useState, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { TextInputWrapped } from '../TextInput';
import { validateEmail, addActionTrackingId, trackEvent } from '../../utils';
import s from './style.module.less';
import { CTAButton, CTAButtonContainer } from '../../Layout/CTAButton';
import { LinkButton, InlineButton } from '../Button';
import { FinallyMessage } from '../FinallyMessage';
import { StepListItem } from '../../StepList';
import { useCreateSignatureList } from '../../../hooks/Api/Signatures/Create';
import { useSignUp } from '../../../hooks/Authentication';
import { EnterLoginCode } from '../../Login/EnterLoginCode';
import AuthContext from '../../../context/Authentication';
import AuthInfo from '../../AuthInfo';
import DownloadListsNextSteps from '../DownloadListsNextSteps';

const trackingCategory = 'ListDownload';

export default ({ signaturesId, disableRequestListsByMail }) => {
  const [state, pdf, anonymous, createPdf] = useCreateSignatureList();
  const [signUpState, signUp] = useSignUp();
  const [email, setEmail] = useState();
  const [loginCodeRequested, setLoginCodeRequested] = useState();
  const { isAuthenticated, userId } = useContext(AuthContext);
  const isDisabledRequestListsByMail = !!disableRequestListsByMail;
  const iconMail = require('./mail_red.svg');
  const iconIncognito = require('./incognito_red.svg');

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
    // Create pdf if user has authenticated after requesting their login code.
    if (isAuthenticated && typeof loginCodeRequested !== 'undefined') {
      createPdf({
        campaignCode: signaturesId,
        userExists: true,
        // We only want to update the user's newsletter consent,
        // if they did not come from identified stage (loginCodeRequested = false)
        shouldNotUpdateUser: loginCodeRequested,
      });
    }
  }, [isAuthenticated, loginCodeRequested]);

  // If user is not authorised after entering email, or if they are identified and request the list
  if (
    state === 'unauthorized' ||
    (loginCodeRequested && !isAuthenticated && !anonymous)
  ) {
    return (
      <EnterLoginCode>
        <p>
          Hey, wir kennen dich schon! Bitte gib den Code ein, den wir dir gerade
          in einer E-Mail geschickt haben. Alternativ kannst du auch eine Liste{' '}
          <InlineButton
            onClick={() => {
              createPdf({ campaignCode: signaturesId, anonymous: true });
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

  if (state === 'creating' || signUpState === 'loading') {
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
          <p>
            Juhu! Die Unterschriftslisten und unser Sammelleitfaden sind in
            deinem Postfach. Du kannst sie dir auch{' '}
            <a target="_blank" rel="noreferrer" href={pdf.url}>
              direkt im Browser herunterladen
            </a>{' '}
            - alle weiteren Infos findest du dort!
          </p>
        ) : (
          <p>
            Juhu!{' '}
            <a target="_blank" rel="noreferrer" href={pdf.url}>
              Hier
            </a>{' '}
            kannst du die Unterschriftslisten samt Leitfaden herunterladen!
          </p>
        )}
        <DownloadListsNextSteps>
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
        </DownloadListsNextSteps>
      </>
    );
  }
  return (
    <>
      <Form
        onSubmit={e => {
          // If user is authenticated
          if (isAuthenticated) {
            createPdf({
              campaignCode: signaturesId,
              userExists: true,
              shouldNotUpdateUser: true,
            });
            return;
          }

          // If user is identified
          if (userId) {
            // Show EnterLoginCode
            setLoginCodeRequested(true);
            return;
          } else {
            setLoginCodeRequested(false);
          }

          // If user is not identified
          setEmail(e.email);
          signUp({ newsletterConsent: true, ...e });
        }}
        validate={values => validate(values, userId)}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              {!userId ? (
                <>
                  <p className={s.hint}>
                    Schickt mir die Unterschriftenliste, erinnert mich an das
                    Zurücksenden und haltet mich auf dem Laufenden.
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
              <CTAButtonContainer illustration="POINT_RIGHT">
                <CTAButton type="submit">Her mit den Listen</CTAButton>
              </CTAButtonContainer>

              {!isAuthenticated && (
                <>
                  <div className={s.iconParagraph}>
                    <img
                      aria-hidden="true"
                      alt=""
                      src={iconIncognito}
                      className={s.icon}
                    />

                    <p>
                      Du willst deine E-Mail-Adresse nicht angeben? Du kannst
                      die Liste{' '}
                      <InlineButton
                        onClick={() => {
                          createPdf({ campaignCode: signaturesId });
                        }}
                        type="button"
                      >
                        hier auch anonym herunterladen.
                      </InlineButton>{' '}
                      Allerdings können wir dich dann nicht informieren, wenn
                      deine Unterschriften bei uns eingegangen sind!
                    </p>
                  </div>
                </>
              )}

              {!isDisabledRequestListsByMail && (
                <>
                  <div className={s.iconParagraph}>
                    <img
                      aria-hidden="true"
                      alt=""
                      src={iconMail}
                      className={s.icon}
                    />

                    <p>
                      Kein Drucker?{' '}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://expeditionbge.typeform.com/to/Dq3SOi"
                      >
                        Bitte schickt mir Unterschriftenlisten per Post
                      </a>
                      !
                    </p>
                  </div>
                </>
              )}
            </form>
          );
        }}
      />
    </>
  );
};

const validate = (values, userId) => {
  const errors = {};

  if (!userId) {
    if (values.email && values.email.includes('+')) {
      errors.email = 'Zurzeit unterstützen wir kein + in E-Mails';
    }

    if (!validateEmail(values.email)) {
      errors.email = 'Wir benötigen eine valide E-Mail Adresse';
    }
  }

  return errors;
};
