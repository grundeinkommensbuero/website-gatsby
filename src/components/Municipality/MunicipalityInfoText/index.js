import React, { useContext } from 'react';
import s from './style.module.less';
import cN from 'classNames';
import { MunicipalityProgress } from '../MunicipalityProgress';
import { MunicipalityContext } from '../../../context/Municipality';

export const MunicipalityInfoText = () => {
  const { municipality } = useContext(MunicipalityContext);

  if (municipality) {
    return (
      <div className={s.municipalityText}>
        <p className={s.municipalityTextIntro}>
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
          Seit September 2019 läuft dafür in Berlin bereits das Volksbegehren.
        </p>
        <p>
          Im November 2020 haben wir die Sammelphase 1 erfolgreich beendet und
          34.468 Unterschriften bei der Senatsverwaltung eingereicht. Wenn das
          Land Berlin die Forderung nicht umsetzt, geht es in die nächste Phase.
        </p>
        <p>
          Sobald Phase 2 beginnt, brauchen wir noch mehr Unterschriften – melde
          dich jetzt an, um zu unterschreiben, sobald es weitergeht!
        </p>
      </>
    );
  }
  // Hamburg
  if (municipality.ags === '02000000') {
    return (
      <>
        <p>
          Seit Februar 2020 läuft deshalb in Hamburg bereits das Volksbegehren.
        </p>
        <p>
          Im März 2020 haben wir die Sammelphase 1 erfolgreich beendet und
          13.421 Unterschriften bei der Senatsverwaltung eingereicht. Wenn das
          Land Berlin die Forderung nicht umsetzt, geht es in die nächste Phase.
        </p>
        <p>
          Sobald Phase 2 beginnt, brauchen wir noch mehr Unterschriften – melde
          dich jetzt an, um zu unterschreiben, sobald es weitergeht!
        </p>
      </>
    );
  }
  // Bremen
  if (municipality.ags === '04011000') {
    return (
      <>
        <p>
          Seit August 2020 läuft dazu bereits unsere Unterschriftensammlung in
          Bremen.
        </p>
        <p>
          Wir brauchen insgesamt 25.000 Unterschriften, damit es zum
          Volksentscheid kommt.
        </p>

        <p>
          Melde dich jetzt an, um den Modellversuch auch in Bremen an den Staat
          zu bringen!
        </p>
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
        <p>
          Melde dich an, um Teil der Community zu werden und das Grundeinkommen
          in Hamburg voran zu bringen! Melde dich auch für den Newsletter an, um
          benachrichtigt zu werden, wie es in Hamburg weitergeht!
        </p>
      </>
    );
  }
  // Bremen
  if (municipality.ags === '04011000') {
    return (
      <>
        <p>
          Melde dich an, um Teil der Community zu werden und das Grundeinkommen
          in Bremen voran zu bringen! Melde dich auch für den Newsletter an, um
          benachrichtigt zu werden, wie es in Bremen weitergeht!
        </p>
      </>
    );
  }

  return (
    <p>
      Melde dich an, um Teil der Community zu werden und das Grundeinkommen nach{' '}
      {municipality.name} zu bringen! Melde dich auch für den Newsletter an, um
      benachrichtigt zu werden, wenn es in {municipality.name} losgeht!
    </p>
  );
};
