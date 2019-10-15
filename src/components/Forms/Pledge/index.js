import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { usePledgeApi } from '../../../hooks/Api/Pledge';
import { Button } from '../Button';
import { TextInput, TextInputWrapped, TextInputOneLine } from '../TextInput';
import FormSection from '../FormSection';
import { Checkbox } from '../Checkbox';
import { SelectWrapped } from '../Select';
import { EngagementSlider } from '../EngagementSlider';

export default () => {
  const [state, savePledge] = usePledgeApi();
  /*
    state (string) can be:
    null (before form is submitted), "saving", "saved", "userExists", "error"
  */
  console.log('pledge state', state);
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
        console.log('sumbmitting...', e);
        const foo = savePledge(e);
        foo.then(e => {
          console.log('finally', e);
        });
      }}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormSection>
            <Field
              name="signatureCount"
              label="Wie viele Unterschriften Wahlberechtigter könntest du einsammeln?"
              component={EngagementSlider}
              type="range"
              min={1}
              max={5}
            />
          </FormSection>

          <FormSection heading="Wie möchtest du dich einbringen?">
            <Field
              name="wouldSpreadAndCollectSignatures"
              type="checkbox"
              label="Listen an öffentlichen Orten auslegen & einsammeln"
              component={Checkbox}
            ></Field>
            <Field
              name="wouldSpreadAndCollectSignatures"
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

          <FormSection
            heading="Im Falle lokaler Aktionen würden wir dich gern gezielt ansprechen.
            Wo wohnst du?"
          >
            <Field
              name="zipCode"
              label="Postleitzahl"
              placeholder="12345"
              component={TextInputWrapped}
            ></Field>
          </FormSection>

          <FormSection>
            <Field
              name="eligibleToVote"
              label="Bist du wahlberechtigt?"
              component={SelectWrapped}
            >
              <option />
              <option value="2019">Ja</option>
              <option value="2020">ab 2020</option>
              <option value="2021">ab 2021</option>
              <option value="laterThan2021">später</option>
            </Field>
          </FormSection>

          <FormSection heading="Wie erreichen wir dich?">
            <Field
              name="email"
              label="E-Mail"
              placeholder="beispiel@blubb.de"
              component={TextInputWrapped}
            ></Field>
          </FormSection>

          <FormSection heading="Wie möchtest du genannt werden?">
            <Field
              name="name"
              label="Dein Name"
              placeholder="Max Musterfrau"
              component={TextInputWrapped}
            ></Field>
          </FormSection>

          <FormSection>
            <Field
              name="privacyConcent"
              label="Datenschutz und so"
              type="checkbox"
              component={Checkbox}
            ></Field>
          </FormSection>

          <Button type="submit">Ich bin dabei!</Button>
        </form>
      )}
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
