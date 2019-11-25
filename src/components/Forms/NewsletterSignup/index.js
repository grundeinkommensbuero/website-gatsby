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

export default ({ className }) => {
  const [state, saveNewsletter] = useNewsletterApi();

  return (
    <Form
      onSubmit={data => {
        console.log(data);
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

              <CTAButtonContainer>
                <CTAButton type="submit">
                  Ich bin dabei, wenn’s losgeht!
                </CTAButton>
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
