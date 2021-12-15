import React, { useContext, useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import AuthContext from '../../context/Authentication';
import { useUpdateUser } from '../../hooks/Api/Users/Update';
import {
  InlineButton,
  InlineLinkButton,
  LinkButtonLocal,
} from '../Forms/Button';
import DonationForm from '../Forms/DonationForm';
import { FinallyMessage } from '../Forms/FinallyMessage';
import { TextInputWrapped } from '../Forms/TextInput';
import { CTAButton, CTAButtonContainer } from '../Layout/CTAButton';
import { RequestLoginCodeWithEmail } from '../Login/RequestLoginCode';
import * as s from './style.module.less';

export const Lottery = () => {
  const [wantsToDonate, setWantsToDonate] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { isAuthenticated, customUserData: userData } = useContext(AuthContext);
  const [updateUserState, updateUser] = useUpdateUser();

  useEffect(() => {
    // If user has signed in and does not have username, we want to
    // sign em up for the lotto right away.
    if (
      isAuthenticated &&
      userData.username &&
      wantsToDonate !== null &&
      !hasSubmitted
    ) {
      updateUser({ lottery: '2021' });
      // We need to set a flag, otherwise it will trigger multiple times,
      // while user goes through onboarding
      setHasSubmitted(true);
    }
  }, [isAuthenticated, wantsToDonate, userData]);

  if (wantsToDonate === null) {
    return (
      <>
        <h2>
          Spende für die Expedition - und zieh automatisch dein Weihnachtslos!
        </h2>
        <p>
          Zeit für Geschenke: Bei unserer Weihnachtsverlosung kannst du
          nachhaltige und innovative Preise gewinnen - vom Päckchen Kaffee über
          Bücher zum Grundeinkommen bis zum Kinogutschein! Spende jetzt für die
          Kampagnen der Expedition Grundeinkommen im Jahr 2022 - und du nimmst
          automatisch am Gewinnspiel teil. Die Verlosung findet Anfang Januar
          statt.
        </p>

        <CTAButtonContainer className={s.primaryButtonContainer}>
          <CTAButton
            onClick={() => {
              setWantsToDonate(true);
            }}
            size="MEDIUM"
          >
            Spenden und an der Verlosung teilnehmen
          </CTAButton>
        </CTAButtonContainer>

        <p>
          Als Expedition Grundeinkommen freuen wir uns sehr über deine Spende!
          Unten auf dieser Seite erfährst du, warum sie so wichtig ist, um
          Grundeinkommen in Deutschland nach vorne zu bringen. Wenn du möchtest,
          kannst du aber auch{' '}
          <InlineButton
            onClick={() => {
              setWantsToDonate(false);
            }}
          >
            ohne Spende an der Verlosung teilnehmen
          </InlineButton>
          . Die Teilnahmebedingungen findest du{' '}
          <InlineLinkButton href={'/teilnahmebedingungen'} target="_blank">
            hier
          </InlineLinkButton>
          .
        </p>
      </>
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
        {wantsToDonate && <p>Bitte einen Moment Geduld...</p>}
        {!wantsToDonate && (
          <p>Los wird generiert, bitte einen Moment Geduld...</p>
        )}
      </FinallyMessage>
    );
  }

  if (updateUserState === 'updated') {
    return (
      <>
        <FinallyMessage>
          {wantsToDonate && (
            <p>
              Vielen Dank für die Teilnahme. Dein Los wird dir per E-Mail
              zugesendet. <br />
              Im nächsten Schritt kannst du eine Spende hinterlassen.{' '}
            </p>
          )}
          {!wantsToDonate && (
            <p>Dein Los wurde dir per E-Mail zugesendet. Viel Glück!</p>
          )}
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
