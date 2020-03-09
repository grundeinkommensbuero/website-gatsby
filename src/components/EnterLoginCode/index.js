import React, { useState } from 'react';
import { FinallyMessage } from '../Forms/FinallyMessage';
import { useAnswerChallenge, useSignIn } from '../../hooks/Authentication';
import { Form, Field } from 'react-final-form';
import FormSection from '../Forms/FormSection';
import { CTAButtonContainer, CTAButton } from '../Layout/CTAButton';
import { TextInputWrapped } from '../Forms/TextInput';
import FormWrapper from '../Forms/FormWrapper';

export default () => {
  const [answerChallengeState, setCode] = useAnswerChallenge();
  const [signInState, startSignIn] = useSignIn();

  useState(() => {
    // TODO: DON'T USE HARDCODED MAIL
    startSignIn('me@timurcelikel.com');
  }, [startSignIn]);

  if (answerChallengeState === 'loading') {
    return (
      <FinallyMessage state="progress">Einen Moment bitte...</FinallyMessage>
    );
  }

  if (answerChallengeState === 'success') {
    return <FinallyMessage>Erfolgreich identifiziert.</FinallyMessage>;
  }

  return (
    <FinallyMessage state="error">
      Du bist schon bei uns im System. Um dich zu identifizieren, haben wir dir
      einen Code per E-Mail geschickt. Bitte gib diesen ein:
      <Form
        onSubmit={e => {
          setCode(e.code);
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
