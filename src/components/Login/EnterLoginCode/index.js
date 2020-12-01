import React, { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { Form, Field } from 'react-final-form';

import AuthContext from '../../../context/Authentication';
import { useAnswerChallenge, useSignIn } from '../../../hooks/Authentication';

import FormSection from '../../Forms/FormSection';
import FormWrapper from '../../Forms/FormWrapper';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { TextInputWrapped } from '../../Forms/TextInput';
import { InlineButton } from '../../Forms/Button';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import s from './style.module.less';

export const EnterLoginCode = ({ children, preventSignIn }) => {
  const { tempEmail, setTempEmail } = useContext(AuthContext);
  const [
    answerChallengeState,
    setCode,
    setAnswerChallengeState,
  ] = useAnswerChallenge();
  const [signInState, startSignIn] = useSignIn();

  useEffect(() => {
    // We don't want to start sign in again, if flag is set
    // (we might already have started sign in outside of component)
    if (!preventSignIn) {
      startSignIn();
    }
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
        <p>
          Oh! Es scheint, diese Email-Addresse ist noch nicht bei uns
          registriert.{' '}
          <InlineButton
            onClick={() => {
              navigate('/expedition/#generalpledge');
            }}
          >
            Klicke hier, um dich neu zu registrieren.
          </InlineButton>
        </p>

        <p>Oder hast du deine Email-Adresse falsch eingegeben?</p>

        <CTAButtonContainer>
          <CTAButton
            onClick={() => {
              setTempEmail(undefined);
            }}
          >
            Nochmal versuchen
          </CTAButton>
        </CTAButtonContainer>
      </FinallyMessage>
    );
  }

  return (
    <FinallyMessage state="error">
      {answerChallengeState === 'wrongCode' ? (
        <p>
          Der eingegeben Code ist falsch oder bereits abgelaufen. Bitte
          überprüfe die Email erneut oder fordere einen neuen Code an.
        </p>
      ) : children ? (
        children
      ) : (
        <p>
          Um dich zu identifizieren, haben wir dir einen Code per E-Mail
          {tempEmail ? ` (${tempEmail})` : ''} geschickt. Bitte gib diesen ein:
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
                <FormSection className={s.loginForm}>
                  <Field
                    name="code"
                    label="Geheimer Code"
                    placeholder="Geheimer Code"
                    type="text"
                    autoComplete="off"
                    component={TextInputWrapped}
                  ></Field>
                </FormSection>

                <CTAButtonContainer className={s.buttonContainer}>
                  <CTAButton type="submit">Abschicken</CTAButton>
                  <InlineButton
                    type="button"
                    onClick={() => {
                      setAnswerChallengeState(undefined);
                      startSignIn();
                    }}
                  >
                    Code erneut senden
                  </InlineButton>
                </CTAButtonContainer>
              </form>
            </FormWrapper>
          );
        }}
      />
    </FinallyMessage>
  );
};
