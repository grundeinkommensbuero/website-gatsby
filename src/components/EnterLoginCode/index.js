/* eslint-disable react/display-name */
import React, { useEffect, useContext } from 'react';
import { FinallyMessage } from '../Forms/FinallyMessage';
import { useAnswerChallenge, useSignIn } from '../../hooks/Authentication';
import AuthContext from '../../context/Authentication';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../utils';
import FormSection from '../Forms/FormSection';
import { CTAButtonContainer, CTAButton } from '../Layout/CTAButton';
import { TextInputWrapped } from '../Forms/TextInput';
import FormWrapper from '../Forms/FormWrapper';

const EnterLoginCode = ({ children }) => {
  const [answerChallengeState, setCode] = useAnswerChallenge();
  const [signInState, startSignIn] = useSignIn();

  useEffect(() => {
    startSignIn();
  }, []);

  if (answerChallengeState === 'loading') {
    return (
      <FinallyMessage state="progress">Einen Moment bitte...</FinallyMessage>
    );
  }

  if (answerChallengeState === 'success') {
    return <FinallyMessage>Erfolgreich identifiziert.</FinallyMessage>;
  }

  if (signInState === 'userNotConfirmed') {
    return (
      <FinallyMessage state="error">
        Diese E-Mail-Adresse kennen wir schon, sie wurde aber nie bestätigt -
        Hast du unsere Antwort-Mail bekommen? Dann fehlt nur noch der letzte
        Klick zum Bestätigen. Wiederhole den Vorgang danach nochmal, indem du
        diese Seite neu lädst. <br />
        <br />
        Nichts gefunden? Dann schau doch bitte noch einmal in deinen
        Spam-Ordner, oder schreibe uns an{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>
        .
      </FinallyMessage>
    );
  }

  return (
    <FinallyMessage state="error">
      {children ? (
        children
      ) : (
        <p>
          Du bist schon bei uns im System. Um dich zu identifizieren, haben wir
          dir einen Code per E-Mail geschickt. Bitte gib diesen ein:
        </p>
      )}
      <Form
        onSubmit={e => {
          setCode(e.code);
        }}
        validate={validateEnterLoginCode}
        render={({ handleSubmit }) => {
          return (
            <FormWrapper>
              <form onSubmit={handleSubmit}>
                <FormSection>
                  <Field
                    name="code"
                    label="Geheimer Code"
                    placeholder="Geheimer Code"
                    type="text"
                    autoComplete="off"
                    component={TextInputWrapped}
                  ></Field>
                </FormSection>

                <CTAButtonContainer>
                  <CTAButton type="submit">Abschicken</CTAButton>
                </CTAButtonContainer>
              </form>
            </FormWrapper>
          );
        }}
      />
    </FinallyMessage>
  );
};

const RequestLoginCode = () => {
  const { tempEmail, setTempEmail } = useContext(AuthContext);

  if (!tempEmail) {
    return (
      <FinallyMessage state="error">
        <p>Please enter your email to confirm your identity</p>
        <Form
          onSubmit={e => setTempEmail(e.email)}
          validate={validateRequestLoginCode}
          render={({ handleSubmit }) => {
            return (
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  <FormSection>
                    <Field
                      name="email"
                      label="Email"
                      placeholder="Email"
                      type="text"
                      autoComplete="off"
                      component={TextInputWrapped}
                    ></Field>
                  </FormSection>

                  <CTAButtonContainer>
                    <CTAButton type="submit">Send Code to Email</CTAButton>
                  </CTAButtonContainer>
                </form>
              </FormWrapper>
            );
          }}
        />
      </FinallyMessage>
    );
  }

  // If there is a temporary email, show EnterLoginCode
  return <EnterLoginCode />;
};

const validateEnterLoginCode = values => {
  const errors = {};

  if (!values.code) {
    errors.code = 'Bitte gib den Code aus aus der E-Mail an';
  }

  return errors;
};

const validateRequestLoginCode = values => {
  const errors = {};

  if (!validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};

export default EnterLoginCode;
export { RequestLoginCode };
