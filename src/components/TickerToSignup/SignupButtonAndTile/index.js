import React, { useContext } from 'react';
// import AuthContext from '../../../context/Authentication';
import { MunicipalityContext } from '../../../context/Municipality';
import { useUserMunicipalityContentfulState } from '../../../hooks/Municipality/UserMunicipalityContentfulState';

import s from './style.module.less';
import cN from 'classnames';

import { SignUpButton } from '../SignupButton';

export const SignupButtonAndTile = () => {
  // const { userId, customUserData: userData } = useContext(AuthContext);
  const { municipality } = useContext(MunicipalityContext);
  const { userContentfulState } = useUserMunicipalityContentfulState();

  const welcomeExistingMessage = getWelcomeExistingMessage(municipality);
  const buttonText = getButtonText(municipality, userContentfulState);

  if (municipality && userContentfulState === 'loggedOut') {
    return (
      <>
        <h2 className={s.inviteHeadline}>Komm dazu.</h2>
        <SignUpButton className={s.signUpCTA}>{buttonText}</SignUpButton>
      </>
    );
  } else if (
    municipality &&
    userContentfulState === 'loggedInNoMunicipalitySignup'
  ) {
    return (
      <>
        <h2 className={s.inviteHeadline}>Komm dazu.</h2>
        <div className={cN(s.tileContainer, s.sectionWhite)}>
          <h3>Willkommen zurück!</h3>
          <p>{welcomeExistingMessage}</p>
          <SignUpButton className={s.signUpCTA}>{buttonText}</SignUpButton>
        </div>
      </>
    );
  } else if (
    municipality &&
    userContentfulState === 'loggedInOtherMunicipalitySignup'
  ) {
    return (
      <>
        <SignUpButton className={s.signUpCTA}>{buttonText}</SignUpButton>
      </>
    );
  } else {
    return <></>;
  }
};

const getButtonText = (municipality, userContentfulState) => {
  if (!municipality) {
    return '';
  }

  // Berlin
  if (municipality.ags === '11000000') {
    return `Ja, es soll weiter gehen!`;
  }
  // Hamburg
  if (municipality.ags === '02000000') {
    return `Ja, es soll weiter gehen!`;
  }
  // Bremen
  if (municipality.ags === '04011000') {
    return `Ja, es soll weiter gehen!`;
  }

  if (userContentfulState === 'loggedInOtherMunicipalitySignup') {
    return 'Sei dabei';
  }

  return `Jetzt in ${municipality.name} anmelden!`;
};

const getWelcomeExistingMessage = municipality => {
  if (!municipality) {
    return '';
  }
  // Berlin
  if (municipality.ags === '11000000') {
    return `Schön, dass du wieder da bist!
    In ${municipality.name} geht die Unterschriftensammlung bald in die zweite Phase. Hilfst du uns dabei, dass es weiter geht?`;
  }

  // Hamburg
  if (municipality.ags === '02000000') {
    return `Schön, dass du wieder da bist!
    In ${municipality.name} geht die Unterschriftensammlung bald in die zweite Phase. Hilfst du uns dabei, dass es weiter geht?`;
  }

  // Bremen
  if (municipality.ags === '04011000') {
    return `Schön, dass du wieder da bist!
    In ${municipality.name} geht die Unterschriftensammlung bald in die zweite Phase. Hilfst du uns dabei, dass es weiter geht?`;
  }

  return `Schön, dass du wieder da bist! Trage dich jetzt für
  ${municipality.name} ein, um das Grundeinkommen in ${municipality.name}
  voran zu bringen!`;
};
