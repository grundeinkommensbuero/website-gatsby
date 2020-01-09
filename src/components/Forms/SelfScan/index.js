import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import FormWrapper from '../FormWrapper';
import FormSection from '../FormSection';
import { FinallyMessage } from '../FinallyMessage';
import { TextInputWrapped } from '../TextInput';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import s from './style.module.less';
import { useUpdateSignatureListByUser } from '../../../hooks/Api/Signatures/Update';

export default ({ className, successMessage }) => {
  const [state, updateSignatureList] = useUpdateSignatureListByUser();

  // Updating a list should be possible via list id or user id
  const [listId, setListId] = useState({});
  const [userId, setUserId] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // Will be null, if param does not exist
    setListId(urlParams.get('listId'));
    setUserId(urlParams.get('userId'));
  }, []);

  if (state === 'saving') {
    return <FinallyMessage state="progress">Speichere...</FinallyMessage>;
  }

  if (state === 'saved') {
    return <FinallyMessage state="success">{successMessage}</FinallyMessage>;
  }

  if (state === 'noListFound') {
    return (
      <FinallyMessage state="error">
        Es wurde keine Liste gefunden.
      </FinallyMessage>
    );
  }

  if (state === 'error') {
    return (
      <FinallyMessage state="error">
        Da ist was schief gegangen. Melde dich bitte bei{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>{' '}
        und sende uns folgenden Text: listId={listId}.
      </FinallyMessage>
    );
  }

  return (
    <Form
      onSubmit={data => {
        // We can set both the list id and user id here,
        // because if the param is not set it will just be null
        data.listId = listId;
        data.userId = userId;

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
                  label="Anzahl Unterschriften. Du kannst auch die Unterschriften mehrerer Bögen auf einmal eingeben."
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
