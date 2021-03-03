import React, { useState, useEffect, useContext } from 'react';
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

export const EnterLoginCode = ({
  children,
  preventSignIn,
  buttonText,
  onAnswerChallengeSuccess,
}) => {
  const { tempEmail, setTempEmail, isAuthenticated } = useContext(AuthContext);
  const [
    answerChallengeState,
    setCode,
    setAnswerChallengeState,
  ] = useAnswerChallenge();
  const [signInState, startSignIn] = useSignIn();
  const [oneMinuteTimer, setOneMinuteTimer] = useState(false);
  const [timerCounter, setTimerCounter] = useState(0);

  useEffect(() => {
    // We don't want to start sign in again, if flag is set
    // (we might already have started sign in outside of component)
    if (!preventSignIn) {
      startSignIn();
    }
  }, []);

  useEffect(() => {
    if (
      onAnswerChallengeSuccess &&
      answerChallengeState === 'success' &&
      isAuthenticated
    ) {
      onAnswerChallengeSuccess();
    } else if (answerChallengeState === 'restartSignIn') {
      // We want to send a new code by starting sign in again
      startSignIn();
    }
  }, [answerChallengeState, isAuthenticated]);

  useEffect(() => {
    countdown();
  }, [oneMinuteTimer]);

  const countdown = () => {
    setOneMinuteTimer(false);
    let seconds = 60;
    function tick() {
      seconds--;
      setTimerCounter(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      }
    }
    tick();
  };

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
              navigate('/registrieren/');
            }}
          >
            Hier kannst du dich neu registrieren.
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
      {answerChallengeState === 'wrongCode' && (
        <p>
          Der eingegebene Code ist falsch oder bereits abgelaufen. Bitte
          überprüfe die Email erneut oder lade die Seite neu.
        </p>
      )}

      {(answerChallengeState === 'resentCode' ||
        answerChallengeState === 'restartSignIn') && (
          <p>
            Der Code wurde erneut per E-Mail {tempEmail ? ` (${tempEmail})` : ''}{' '}
          geschickt.
          </p>
        )}

      {!answerChallengeState && (
        <>
          {children ? (
            children
          ) : (
              <p>
                Um dich zu identifizieren, haben wir dir einen Code per E-Mail
                {tempEmail ? ` (${tempEmail})` : ''} geschickt. Bitte gib diesen
              ein:
              </p>
            )}{' '}
        </>
      )}
      <Form
        onSubmit={e => {
          setCode(e.code);
        }}
        validate={values => {
          if (!values.code)
            return { code: 'Bitte gib den Code aus der E-Mail an' };
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
                  <CTAButton type="submit">
                    {buttonText ? buttonText : 'Abschicken'}
                  </CTAButton>
                  {timerCounter === 0 ? <InlineButton
                    type="button"
                    onClick={() => {
                      setAnswerChallengeState(undefined);
                      setCode('resendCode');
                      setOneMinuteTimer(true);
                    }}
                  >
                    Code erneut senden
                  </InlineButton> :
                    <div className={s.counterDescriptionContainer}>
                      <p className={s.counterDescription}>
                        In {timerCounter} {timerCounter !== 1 ? 'Sekunden' : 'Sekunde'} kannst du{' '}
                        den Code erneut anfordern
                      </p>
                    </div>}
                </CTAButtonContainer>
              </form>
            </FormWrapper>
          );
        }}
      />
    </FinallyMessage>
  );
};
