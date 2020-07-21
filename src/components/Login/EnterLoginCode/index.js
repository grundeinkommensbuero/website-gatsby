import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form';

import { useAnswerChallenge, useSignIn } from '../../../hooks/Authentication';
import FormSection from '../../Forms/FormSection';
import FormWrapper from '../../Forms/FormWrapper';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { TextInputWrapped } from '../../Forms/TextInput';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';

export const EnterLoginCode = ({ children }) => {
  const [answerChallengeState, setCode] = useAnswerChallenge();
  const [signInState, startSignIn] = useSignIn();

  useEffect(() => {
    startSignIn();
  }, []);

  if (answerChallengeState === 'loading' || signInState === 'loading') {
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

  if (signInState === 'userNotFound') {
    return (
      <FinallyMessage state="error">
        Shit! There's no user registered with this email address. Basically, you
        can either:
        <br />
        <a href="/login">Go back and enter a new email</a>
        <br />
        or
        <br />
        <a href="/expedition">Sign up</a>
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
        validate={values => {
          if (!values.code)
            return { code: 'Bitte gib den Code aus aus der E-Mail an' };
          return {};
        }}
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
