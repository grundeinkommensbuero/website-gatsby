import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { TextInputWrapped } from '../TextInput';
import { validateEmail, addActionTrackingId, trackEvent } from '../../utils';
import s from './style.module.less';
import { CTAButton, CTAButtonContainer } from '../../Layout/CTAButton';
import DownloadListsNextSteps from '../DownloadListsNextSteps';
import { LinkButton, InlineButton } from '../Button';
import { FinallyMessage } from '../FinallyMessage';
import { Link } from 'gatsby';
import { StepListItem } from '../../StepList';
import { useCreateSignatureList } from '../../../hooks/api/Signatures/Create';
import { useGetUserByEmail } from '../../../hooks/api/users/get';
import { useSignUp } from '../../../hooks/authentication';

const trackingCategory = 'ListDownload';

export default ({ signaturesId }) => {
  const [state, createPdf] = useCreateSignatureList();
  const [signUpState, signUp] = useSignUp();
  const getUserByEmail = useGetUserByEmail();

  useEffect(() => {
    // If user was registered proceed by creating list
    if (signUpState.state === 'success') {
      createPdf({ userId: signUpState.userId, campaignCode: signaturesId });
    } else if (signUpState.state === 'userExists') {
      // If the user already exists, we want to check, if user
      // has newsletter consent or not
      getUserByEmail(signUpState.email).then(data => {
        if (data.state === 'success') {
          // If user has newsletter consent true, we do not need to sign in
          if (!data.user.newsletterConsent.value) {
            // TODO: start sign in process
          } else {
            createPdf({
              userId: data.user.userId,
              campaignCode: signaturesId,
            });
          }
        }
      });
    }
  }, [signUpState, createPdf]);

  if (state.state === 'creating') {
    return (
      <FinallyMessage state="progress">
        Liste wird generiert, bitte einen Moment Geduld...
      </FinallyMessage>
    );
  }

  if (state.state === 'error') {
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

  if (state.state === 'created') {
    if (state.anonymous) {
      trackEvent({
        category: trackingCategory,
        action: addActionTrackingId('downloadCreatedAnonymous', signaturesId),
      });
    } else {
      trackEvent({
        category: trackingCategory,
        action: addActionTrackingId(
          'downloadCreated' + (state.existingUser ? 'ExistingUser' : 'NewUser'),
          signaturesId
        ),
      });
    }

    return (
      <>
        {!state.anonymous ? (
          <>
            <p>
              Juhu! Die Unterschriftenlisten sind in deinem Postfach. Du kannst
              sie dir auch{' '}
              <a target="_blank" href={state.pdf.url}>
                direkt im Browser herunterladen
              </a>
              .
            </p>
            <p>So geht’s weiter:</p>
          </>
        ) : (
          <p>Schön, dass du mit uns sammelst. So geht’s weiter:</p>
        )}

        <DownloadListsNextSteps>
          {!state.anonymous && !state.existingUser && (
            <StepListItem icon="mail">
              Check deine Mails und klick den Link, damit du dabei bist.
            </StepListItem>
          )}
          {state.anonymous && (
            <StepListItem icon="download">
              <LinkButton target="_blank" href={state.pdf.url}>
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
          signUp(e.email);
        }}
        validate={validate}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className={s.form}>
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
                  hier
                </InlineButton>{' '}
                auch anonym herunterladen.
              </p>
              <div className={s.textInputContainer}>
                <Field
                  name="email"
                  label="E-Mail"
                  placeholder="E-Mail"
                  component={TextInputWrapped}
                ></Field>
              </div>
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

const validate = values => {
  const errors = {};

  if (values.email && values.email.includes('+')) {
    errors.email = 'Zurzeit unterstützen wir kein + in E-Mails';
  }

  if (!validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};
