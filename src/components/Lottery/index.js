import React, { useContext, useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import AuthContext from '../../context/Authentication';
import { useUpdateUser } from '../../hooks/Api/Users/Update';
import { InlineButton } from '../Forms/Button';
import DonationForm from '../Forms/DonationForm';
import { FinallyMessage } from '../Forms/FinallyMessage';
import { TextInputWrapped } from '../Forms/TextInput';
import { CTAButton, CTAButtonContainer } from '../Layout/CTAButton';
import { RequestLoginCodeWithEmail } from '../Login/RequestLoginCode';
import * as s from './style.module.less';

export const Lottery = () => {
  const [wantsToDonate, setWantsToDonate] = useState(null);
  const { isAuthenticated, customUserData: userData } = useContext(AuthContext);
  const [updateUserState, updateUser] = useUpdateUser();

  useEffect(() => {
    // If user has signed in and does not have username, we want to
    // sign em up for the lotto right away.
    if (isAuthenticated && userData.username && wantsToDonate !== null) {
      updateUser({ lottery: '2021' });
    }
  }, [isAuthenticated, wantsToDonate, userData]);

  if (wantsToDonate === null) {
    return (
      <div className={s.container}>
        <CTAButtonContainer>
          <CTAButton
            onClick={() => {
              setWantsToDonate(true);
            }}
            size="MEDIUM"
          >
            Spenden und an der Verlosung teilnehmen
          </CTAButton>
        </CTAButtonContainer>
        <p className={s.buttonText}>
          <InlineButton
            onClick={() => {
              setWantsToDonate(false);
            }}
          >
            Nur an der Verlosung teilnehmen
          </InlineButton>
        </p>
      </div>
    );
  }

  if (wantsToDonate !== null && !isAuthenticated) {
    return (
      <RequestLoginCodeWithEmail>
        <h3 className={s.headingWhite}>
          Hey! Schön, dass du da bist. Hier geht's zum Login.
        </h3>
      </RequestLoginCodeWithEmail>
    );
  }

  if (updateUserState === 'loading') {
    return (
      <FinallyMessage state="progress">
        Los wird generiert, bitte einen Moment Geduld...
      </FinallyMessage>
    );
  }

  if (updateUserState === 'updated') {
    return (
      <>
        <FinallyMessage>
          Dein Los wurde dir per E-Mail zugesendet. Viel Glück!
        </FinallyMessage>
        {wantsToDonate && <DonationForm theme={'christmas'} />}
      </>
    );
  }

  if (wantsToDonate !== null && isAuthenticated) {
    // Wait for userdata to not be empty, so there won't be any flash
    // of the form
    if (Object.keys(userData).length > 0 && !userData.username) {
      return (
        <Form
          onSubmit={({ username }) => {
            const data = { lottery: '2021' };

            if (username && username !== '') {
              data.username = username;
            }

            updateUser(data);
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="username"
                label="An wen soll das Los ausgestellt werden?"
                placeholder="Vorname (optional)"
                component={TextInputWrapped}
              />
              <CTAButtonContainer className={s.buttonContainer}>
                <CTAButton type="submit">Los generieren</CTAButton>
              </CTAButtonContainer>
            </form>
          )}
        />
      );
    }
  }

  return null;
};

// Default export needed for lazy loading
export default Lottery;
