import React from 'react';
import { Link } from 'gatsby';
import s from './style.module.less';
import { Button } from '../../Forms/Button';
import cN from 'classnames';

export const OnboardingOverview = () => {
  console.log(window.location.pathname);

  return (
    <>
      <section className={s.pageContainer}>

        <section className={s.breadcrumbContainer}>
          <Link
            className={
              cN(s.breadcrumbElement,
                { [s.breadcrumbElementActive]: window.location.pathname === '/onboarding' }
              )}
            to="/onboarding"
          >Mitmachen</Link>

          <Link className={s.breadcrumbElement} to="teilen">Teilen</Link>
          <Link className={s.breadcrumbElement} to="spenden">Spenden</Link>
          <Link className={s.breadcrumbElement} to="profil-einrichten">Profil einrichten</Link>
        </section>

        <h1>Willkommen bei der Expedition Grundeinkommen!</h1>
        <p className={s.descriptionTextLarge}>Hallo User:in!</p>
        <p className={s.descriptionTextLarge}>
          Unser Ziel ist es, das Grundeinkommen in die Städte und Gemeinden{' '}
          Deutschlands zu holen. Wir freuen uns sehr, dass du uns in GEMEINDE{' '}
          dabei hilfst!
        </p>

        <h4 className={s.ProgressBarTitle}>Gemeinde</h4>
        <div className={s.progressBarContainer}>
          <div className={s.progressBar}></div>
        </div>
        <p className={s.descriptionTextLarge}>16/100 Unterstützer:innen</p>
        <br />

        <h4>Wie kannst du dich einbringen?</h4>
        <p className={s.descriptionTextLarge}>
          Wir werden dich per Email benachrichtigen, sobald sie Unterschriftensammlung{' '}
          in GEMEINDE losgeht.
        </p>
        <p className={s.descriptionTextLarge}>
          Weißt du schon, wie du helfen kannst?
        </p>
        <br />

        <Button className={s.fullWidthBtn}>Ich kann unterschreiben</Button><br /><br />
        <Button className={s.fullWidthBtn}>Ich kann Unterschriften sammeln</Button><br /><br />
        <Button className={s.fullWidthBtn}>Ich kann Sammelevents organisieren</Button><br /><br />
      </section>
    </>
  );
};