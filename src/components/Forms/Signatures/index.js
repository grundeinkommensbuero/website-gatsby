import React from 'react';
import { Form, Field } from 'react-final-form';
import FormSection from '../FormSection';
import { TextInputWrapped } from '../TextInput';
import CTAButton from '../../Layout/CTAButton';
import { validateEmail } from '../../utils';
import { Checkbox } from '../Checkbox';
import FormWrapper from '../FormWrapper';

export default ({ className, signatureId }) => {
  return (
    <Form
      onSubmit={e => {
        e.signatureId = signatureId;
        console.log(e);
        //   savePledge(e);
      }}
      validate={validate}
      render={({ handleSubmit }) => {
        return (
          <FormWrapper className={className}>
            <form onSubmit={handleSubmit}>
              <FormSection>
                <Field
                  name="email"
                  label="E-Mail"
                  description="Pflichtfeld"
                  placeholder="E-Mail"
                  component={TextInputWrapped}
                ></Field>
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

              <CTAButton type="submit" illustration="POINT_LEFT">
                Ich bin dabei, sobald es losgeht!
              </CTAButton>
            </form>
          </FormWrapper>
        );
      }}
    />
  );
};

const validate = values => {
  const errors = {};

  if (!values.privacyConsent) {
    errors.privacyConsent = 'Wir benötigen dein Einverständnis';
  }

  // if (!values.zipCode) {
  //   errors.zipCode =
  //     'Wir benötigen deine Postleitzahl, um dich dem korrekten Bundesland zuzuordnen';
  // }

  if (values.email && values.email.includes('+')) {
    errors.email = 'Zurzeit unterstützen wir kein + in E-Mails';
  }

  if (!validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};
