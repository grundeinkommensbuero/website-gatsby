import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextInputWrapped } from '../TextInput';
import { validateEmail, addActionTrackingId, trackEvent } from '../../utils';
import s from './style.module.less';
import { CTAButton, CTAButtonContainer } from '../../Layout/CTAButton';
import { useCreateSignatureList } from '../../../hooks/Api/Signatures';
import DownloadListsNextSteps from '../DownloadListsNextSteps';
import { LinkButton, InlineButton } from '../Button';
import { FinallyMessage } from '../FinallyMessage';
import { Link } from 'gatsby';
import { StepListItem } from '../../StepList';

const trackingCategory = 'ListDownload';

export default ({ signaturesId }) => {
  const [state, createPdf] = useCreateSignatureList({});

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
          'downloadCreated' + state.existingUser ? 'ExistingUser' : 'NewUser',
          signaturesId
        ),
      });
    }

    return (
      <>
        {state.existingUser ? (
          <>
            <p>
              Juhu! Die Unterschriftslisten und unser Sammelleitfaden sind in
              deinem Postfach. Du kannst sie dir auch{' '}
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
          {(state.anonymous || !state.existingUser) && (
            <StepListItem icon="download">
              <LinkButton target="_blank" href={state.pdf.url}>
                Liste Herunterladen
              </LinkButton>
            </StepListItem>
          )}
          {!state.anonymous && !state.existingUser && (
            <StepListItem icon="mail">
              Check deine Mails und klick den Link, damit du dabei bist.
            </StepListItem>
          )}
        </DownloadListsNextSteps>
      </>
    );
  }

  return (
    <>
      <p>
        Die Listen sind da! Ab sofort kannst du sie dir ausdrucken,
        unterschreiben und Unterschriften sammeln. So starten wir zusammen den
        Modellversuch in Schleswig-Holstein!
      </p>
      <p>An welche E-Mail-Adresse dürfen wir dir die Listen schicken?</p>
      <Form
        onSubmit={e => {
          createPdf({
            email: e.email,
            campaignCode: signaturesId,
          });
        }}
        validate={validate}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.textInputContainer}>
                <Field
                  name="email"
                  label="E-Mail"
                  placeholder="E-Mail"
                  component={TextInputWrapped}
                ></Field>
              </div>
              <p className={s.hint}>
                Bitte erinnert mich an das Zurücksenden der Listen und haltet
                mich auf dem Laufenden. Du kannst die Listen auch{' '}
                <InlineButton
                  onClick={() => {
                    createPdf({ campaignCode: signaturesId });
                  }}
                  type="button"
                >
                  anonym herunterladen
                </InlineButton>
                .
              </p>
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
