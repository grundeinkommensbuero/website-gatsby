/**
 *  This component is used to validate the new email address,
 *  after user wanted to change it.
 */

import React, { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import FormWrapper from '../../Forms/FormWrapper';
import FormSection from '../../Forms/FormSection';
import { TextInputWrapped } from '../../Forms/TextInput';
import { useValidateNewEmail } from '../../../hooks/Authentication';
import * as gS from '../style.module.less';
import * as s from './style.module.less';
import { Button } from '../../Forms/Button';
import { ErrorMessage } from './ChangeEmail';

export const EnterCode = ({ onAnswerChallengeSuccess }) => {
  const [state, validateNewEmail] = useValidateNewEmail();

  useEffect(() => {
    if (state === 'success' && onAnswerChallengeSuccess) {
      onAnswerChallengeSuccess();
    }
  }, [state]);

  if (state === 'loading') {
    return (
      <span>
        <span className={gS.loading}></span>
        <b className={gS.loadingMsg}>Speichern</b>
      </span>
    );
  }

  if (state === 'success') {
    return null;
  }

  if (state === 'error') {
    return <ErrorMessage />;
  }

  return (
    <Form
      onSubmit={e => {
        validateNewEmail(e.code);
      }}
      validate={values => {
        if (!values.code)
          return { code: 'Bitte gib den Code aus der E-Mail an' };
        return {};
      }}
      render={({ handleSubmit }) => {
        return (
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <FormSection>
                <Field
                  name="code"
                  placeholder="Geheimer Code"
                  type="text"
                  autoComplete="off"
                  component={TextInputWrapped}
                ></Field>
                <Button size="SMALL" className={s.mobileBtn} type="submit">
                  code abschicken
                </Button>

                {state === 'wrongCode' && (
                  <p>
                    <b className={gS.infoMsg}>
                      Der eingegebene Code ist falsch oder bereits abgelaufen.
                    </b>
                  </p>
                )}
              </FormSection>
            </form>
          </FormWrapper>
        );
      }}
    />
  );
};
