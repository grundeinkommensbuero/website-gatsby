import React from 'react';
import { Form, Field } from 'react-final-form';
import FormSection from '../FormSection';
import { TextInputWrapped } from '../TextInput';
import { validateEmail } from '../../utils';
import FormWrapper from '../FormWrapper';
import s from './style.module.less';
import { CTAButton, CTAButtonContainer } from '../../Layout/CTAButton';
import { useCreateSignatureList } from '../../../hooks/Api/Signatures';
import DownloadListsNextSteps from '../DownloadListsNextSteps';
import { LinkButton, InlineButton } from '../Button';
import { FinallyMessage } from '../FinallyMessage';

export default ({ className, signaturesId }) => {
  const [state, createPdf] = useCreateSignatureList({});

  if (state.state === 'creating') {
    return (
      <FinallyMessage state="progress">
        Liste wird generiert, bitte einen Moment Geduld...
      </FinallyMessage>
    );
  }

  if (state.state === 'error') {
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
    return (
      <DownloadListsNextSteps needsVerification={false}>
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
          <FormWrapper className={className}>
            <form onSubmit={handleSubmit}>
              <FormSection>
                <Field
                  name="email"
                  label="E-Mail"
                  description="Pflichtfeld"
                  placeholder="E-Mail"
                  component={TextInputWrapped}
                ></Field>
              </FormSection>

              <CTAButtonContainer illustration="POINT_LEFT">
                <CTAButton type="submit">
                  Unterschriftenliste Herunterladen
                </CTAButton>
              </CTAButtonContainer>
              <InlineButton
                className={s.directDownloadButton}
                onClick={() => {
                  createPdf(signaturesId);
                }}
              >
                ohne Erinnerungen anonym herunterladen
              </InlineButton>
            </form>
          </FormWrapper>
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
