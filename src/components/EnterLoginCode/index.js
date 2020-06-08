/* eslint-disable react/display-name */
import React, { useEffect, useState, useContext } from 'react';
import { Form, Field } from 'react-final-form';

import {
  useAnswerChallenge,
  useSignIn,
  useSignOut,
} from '../../hooks/Authentication';
import AuthContext from '../../context/Authentication';
import FormSection from '../Forms/FormSection';
import FormWrapper from '../Forms/FormWrapper';
import { FinallyMessage } from '../Forms/FinallyMessage';
import { InlineButton } from '../Forms/Button';
import { TextInputWrapped } from '../Forms/TextInput';
import { CTAButtonContainer, CTAButton } from '../Layout/CTAButton';

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
  const { customUserData: userData } = useContext(AuthContext);
  const [signOut] = useSignOut();

  const [confirmSendCode, setConfirmSendCode] = useState(false);

  if (!confirmSendCode) {
    return (
      <FinallyMessage type="success">
        <p>
          Du bist schon angemeldet{' '}
          {userData.username && `als ${userData.username}`} mit dem email{' '}
          {userData.email && userData.email}.
        </p>
        <p>
          To view your pledge,
          <InlineButton onClick={() => setConfirmSendCode(true)} type="button">
            click here to confirm your identity
          </InlineButton>
        </p>
        <p>
          <InlineButton onClick={signOut} type="button">
            Hier klicken zum Abmelden.
          </InlineButton>
        </p>
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

export default EnterLoginCode;
export { RequestLoginCode };
