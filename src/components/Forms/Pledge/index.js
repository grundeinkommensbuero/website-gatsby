import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import {
  validateEmail,
  trackEvent,
  addActionTrackingId,
  getAbTestId,
} from '../../utils';
import { usePledgeApi } from '../../../hooks/Api/Pledge';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { Checkbox } from '../Checkbox';
import { SignatureCountSlider } from '../SignatureCountSlider';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import SignUpFeedbackMessage from '../SignUpFeedbackMessage';
import s from './style.module.less';

export default ({ className, pledgeId }) => {
  const [state, savePledge] = usePledgeApi();

  useEffect(() => {
    function handleJumpTo() {
      trackEvent({
        category: 'Pledge',
        action: addActionTrackingId('click', pledgeId),
        name: 'jumptToLink',
      });
    }

    window.addEventListener('#pledge', handleJumpTo);

    return function cleanup() {
      window.removeEventListener('#pledge', handleJumpTo);
    };
  });

  /*
    state (string) can be:
    null (before form is submitted), "saving", "saved", "userExists", "error"
  */

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
        e.abTestId = getAbTestId();
        savePledge(e);
      }}
      initialValues={{
        signatureCount: 1,
      }}
      validate={validate}
      render={({ handleSubmit }) => {
        return (
          <FormWrapper className={className}>
            <form onSubmit={handleSubmit}>
              <div className={s.jumpToAnchorWrapper}>
                <div className={s.jumpToAnchor} id="pledge" />
              </div>

              <FormSection heading={'Wer bist du?'}>
                <Field
                  name="name"
                  label="Mit diesem Namen möchte ich angesprochen werden"
                  placeholder="Name"
                  component={TextInputWrapped}
                ></Field>
                <Field
                  name="email"
                  label="E-Mail"
                  description="Pflichtfeld"
                  placeholder="E-Mail"
                  component={TextInputWrapped}
                ></Field>
                <Field
                  name="zipCode"
                  label="Postleitzahl"
                  description="Pflichtfeld"
                  placeholder="12345"
                  component={TextInputWrapped}
                ></Field>
              </FormSection>

              <FormSection heading={signatureCountLabels[pledgeId]}>
                <Field
                  name="signatureCount"
                  labelHidden={signatureCountLabels[pledgeId]}
                  component={SignatureCountSlider}
                  type="range"
                  min={1}
                  max={30}
                />
              </FormSection>

              <FormSection>
                <Field
                  name="newsletterConsent"
                  label={
                    <>
                      Schreibt mir, wenn die Unterschriftslisten da sind und
                      haltet mich über alle weiteren Kampagnenschritte auf dem
                      Laufenden.
                    </>
                  }
                  type="checkbox"
                  component={Checkbox}
                ></Field>
                <Field
                  name="privacyConsent"
                  label={
                    <>
                      Ich stimme zu, dass meine eingegebenen Daten gespeichert
                      werden.
                    </>
                  }
                  type="checkbox"
                  component={Checkbox}
                ></Field>
              </FormSection>

              <CTAButtonContainer illustration="POINT_LEFT">
                <CTAButton type="submit">
                  Ich bin dabei, wenn’s losgeht!
                </CTAButton>
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

  if (!values.privacyConsent) {
    errors.privacyConsent = 'Wir benötigen dein Einverständnis';
  }

  if (!values.zipCode) {
    errors.zipCode =
      'Wir benötigen deine Postleitzahl, um dich dem korrekten Bundesland zuzuordnen';
  }

  if (values.email && values.email.includes('+')) {
    errors.email = 'Zurzeit unterstützen wir kein + in E-Mails';
  }

  if (!validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};

const signatureCountLabels = {
  'brandenburg-1':
    'Wie viele Unterschriften von anderen Menschen in Brandenburg kannst du noch mit einsammeln?',
  'schleswig-holstein-1':
    'Wie viele Unterschriften von anderen Menschen in Schleswig-Holstein kannst du noch mit einsammeln?',
  'hamburg-1':
    'Wie viele Unterschriften von anderen Menschen in Hamburg kannst du noch mit einsammeln?',
  'bremen-1':
    'Wie viele Unterschriften von anderen Menschen in Bremen kannst du noch mit einsammeln?',
  'berlin-1':
    'Wie viele Unterschriften von anderen Menschen in Berlin kannst du noch mit einsammeln?',
};
