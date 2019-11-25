import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { useNewsletterApi } from '../../../hooks/Api/Newsletter';
import { Form, Field } from 'react-final-form';
import FormWrapper from '../FormWrapper';
import FormSection from '../FormSection';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import { validateEmail } from '../../utils';
import { TextInputWrapped } from '../TextInput';
import { FinallyMessage } from '../FinallyMessage';

export default ({ className }) => {
  const [state, saveNewsletter] = useNewsletterApi();

  if (state === 'saving') {
    return (
      <FinallyMessage state="progress" className={className}>
        Speichere...
      </FinallyMessage>
    );
  }

  if (state === 'error') {
    return (
      <FinallyMessage state="error" className={className}>
        Da ist was schief gegangen. Melde dich bitte bei uns{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>
        .
      </FinallyMessage>
    );
  }

  if (state === 'userExists') {
    return (
      <FinallyMessage state="error" className={className}>
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
      </FinallyMessage>
    );
  }

  if (state === 'saved') {
    return (
      <FinallyMessage className={className}>
        Yay, danke! Bitte geh in dein E-Mail-Postfach und bestätige, dass wir
        deine Daten speichern dürfen. Falls du unsere E-Mail nicht findest, sieh
        bitte auch in deinem Spam-Ordner nach!
      </FinallyMessage>
    );
  }

  return (
    <Form
      onSubmit={data => {
        console.log(data);
        saveNewsletter(data.email);
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
                  placeholder="E-Mail"
                  component={TextInputWrapped}
                ></Field>
              </FormSection>

              <CTAButtonContainer>
                <CTAButton type="submit">Eintragen</CTAButton>
              </CTAButtonContainer>
            </form>
          </FormWrapper>
        );
      }}
    />
  );
};

const validate = values => {
  const errors = {};

  if (values.email && values.email.includes('+')) {
    errors.email = 'Zurzeit unterstützen wir kein + in E-Mails';
  }

  if (!validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};
