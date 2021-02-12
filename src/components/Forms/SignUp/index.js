import React, { useState, useEffect, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { Checkbox } from '../Checkbox';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import SignUpFeedbackMessage from '../SignUpFeedbackMessage';
import { useSignUp } from '../../../hooks/Authentication';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';
import AuthContext from '../../../context/Authentication';
import { EnterLoginCode } from '../../Login/EnterLoginCode';
import AuthInfo from '../../AuthInfo';
import { FinallyMessage } from '../FinallyMessage';
import s from './style.module.less';

const AuthenticatedDialogDefault = () => {
  return (
    <FinallyMessage preventScrolling={true}>
      <p>
        Klasse, du hast dich bereits angemeldet. Wir informieren dich über alles
        Weitere.
      </p>
      <p>
        <AuthInfo />
      </p>
    </FinallyMessage>
  );
};

export default ({
  initialValues,
  postSignupAction,
  illustration = 'POINT_LEFT',
  showSignedInMessage,
  fieldsToRender,
}) => {
  const [signUpState, userExists, signUp, setSignUpState] = useSignUp();
  const [, updateUser] = useUpdateUser();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { isAuthenticated, userId, customUserData } = useContext(AuthContext);

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

  if (signUpState && showSignedInMessage) {
    return (
      <>
        <SignUpFeedbackMessage
          className={s.adjustFinallyMessage}
          state={
            signUpState === 'signedIn' && !userExists ? 'success' : signUpState
          }
          trackingId={'sign-up'}
          trackingCategory="SignUp"
        />
      </>
    );
  }

  if (isAuthenticated || userId) {
    if (showSignedInMessage) {
      return <AuthenticatedDialogDefault />;
    } else {
      return null;
    }
  }

  let fields = ['email', 'username', 'zipCode', 'newsLetterConsent'];
  if (fieldsToRender) {
    fields = fieldsToRender;
  }
  const fieldData = {
    email: {
      name: 'email',
      label: 'E-mail',
      description: 'Pflichtfeld',
      placeholder: 'E-Mail',
      type: 'email',
      component: TextInputWrapped,
    },
    username: {
      name: 'username',
      label: 'Vorname',
      placeholder: 'Vorname',
      type: 'text',
      component: TextInputWrapped,
    },
    zipCode: {
      name: 'zipCode',
      label: 'Postleitzahl',
      placeholder: '12345',
      type: 'number',
      component: TextInputWrapped,
    },
    city: {
      name: 'city',
      label: 'Ort',
      placeholder: 'Stadt / Gemeinde',
      type: 'text',
      component: TextInputWrapped,
    },
    newsLetterConsent: {
      name: 'newsletterConsent',
      label:
        'Ja, ich möchte über die Kampagne auf dem Laufenden gehalten werden!',
      type: 'checkbox',
      component: Checkbox,
    },
  };

  return (
    <>
      <h2>Komm dazu.</h2>
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
                  {fields.map((field, i) => {
                    return (
                      <Field key={`form-field-${i}`} {...fieldData[field]} />
                    );
                  })}
                </FormSection>

                <CTAButtonContainer illustration={illustration}>
                  <CTAButton type="submit">Ich bin dabei</CTAButton>
                </CTAButtonContainer>
              </form>
            </FormWrapper>
          );
        }}
      ></Form>
    </>
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

  if (!values.email) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};
