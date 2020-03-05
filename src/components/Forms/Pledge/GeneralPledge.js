import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { useCreatePledge } from '../../../hooks/Api/Pledge/Create';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import SignUpFeedbackMessage from '../SignUpFeedbackMessage';
import { useSignUp } from '../../../hooks/Authentication';

export default ({ pledgeId }) => {
  const [signUpState, userId, signUp] = useSignUp();
  const [state, savePledge] = useCreatePledge();
  const [pledge, setPledge] = useState({});

  // After signup process is done we can save the pledge
  useEffect(() => {
    console.log('signup state', signUpState);

    if (signUpState === 'success') {
      savePledge(userId, pledge);
    } else if (signUpState === 'userExists') {
      // TODO: start sign in process
    }
  }, [signUpState]);

  if (state) {
    console.log('state', state);
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
        setPledge(e);
        signUp(e.email);
      }}
      validate={validate}
      render={({ handleSubmit }) => {
        return (
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <FormSection
                heading={
                  'Unterstütze das Vorhaben des staatlichen Modellversuchs zum bedingungslosen Grundeinkommen - melde dich jetzt zur Expedition an!'
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
                  label="Vorname"
                  placeholder="Vorname"
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
                  maxLength={500}
                  component={TextInputWrapped}
                />
              </FormSection>

              <CTAButtonContainer illustration="POINT_LEFT">
                <CTAButton type="submit">Ich bin dabei</CTAButton>
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

  return errors;
};
