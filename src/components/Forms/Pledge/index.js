import React from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { usePledgeApi } from '../../../hooks/Api/Pledge';
import { Button } from '../Button';
import { TextInput, TextInputInline, TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import LabelInputErrorWrapper from '../LabelInputErrorWrapper';

export default ({}) => {
  const [state, savePledge] = usePledgeApi();
  /*
    state (string) can be:
    null (before form is submitted), "saving", "saved", "userExists", "error"
  */
  console.log('pledge state', state);
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
              name="engagementLevel"
              label="Wie engagiert bist du?"
              component={EngagementSlider}
              type="range"
              min={1}
              max={5}
            />
          </FormSection>

          <FormSection heading="Wie möchtest du dich einbringen?">
            <Field
              name="wouldVisitLocalGroup"
              type="checkbox"
              label="Zu lokalen Gruppen gehen"
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
              label="Anderes: "
              component={TextInputOneLine}
            ></Field>
          </FormSection>

          <FormSection
            heading="Im Falle lokaler Aktionen würden wir dich gern gezielt ansprechen.
            Wo wohnst du?"
          >
            <Field name="zipCode" label="PLZ" component={TextInput}></Field>
          </FormSection>

          <FormSection>
            <Field
              name="eligibleToVote"
              label="Bist du wahlberechtigt?"
              component={Select}
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
              component={TextInputWrapped}
            ></Field>
          </FormSection>

          <FormSection heading="Wie möchtest du genannt werden?">
            <Field
              name="name"
              label="Dein Name"
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

const Checkbox = ({ input, label, meta }) => (
  <label style={{ display: 'block' }}>
    <input {...input} />
    <span>{label}</span>
    {meta.error && meta.touched && <div>{meta.error}</div>}
  </label>
);

const TextInputOneLine = ({ input, label, meta }) => (
  <label style={{ display: 'block' }}>
    <span>{label}</span>
    <TextInputInline {...input} />
    {meta.error && meta.touched && <div>{meta.error}</div>}
  </label>
);

const Select = ({ input, children, label, meta }) => (
  <LabelInputErrorWrapper label={label} meta={meta}>
    <select {...input}>{children}</select>
  </LabelInputErrorWrapper>
);

const EngagementSlider = ({ input, label, min, max }) => (
  <div>
    <label htmlFor={`slider_${input.name}`}>{label}</label>
    <br />
    <input id={`slider_${input.name}`} min={min} max={max} {...input} />
  </div>
);
