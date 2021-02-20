import React, { useContext } from 'react';
import { MunicipalityProgress } from '../MunicipalityProgress';
import { MunicipalityContext } from '../../../context/Municipality';

export const MunicipalityInfoText = () => {
  const { municipality } = useContext(MunicipalityContext);

  if (municipality) {
    return (
      <div>
        <p>
          Gemeinsam starten wir an deinem Wohnort den ersten staatlichen
          Modellversuch zum Grundeinkommen in Deutschland.
        </p>
        <MunicipalityDescription municipality={municipality} />
        <div>
          <MunicipalityProgress showHeadline={false} showDescription={false} />
        </div>
        <MunicipalityCTA municipality={municipality} />
      </div>
    );
  } else {
    return <></>;
  }
};

const MunicipalityDescription = ({ municipality }) => {
  if (!municipality) {
    return <></>;
  }

  // Berlin
  if (municipality.ags === '11000000') {
    return (
      <>
        <p>
          Seit dem x.x.2019 läuft deshalb unsere Kampagne in Berlin bereits auf
          Bundeslandsebene.
        </p>
        <p>
          Im November 2020 haben wir die Sammelphase 1 erfolgreich beendet und
          34.468 Unterschriften bei der Senatsverwaltung eingereicht!
        </p>
        <p>
          Sobald Phase 2 beginnt, brauchen wir noch mehr Unterschriften - melde
          dich jetzt an, um zu unterschreiben, sobald es los geht!
        </p>
      </>
    );
  }
  // Hamburg
  if (municipality.ags === '02000000') {
    return (
      <>
        <p>Hamburg</p>
      </>
    );
  }
  // Bremen
  if (municipality.ags === '04011000') {
    return (
      <>
        <p>Bremen</p>
      </>
    );
  }

  return (
    <p>
      Wenn sich genug Menschen in {municipality.name} anmelden, kann der
      Modellversuch losgehen. Melde dich an, um eine:r davon zu werden.
    </p>
  );
};

const MunicipalityCTA = ({ municipality }) => {
  if (!municipality) {
    return <></>;
  }

  // Berlin
  if (municipality.ags === '11000000') {
    return (
      <>
        <p>
          Melde dich an, um Teil der Community zu werden und das Grundeinkommen
          in Berlin voran zu bringen! Melde dich auch für den Newsletter an, um
          benachrichtigt zu werden, wie es in Berlin weitergeht!
        </p>
      </>
    );
  }
  // Hamburg
  if (municipality.ags === '02000000') {
    return (
      <>
        <p>Hamburg</p>
      </>
    );
  }
  // Bremen
  if (municipality.ags === '04011000') {
    return (
      <>
        <p>Bremen</p>
      </>
    );
  }

  return (
    <p>
      Melde dich an, um Teil der Community zu werden und das Grundeinkommen nach{' '}
      {municipality.name} zu bringen! Melde dich auch für den Newsletter an, um
      benachrichtigt zu werden, wenn es in
      {municipality.name} losgeht!
    </p>
  );
};
