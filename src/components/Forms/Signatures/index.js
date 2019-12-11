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
      <DownloadListsNextSteps
        needsVerification={!state.anonymous && !state.existingUser}
      >
        <LinkButton target="_blank" href={state.pdf.url}>
          Liste Herunterladen
        </LinkButton>
      </DownloadListsNextSteps>
    );
  }

  return (
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
            <p className={s.hint}>
              Wenn du uns deine E-Mail-Adresse verrätst, errinnern wir dich, die
              Unterschriftenlisten zurück zu schicken und halten dich weiterhin
              auf dem Laufenden. Du erklärst dich dabei mit unserer{' '}
              <Link to="datenschutz">Datenschutzerklärung</Link> einverstanden.
              Natürlich kannst du die Liste auch{' '}
              <InlineButton
                onClick={() => {
                  createPdf({ campaignCode: signaturesId });
                }}
                type="button"
              >
                ohne Angabe der Adresse herunterladen
              </InlineButton>
              .
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
              <CTAButton type="submit">
                Unterschriftenliste Herunterladen
              </CTAButton>
            </CTAButtonContainer>
          </form>
        );
      }}
    />
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
