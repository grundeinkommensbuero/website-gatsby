import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail, trackEvent } from '../../utils';
import { usePledgeApi } from '../../../hooks/Api/Pledge';
import { TextInputWrapped, TextInputOneLine } from '../TextInput';
import FormSection from '../FormSection';
import { Checkbox } from '../Checkbox';
import { SignatureCountSlider } from '../SignatureCountSlider';
import s from './style.module.less';
import { FinallyMessage } from '../FinallyMessage';
import cN from 'classnames';
import SocialMediaButtons from '../../SocialMedia/Share';
import CTAButton from '../../Layout/CTAButton';

export default ({ className }) => {
  const [state, savePledge] = usePledgeApi();
  const [isSecondPartOpen, openSecondPart] = useState(true);

  useEffect(() => {
    function handleJumpTo() {
      openSecondPartTracked(true);
      trackEvent({ category: 'Pledge', action: 'click', name: 'jumptToLink' });
    }

    window.addEventListener('#pledge', handleJumpTo);

    return function cleanup() {
      window.removeEventListener('#pledge', handleJumpTo);
    };
  });

  function openSecondPartTracked(open) {
    openSecondPart(open);
    trackEvent({ category: 'Pledge', action: 'click', name: 'openPledge' });
  }

  /*
    state (string) can be:
    null (before form is submitted), "saving", "saved", "userExists", "error"
  */

  if (state) {
    let finallyState;
    if (state === 'saved') {
      finallyState = 'success';
      trackEvent({ category: 'Pledge', action: 'sentSuccess' });
    }
    if (state === 'error' || state === 'userExists') {
      finallyState = 'error';
      trackEvent({ category: 'Pledge', action: 'sentError', name: state });
    }
    if (state === 'saving') {
      finallyState = 'progress';
    }
    return (
      <>
        <SocialMediaButtons>
          Folge uns in den sozialen Medien!
        </SocialMediaButtons>
        <FinallyMessage state={finallyState} className={className}>
          {state === 'saving' && 'Wird abgeschickt...'}
          {state === 'saved' &&
            'Yay, danke! Du solltest demnächst eine E-Mail von uns bekommen.'}
          {state === 'userExists' && (
            <>
              Danke! Diese E-Mail-Adresse kennen wir schon - Hast du unsere
              Antwort-Mail bekommen? Dann fehlt nur noch der letzte Klick zum
              Bestätigen. <br />
              <br />
              Nichts gefunden? Dann schau doch bitte noch einmal in deinen
              Spam-Ordner, oder schreibe uns an{' '}
              <a href="mailto:support@expedition-grundeinkommen.de">
                support@expedition-grundeinkommen.de
              </a>
              .
            </>
          )}
          {state === 'error' && (
            <>
              Da ist was schief gegangen. Melde dich bitte bei uns{' '}
              <a href="mailto:support@expedition-grundeinkommen.de">
                support@expedition-grundeinkommen.de
              </a>
              .
            </>
          )}
        </FinallyMessage>
      </>
    );
  }

  if (!isSecondPartOpen) {
    return (
      <CTAButton
        className={className}
        illustration="POINT_LEFT"
        onClick={() => openSecondPartTracked(true)}
        id="pledge"
      >
        Ich bin dabei!
      </CTAButton>
    );
  }

  return (
    <Form
      onSubmit={e => {
        const foo = savePledge(e);
        foo.then(e => {
          console.log('finally', e);
        });
      }}
      initialValues={{
        signatureCount: 1,
      }}
      validate={validate}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={cN(s.container, className)}>
            <div className={s.jumpToAnchor} id="pledge" />

            <FormSection>
              <Field
                name="name"
                label="So möchte ich angesprochen werden"
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

            <FormSection heading="Sag uns, wie viele Unterschriften von anderen Menschen in Schleswig-Holstein du realistischerweise mit einsammeln kannst:">
              <Field
                name="signatureCount"
                labelHidden="Sag uns, wie viele Unterschriften von anderen Menschen in Schleswig-Holstein du realistischerweise mit einsammeln kannst:"
                component={SignatureCountSlider}
                type="range"
                min={1}
                max={50}
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

            <CTAButton type="submit" illustration="POINT_LEFT">
              Ich bin dabei, sobald es losgeht!
            </CTAButton>
          </form>
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
