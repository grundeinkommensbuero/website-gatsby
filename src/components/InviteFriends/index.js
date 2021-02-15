import React, { useContext } from 'react';
import { MunicipalityContext } from '../../context/Municipality';

export const InviteFriends = () => {
  const { municipality } = useContext(MunicipalityContext);
  const sharingFactorAnnouncement = getSharingFactorAnnouncement(municipality);
  const sharingCTA = getSharingCTA(municipality);
  return (
    <div>
      <h2>Jetzt Freunde einladen</h2>
      {sharingCTA && <p>{sharingCTA}</p>}
      <div>Share Buttons</div>
      {sharingFactorAnnouncement && <p>{sharingFactorAnnouncement}</p>}
    </div>
  );
};

const getSharingCTA = municipality => {
  if (!municipality) {
    return undefined;
  }
  const { signups, goal, name } = municipality;
  if (signups < goal) {
    return `Erst wenn sich genug Menschen in ${name} anmelden, kann der
Modellversuch losgehen. Lade Menschen ein, die du kennst, um den Balken
voll zu machen!`;
  } else {
    return `Wir haben das Anmeldeziel in ${name} erreicht! Für die nächsten Schritte brauchen wir jedoch die Unterstützung von so vielen Menschen wie möglich. Lade Menschen ein, die du kennst, um den Modellversuch möglich zu machen!`;
  }
};

const getSharingFactor = (signups, goal) => {
  if (signups <= 0 || signups >= goal) {
    return undefined;
  } else {
    return (goal - signups) / signups;
  }
};

const getSharingFactorAnnouncement = municipality => {
  if (!municipality) {
    return undefined;
  }
  const { signups, goal, name } = municipality;

  let factor = getSharingFactor(signups, goal);
  if (typeof factor === 'undefined') {
    return undefined;
  } else if (factor > 1) {
    factor = parseInt(Math.ceil(factor));
    return `Wenn jeder angemeldete Mensch in ${name} ${factor} Menschen einlädt, ist das
    Ziel erreicht!`;
  } else {
    factor = parseInt(Math.ceil(factor * 10));
    if (factor <= 10) {
      return `Wenn einer von ${factor} angemeldeten Mensch in ${name} einen Menschen einlädt, ist das
      Ziel erreicht!`;
    } else {
      return `Wenn noch ${goal -
        signups} angemeldete Menschen in ${name} einen Menschen einladen, ist das
      Ziel erreicht!`;
    }
  }
};
