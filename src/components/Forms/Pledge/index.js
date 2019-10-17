import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { usePledgeApi } from '../../../hooks/Api/Pledge';
import { Button } from '../Button';
import { TextInputWrapped, TextInputOneLine } from '../TextInput';
import FormSection from '../FormSection';
import { Checkbox } from '../Checkbox';
import { SignatureCountSlider } from '../SignatureCountSlider';
import { Link } from 'gatsby';
import s from './style.module.less';
import AnimateHeight from 'react-animate-height';

export default () => {
  const [state, savePledge] = usePledgeApi();
  /*
    state (string) can be:
    null (before form is submitted), "saving", "saved", "userExists", "error"
  */

  if (state === 'saving') {
    return <p>Wird abgeschickt...</p>;
  }

  if (state === 'saved') {
    return (
      <p>Yay, danke! Du solltest demnächst eine E-Mail von uns bekommen.</p>
    );
  }

  if (state === 'userExists') {
    return <p>Du bist schon im System.</p>;
  }

  if (state === 'error') {
    return (
      <p>
        Da ist was schief gegangen. Melde dich bitte bei uns{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>
        .
      </p>
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
      render={({ handleSubmit, form }) => {
        const signatureCountState = form.getFieldState('signatureCount');
        const showAllFields =
          signatureCountState &&
          (signatureCountState.touched || signatureCountState.active);

        return (
          <form onSubmit={handleSubmit} className={s.container}>
            <FormSection>
              <Field
                name="signatureCount"
                label="Wie viele Unterschriften Wahlberechtigter könntest du einsammeln?"
                component={SignatureCountSlider}
                type="range"
                min={1}
                max={30}
              />
            </FormSection>
            <AnimateHeight height={showAllFields ? 'auto' : 0}>
              <div>
                <FormSection heading="Wie möchtest du dich einbringen?">
                  <Field
                    name="wouldPutAndCollectSignatureLists"
                    type="checkbox"
                    label="Listen an öffentlichen Orten auslegen & einsammeln"
                    component={Checkbox}
                  ></Field>
                  <Field
                    name="wouldCollectSignaturesInPublicSpaces"
                    type="checkbox"
                    label="An öffentlich Orten Unterschriften von Fremden sammeln"
                    component={Checkbox}
                  ></Field>
                  <Field
                    name="wouldVisitLocalGroup"
                    type="checkbox"
                    label="An lokalen Treffen teilnehmen"
                    component={Checkbox}
                  ></Field>
                  <Field
                    name="wouldDonate"
                    type="checkbox"
                    label="Ich möchte euch finanziell unterstützen"
                    component={Checkbox}
                  ></Field>
                  <Field
                    name="wouldEngageCustom"
                    label="Weitere Möglichkeit: "
                    component={TextInputOneLine}
                  ></Field>
                </FormSection>

                <FormSection heading="Wer bist du?">
                  <Field
                    name="zipCode"
                    label="Postleitzahl"
                    placeholder="12345"
                    description="optional, für gezieltere Ansprache"
                    component={TextInputWrapped}
                  ></Field>
                  <Field
                    name="name"
                    label="Benutzername"
                    placeholder="Max Musterfrau"
                    description="optional"
                    component={TextInputWrapped}
                  ></Field>
                  <Field
                    name="email"
                    label="E-Mail"
                    placeholder="beispiel@blubb.de"
                    component={TextInputWrapped}
                  ></Field>
                </FormSection>

                <FormSection>
                  <Field
                    name="privacyConcent"
                    label={
                      <>
                        Ich stimme den{' '}
                        <Link to="/datenschutz/">Datenschutzbestimmungen</Link>{' '}
                        zu.
                      </>
                    }
                    type="checkbox"
                    component={Checkbox}
                  ></Field>
                </FormSection>

                <Button type="submit">Ich bin dabei!</Button>
              </div>
            </AnimateHeight>
          </form>
        );
      }}
    ></Form>
  );
};

const validate = values => {
  const errors = {};

  if (!values.privacyConcent) {
    errors.privacyConcent = 'Wir benötigen dein Einverständnis';
  }

  if (!validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse.';
  }
  return errors;
};
