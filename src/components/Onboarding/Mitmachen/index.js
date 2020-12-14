import React from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import { Button } from '../../Forms/Button';


export const Mitmachen = ({ userData, userId }) => {

  return (
    <section className={gS.pageContainer}>

      <h1>Willkommen bei der Expedition Grundeinkommen!</h1>
      <p className={gS.descriptionTextLarge}>Hallo {userData.username}!</p>
      <p className={gS.descriptionTextLarge}>
        Unser Ziel ist es, das Grundeinkommen in die Städte und Gemeinden{' '}
          Deutschlands zu holen. Wir freuen uns sehr, dass du uns in GEMEINDE{' '}
          dabei hilfst!
        </p>

      <h4 className={s.ProgressBarTitle}>Gemeinde</h4>
      <div className={s.progressBarContainer}>
        <div className={s.progressBar}></div>
      </div>
      <p className={gS.descriptionTextLarge}>16/100 Unterstützer:innen</p>
      <br />

      <h4>Wie kannst du dich einbringen?</h4>
      <p className={gS.descriptionTextLarge}>
        Wir werden dich per Email benachrichtigen, sobald sie Unterschriftensammlung{' '}
          in GEMEINDE losgeht.
        </p>
      <p className={gS.descriptionTextLarge}>
        Weißt du schon, wie du helfen kannst?
        </p>
      <br />

      <Button className={s.fullWidthBtn}>Ich kann unterschreiben</Button><br /><br />
      <Button className={s.fullWidthBtn}>Ich kann Unterschriften sammeln</Button><br /><br />
      <Button className={s.fullWidthBtn}>Ich kann Sammelevents organisieren</Button><br /><br />
    </section>
  );
};