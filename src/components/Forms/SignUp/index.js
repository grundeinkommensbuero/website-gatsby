import React, { useState, useEffect, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import SignUpFeedbackMessage from '../SignUpFeedbackMessage';
import { useSignUp } from '../../../hooks/Authentication';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';
import AuthContext from '../../../context/Authentication';
import { EnterLoginCode } from '../../Login/EnterLoginCode';
import AuthInfo from '../../AuthInfo';
import { FinallyMessage } from '../FinallyMessage';

export default ({
  initialValues,
  postSignupAction,
  illustration = 'POINT_LEFT',
}) => {
  const [signUpState, userExists, signUp, setSignUpState] = useSignUp();
  const [, updateUser] = useUpdateUser();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { isAuthenticated, userId } = useContext(AuthContext);

  // After signup process is successful, do post signup
  useEffect(() => {
    if (hasSubmitted && isAuthenticated && userId) {
      if (postSignupAction) {
        postSignupAction();
      }
    }
  }, [hasSubmitted, isAuthenticated, userId]);

  useEffect(() => {
    // If user signs in from form
    if (isAuthenticated && hasSubmitted) {
      updateUser({
        updatedOnXbge: true,
      });
      setSignUpState('signedIn');
    }
    // If user signs out after signing in
    if (!isAuthenticated && signUpState === 'signedIn') {
      setSignUpState(undefined);
    }
  }, [isAuthenticated, hasSubmitted]);

  if (signUpState === 'success') {
    return <EnterLoginCode preventSignIn={true} />;
  }

  if (signUpState) {
    return (
      <SignUpFeedbackMessage
        state={
          signUpState === 'signedIn' && !userExists ? 'success' : signUpState
        }
        trackingId={'sign-up'}
        trackingCategory="SignUp"
      />
    );
  }

  if (isAuthenticated || userId) {
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
        e.privacyConsent = true;
        e.newsletterConsent = true;
        setHasSubmitted(true);
        if (!isAuthenticated) {
          signUp(e);
        }
      }}
      initialValues={initialValues}
      validate={values => validate(values, isAuthenticated)}
      render={({ handleSubmit }) => {
        return (
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <FormSection>
                <Field
                  name="email"
                  label="E-Mail"
                  description="Pflichtfeld"
                  placeholder="E-Mail"
                  type="email"
                  component={TextInputWrapped}
                />
                <Field
                  name="username"
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
              </FormSection>

              <CTAButtonContainer illustration={illustration}>
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
