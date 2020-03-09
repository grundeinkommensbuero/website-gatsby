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
import { useCreateSignatureList } from '../../../hooks/Api/Signatures/Create';
import { useSignUp } from '../../../hooks/Authentication';
import EnterLoginCode from '../../EnterLoginCode';

const trackingCategory = 'ListDownload';

export default ({ signaturesId }) => {
  const [state, pdf, anonymous, createPdf] = useCreateSignatureList();
  const [signUpState, userId, signUp] = useSignUp();

  useEffect(() => {
    // If user was registered proceed by creating list
    if (signUpState === 'success') {
      createPdf({ userId, campaignCode: signaturesId });
    } else if (signUpState === 'userExists') {
      // TODO: hold email in component state
      createPdf({
        email: 'vali_schagerl@web.de',
        campaignCode: signaturesId,
        userExists: true,
      });
    }
  }, [signUpState]);

  useEffect(() => {
    if (state === 'unauthorized') {
      console.log('unauthorized');
      // TODO: start sign in process
      // and call createPdf again afterwards (with userId)
    }
  }, [state]);

  if (state === 'unauthorized') {
    return (
      <EnterLoginCode>
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
              Juhu! Die Unterschriftenlisten sind in deinem Postfach. Du kannst
              sie dir auch{' '}
              <a target="_blank" href={pdf.url}>
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
