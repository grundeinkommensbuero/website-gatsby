import React, { useState, useEffect, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { useCreatePledge } from '../../../hooks/Api/Pledge/Create';
import { useUpdatePledge } from '../../../hooks/Api/Pledge/Update';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import SignUpFeedbackMessage from '../SignUpFeedbackMessage';
import { useSignUp } from '../../../hooks/Authentication';
import AuthContext from '../../../context/Authentication';
import EnterLoginCode from '../../EnterLoginCode';
import AuthInfo from '../../AuthInfo';
import { FinallyMessage } from '../FinallyMessage';

export default ({ pledgeId }) => {
  const [signUpState, signUp] = useSignUp();
  const [createPledgeState, createPledge] = useCreatePledge();
  const [updatePledgeState, updatePledge] = useUpdatePledge();
  const [pledge, setPledgeLocally] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  // After signup process is done we can save the pledge
  useEffect(() => {
    if (signUpState === 'success') {
      createPledge(pledge);
    }
  }, [signUpState]);

  useEffect(() => {
    if (isAuthenticated && hasSubmitted) {
      updatePledge(pledge);
    }
  }, [isAuthenticated]);

  if (createPledgeState || updatePledgeState) {
    return (
      <SignUpFeedbackMessage
        state={createPledgeState || updatePledgeState}
        trackingId={pledgeId}
        trackingCategory="Pledge"
      />
    );
  }

  if (signUpState === 'userExists') {
    return <EnterLoginCode />;
  }

  if (isAuthenticated) {
    return (
      <FinallyMessage preventScrolling={true}>
        <p>
          Klasse, du hast dich bereits angemeldet. Wir informieren dich über
          alles Weitere.
        </p>
        <p>
          <AuthInfo />
        </p>
      </FinallyMessage>
    );
  }

  return (
    <Form
      onSubmit={e => {
        e.pledgeId = pledgeId;
        e.privacyConsent = true;
        e.newsletterConsent = true;
        setHasSubmitted(true);
        setPledgeLocally(e);
        if (!isAuthenticated) {
          signUp(e.email);
        }
      }}
      validate={values => validate(values, isAuthenticated)}
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

  if (values.email && !validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};
