import React, { useState, useContext, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { navigate } from 'gatsby';

import AuthContext from '../../../context/Authentication';
import { useSignOut } from '../../../hooks/Authentication';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { EnterLoginCode } from '../EnterLoginCode';

import FormSection from '../../Forms/FormSection';
import FormWrapper from '../../Forms/FormWrapper';
import { TextInputWrapped } from '../../Forms/TextInput';

import { validateEmail } from '../../utils';

import * as s from '../style.module.less';
import handIcon from '../icon-hand.svg';

import {
  CTAButtons,
  CTAButtonContainer,
  CTAButton,
} from '../../Layout/CTAButton';

const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

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
      <h3 className={s.headingWhite}>Schön, dass du an Bord bist.</h3>
      <p>
        {' '}
        Um dich zu identifizieren, haben wir dir einen Code per E-Mail
        geschickt. Bitte gib diesen ein:
      </p>
    </EnterLoginCode>
  );
};

export const RequestLoginCodeWithEmail = ({
  children,
  buttonText,
  inputClassName,
}) => {
  const { tempEmail, setTempEmail } = useContext(AuthContext);

  // Add event listener on url hash change
  useEffect(() => {
    window.addEventListener('hashchange', () => setTempEmail(undefined));
  }, [setTempEmail]);

  if (!tempEmail) {
    return (
      <FinallyMessage type="success">
        {/* Custom text */}
        {children ? (
          children
        ) : (
          <>
            {IS_BERLIN_PROJECT && (
              <img alt="Illustration einer Hand" src={handIcon} />
            )}
            <h2>Hey! Schön, dass du da bist.</h2>
            <p>
              Wenn du einen Account bei der Expedition Grundeinkommen hast,
              kannst du dich damit auch hier einloggen. Gib dafür einfach deine
              E-Mail-Adresse ein, und wir schicken dir dann einen Login-Code.
            </p>
          </>
        )}
        {/* Form for getting email */}
        <Form
          onSubmit={e => {
            setTempEmail(e.email);

            // We want to navigate to same url with hash, so we add
            // a the current url to the browser history, so we go back
            // to email form after user presses back button in login code form.
            // If the hash was already #code we want to replace the current page in the stack.
            navigate('#code', { replace: window.location.hash === '#code' });
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
                      inputClassName={inputClassName}
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
  return <EnterLoginCode inputClassName={inputClassName} />;
};
