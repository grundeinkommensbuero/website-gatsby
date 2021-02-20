import React from 'react';
import gS from '../style.module.less';
import s from './style.module.less';
import { Button } from '../../Forms/Button';

export const FinalNote = ({ compIndex, setCurrentElementByIndex, municipality }) => {

  return (
    <section className={gS.pageContainer}>

      <h3 className={gS.moduleTitle}>Wie geht es jetzt weiter?</h3>
      <p className={gS.descriptionTextLarge}>
        Danke!
        Schau doch in den kommenden Tagen wieder vorbei und sieh nach....
      </p>

      <Button
        className={s.redirectButton}
        onClick={() => setCurrentElementByIndex(compIndex + 1)}
      >
        Zur Mitmachen-Seite
      </Button>

      <p>
        Auf deiner Ortsseite findest du alle aktuellen Informationen für deine Kampagne{' '}
      in {municipality.name}. Dort siehst du auch, ob sich dein Ort schon qualifiziert hat.{' '}
      Ebenso findest du auf der Webseite deine persönliche Profilseite und viele spannende Informationen.
      </p>

      <Button
        className={s.redirectButton}
        onClick={() => setCurrentElementByIndex(compIndex + 1)}
      >
        Zur Unterseite
      </Button>

    </section>
  );
};