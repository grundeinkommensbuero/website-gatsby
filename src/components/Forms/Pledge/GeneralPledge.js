import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { usePledgeApi } from '../../../hooks/Api/Pledge';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import SignUpFeedbackMessage from '../SignUpFeedbackMessage';

export default ({ pledgeId }) => {
  const [state, savePledge] = usePledgeApi();

  /*
    state (string) can be:
    null (before form is submitted), "saving", "saved", "userExists", "error"
  */

  if (state) {
    return (
      <SignUpFeedbackMessage
        state={state}
        trackingId={pledgeId}
        trackingCategory="Pledge"
      />
    );
  }

  return (
    <Form
      onSubmit={e => {
        e.pledgeId = pledgeId;
        e.privacyConsent = true;
        e.newsletterConsent = true;
        savePledge(e);
      }}
      validate={validate}
      render={({ handleSubmit }) => {
        return (
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <FormSection
                heading={
                  'Ich bin dabei! Haltet mich auf dem Laufenden, und sagt mir, wenn es in meinem Bundesland/meiner Kommune losgeht.'
                }
              >
                <Field
                  name="email"
                  label="E-Mail"
                  description="Pflichtfeld"
                  placeholder="E-Mail"
                  type="email"
                  component={TextInputWrapped}
                />
                <Field
                  name="name"
                  label="Mit diesem Namen möchte ich angesprochen werden"
                  placeholder="Name"
                  type="text"
                  component={TextInputWrapped}
                />
                <Field
                  name="zipCode"
                  label="Postleitzahl"
                  placeholder="12345"
                  type="number"
                  component={TextInputWrapped}
                />
                <Field
                  name="city"
                  label="Ort"
                  placeholder="Stadt / Dorf"
                  type="text"
                  component={TextInputWrapped}
                />
                <Field
                  name="message"
                  label="Willst du uns noch etwas mitteilen?"
                  placeholder="Deine Nachricht"
                  type="textarea"
                  component={TextInputWrapped}
                />
              </FormSection>

              <CTAButtonContainer illustration="POINT_LEFT">
                <CTAButton type="submit">
                  Ich bin dabei, wenn’s losgeht!
                </CTAButton>
              </CTAButtonContainer>
            </form>
          </FormWrapper>
        );
      }}
    ></Form>
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

  const MAX_LENGTH = 500;
  if (values.message && values.message.length > MAX_LENGTH) {
    errors.message = (
      <>
        {values.message.length - MAX_LENGTH} Zeichen zu viel – bitte halte dich
        hier kurz. Für längere Anmerkungen bitte an{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>{' '}
        schreiben
      </>
    );
  }

  return errors;
};
