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
import PartnerLogos from '../../PartnerLogos';
import s from './style.module.less';

export default ({ className, pledgeId }) => {
  const [state, savePledge] = usePledgeApi();
  const [isSecondPartOpen, openSecondPart] = useState(true);

  useEffect(() => {
    function handleJumpTo() {
      openSecondPartTracked(true);
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

  function openSecondPartTracked(open) {
    openSecondPart(open);
    trackEvent({
      category: 'Pledge',
      action: addActionTrackingId('click', pledgeId),
      name: 'openPledge',
    });
  }

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

  if (!isSecondPartOpen) {
    return (
      <CTAButtonContainer className={className} illustration="POINT_LEFT">
        <CTAButton onClick={() => openSecondPartTracked(true)}>
          Ich bin dabei!
        </CTAButton>
      </CTAButtonContainer>
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
              <PartnerLogos style={{ marginBottom: '2rem' }} />

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

              {/* <FormSection heading="Wie möchtest du die Expedition in Schleswig-Holstein unterstützen?">
              <Field
                name="wouldPrintAndSendSignatureLists"
                type="checkbox"
                label="Ich drucke die Unterschriftenliste aus und schicke sie unterschrieben ans Expeditionsbüro."
                component={Checkbox}
              ></Field>
              <Field
                name="wouldPutAndCollectSignatureLists"
                type="checkbox"
                label="Ich lege Listen an Orten aus wie z. B. beim Bäcker, in Cafés, auf dem Uni-Campus oder beim Sportverein und sammle sie später wieder ein."
                component={Checkbox}
              ></Field>
              <Field
                name="wouldCollectSignaturesInPublicSpaces"
                type="checkbox"
                label="Ich spreche aktiv Passantinnen und Passanten an und sammle Unterschriften vor Ort."
                component={Checkbox}
              ></Field>
              <Field
                name="wouldDonate"
                type="checkbox"
                label="Ich kann mir vorstellen, die Expedition finanziell zu unterstützen."
                component={Checkbox}
              ></Field>
              <Field
                name="wouldEngageCustom"
                label="Ich habe eine andere Idee: "
                component={TextInputOneLine}
              ></Field>
            </FormSection> */}

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
};
