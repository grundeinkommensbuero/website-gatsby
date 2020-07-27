import React, { useState, useContext } from 'react';
import { Form, Field } from 'react-final-form';

import AuthContext from '../../../context/Authentication';
import { useSignOut } from '../../../hooks/Authentication';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { EnterLoginCode } from '../EnterLoginCode';

import FormSection from '../../Forms/FormSection';
import FormWrapper from '../../Forms/FormWrapper';
import { TextInputWrapped } from '../../Forms/TextInput';

import { validateEmail } from '../../utils';

import {
  CTAButtons,
  CTAButtonContainer,
  CTAButton,
} from '../../Layout/CTAButton';

export const RequestLoginCode = ({ children, buttonText }) => {
  const { customUserData: userData } = useContext(AuthContext);
  const [confirmSendCode, setConfirmSendCode] = useState(false);
  const signOut = useSignOut();

  if (!confirmSendCode) {
    return (
      <FinallyMessage type="success">
        {children ? (
          children
        ) : (
          <p>
            Du bist angemeldet als{' '}
            {userData && (userData.username || userData.email)}.
          </p>
        )}
        <CTAButtons>
          <CTAButtonContainer>
            <CTAButton onClick={() => setConfirmSendCode(true)} type="button">
              {buttonText || 'Einloggen'}
            </CTAButton>
          </CTAButtonContainer>
          <CTAButtonContainer>
            <CTAButton onClick={signOut} type="button">
              Abmelden
            </CTAButton>
          </CTAButtonContainer>
        </CTAButtons>
      </FinallyMessage>
    );
  }

  // If there is a temporary email, show EnterLoginCode
  return (
    <EnterLoginCode>
      <p>
        {' '}
        Um dich zu identifizieren, haben wir dir einen Code per E-Mail
        geschickt. Bitte gib diesen ein:
      </p>
    </EnterLoginCode>
  );
};

export const RequestLoginCodeWithEmail = ({ children, buttonText }) => {
  const { userId, tempEmail, setTempEmail } = useContext(AuthContext);

  if (!userId && !tempEmail) {
    return (
      <FinallyMessage type="success">
        {/* Custom text */}
        {children}
        {/* Form for getting email */}
        <Form
          onSubmit={e => {
            setTempEmail(e.email);
          }}
          validate={e => {
            let errors = {};
            if (e.email && !validateEmail(e.email)) {
              errors.email = 'Wir benötigen eine valide E-Mail Adresse';
            }
            return errors;
          }}
          render={({ handleSubmit }) => {
            return (
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  <FormSection>
                    <Field
                      name="email"
                      label="Email"
                      placeholder="Email"
                      type="text"
                      autoComplete="on"
                      component={TextInputWrapped}
                    ></Field>
                  </FormSection>

                  <CTAButtonContainer>
                    <CTAButton type="submit">
                      {buttonText || 'Abschicken'}
                    </CTAButton>
                  </CTAButtonContainer>
                </form>
              </FormWrapper>
            );
          }}
        />
      </FinallyMessage>
    );
  }

  // If there is a temporary email, show EnterLoginCode
  return (
    <EnterLoginCode>
      <p>
        {' '}
        Um dich zu identifizieren, haben wir dir einen Code per E-Mail
        geschickt. Bitte gib diesen ein:
      </p>
    </EnterLoginCode>
  );
};
