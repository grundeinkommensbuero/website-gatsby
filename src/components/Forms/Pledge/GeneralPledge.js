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
  const [signUpState, signUp] = useSignUp();
  const [state, savePledge] = usePledgeApi();
  const [pledge, setPledge] = useState({});

  /*
    state (string) can be:
    null (before form is submitted), "saving", "saved", "userExists", "error"
  */

  useEffect(() => {
    if (signUpState.state === 'success') {
      savePledge(signUpState.userId, pledge);
    }
  }, [signUpState, savePledge]);

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
