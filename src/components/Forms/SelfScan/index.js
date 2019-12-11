import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import FormWrapper from '../FormWrapper';
import FormSection from '../FormSection';
import { FinallyMessage } from '../FinallyMessage';
import { TextInputWrapped } from '../TextInput';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import s from './style.module.less';
import { useUpdateSignatureListByUser } from '../../../hooks/Api/Signatures/Update';

export default ({ className }) => {
  const [state, updateSignatureList] = useUpdateSignatureListByUser();
  const [listId, setListId] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setListId(urlParams.get('listId'));
  }, []);

  if (state === 'saving') {
    return <FinallyMessage state="progress">Speichere...</FinallyMessage>;
  }

  if (state === 'saved') {
    return (
      <FinallyMessage state="success">
        Supi danke! Und jetzt ab die Post an uns geschickt!
      </FinallyMessage>
    );
  }

  if (state === 'error') {
    return (
      <FinallyMessage state="error">
        Da ist was schief gegangen. Melde dich bitte bei uns{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>
        .
      </FinallyMessage>
    );
  }

  return (
    <Form
      onSubmit={data => {
        data.listId = listId;
        console.log('saving...', data);
        updateSignatureList(data);
      }}
      validate={validate}
      render={({ handleSubmit }) => {
        return (
          <FormWrapper className={className}>
            <form onSubmit={handleSubmit}>
              <FormSection className={s.formSection}>
                <Field
                  name="count"
                  label="Anzahl der Unterschriften auf diesem Bogen"
                  placeholder="1"
                  component={TextInputWrapped}
                  type="number"
                  min={1}
                  inputClassName={s.countField}
                ></Field>
              </FormSection>

              <CTAButtonContainer>
                <CTAButton type="submit">Speichern</CTAButton>
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

  if (!values.count) {
    errors.count = 'Muss ausgefüllt sein';
  }

  return errors;
};
