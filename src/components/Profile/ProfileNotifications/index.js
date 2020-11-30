import React, { useState } from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import NewsletterCard from './NewsletterCard';
import { SearchPlaces } from '../../Forms/SearchPlaces';
import { TextInput } from '../../Forms/TextInput';
import { Button } from '../../Forms/Button';
import { MessengerButtonRow } from '../MessengerButtonRow.js';

const userCustomNewslettersFromDB = [
  {
    city: 'Berlin',
    value: true,
    extraInfo: false,
    timestamp: '2020-11-20T12:35:42.218Z',
    key: 'abc-67890',
  },
  {
    city: 'Eberswalde',
    value: true,
    extraInfo: true,
    timestamp: '2020-11-21T12:35:42.218Z',
    key: 'abc-12345',
  },
];

const newNewsletter = {
  city: 'Hamburg',
  value: true,
  extraInfo: true,
  timestamp: '2020-11-23T12:35:42.218Z',
  key: 'abc-24680',
};

export default ({ userData, userId }) => {
  const [mainNewsletterConsent, updateMainNewsletterConsent] = useState({});
  const [customNewsletterSettings, updateCustomNewsletterSettings] = useState(
    userCustomNewslettersFromDB
  );
  const [municipality, setMunicipality] = useState();

  // userData is undefined on intitial pageload, fill state when it is ready:
  if (
    userData &&
    userData.newsletterConsent &&
    mainNewsletterConsent.value === undefined
  ) {
    updateMainNewsletterConsent(userData.newsletterConsent);
  }

  const revokeMainNewsletterConsent = () => {
    let updatedMainNewsletterConsent = {
      ...mainNewsletterConsent,
    };
    updatedMainNewsletterConsent.value = !mainNewsletterConsent.value;
    updateMainNewsletterConsent(updatedMainNewsletterConsent);
  };

  const handlePlaceSelect = municipality => {
    console.log(municipality);
    setMunicipality(municipality);
  };

  const addNewsletter = newsletterToAdd => {
    let updatedNewsletter = [...customNewsletterSettings];
    updatedNewsletter.push(newsletterToAdd);
    updateCustomNewsletterSettings(updatedNewsletter);
  };

  const activeNewsletterCards = customNewsletterSettings.map(newsletter => {
    return <NewsletterCard newsletter={newsletter} key={newsletter.key} />;
  });

  return (
    <section className={gS.profilePageGrid}>
      <section className={cN(gS.editPageSection, gS.editSettings)}>
        <div className={gS.backToProfile}>
          {/* add a cancel method */}
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>

        <h3 className={s.sectionHeadline}>Newsletter & Kontakt</h3>
        <h4 className={gS.optionSectionHeading}>
          Deine abonnierten Newsletter
        </h4>
        {userData && userData.newsletterConsent ? (
          <section>
            {/* Main Card always visible */}
            <div className={s.newsletterCard}>
              <p className={s.newsletterCardHeading}>
                Allgemeiner Expeditions-Letter
              </p>
              <p className={s.newsletterCardDescription}>
                Du erhälst die wichtigsten Infos über die Expedition.
              </p>
              <p className={cN(gS.alignRight, gS.noMargin)}>
                {mainNewsletterConsent && mainNewsletterConsent.value ? (
                  <span
                    aria-hidden="true"
                    className={gS.linkLikeFormated}
                    onClick={revokeMainNewsletterConsent}
                    onKeyDown={revokeMainNewsletterConsent}
                  >
                    abbestellen
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className={gS.linkLikeFormated}
                    onClick={revokeMainNewsletterConsent}
                    onKeyDown={revokeMainNewsletterConsent}
                  >
                    Newsletter erhalten
                  </span>
                )}
              </p>
            </div>
            {/* Conditionally render individual Cards */}
            <div>{activeNewsletterCards}</div>
          </section>
        ) : null}
        <p className={gS.linkLikeFormated}>Alle abbestellen</p>

        <h4 className={gS.optionSectionHeading}>Newsletter hinzufügen</h4>
        <SearchPlaces
          showButton={municipality !== undefined}
          onPlaceSelect={handlePlaceSelect}
          buttonLabel={`${municipality ? municipality.name : ''} hinzufügen`}
          handleButtonClick={() => addNewsletter(newNewsletter)}
        />

        <p
          onClick={() => addNewsletter(newNewsletter)}
          className={gS.linkLikeFormated}
        >
          Test: Newsletter hinzufügen!
        </p>

        <h4 className={gS.optionSectionHeading}>Kontakt per Telefon</h4>
        <p className={s.newsletterCardDescription}>
          Hier kannst du angeben, ob wir dich auch telefonisch erreichen können.
          Eine Telefonnummer erleichtert es uns, dich für die Koordination von
          Veranstaltungen zu erreichen.
          <br />
          <br />
          Mit dem Eintragen stimmst du zu, dass wir dich kontaktieren dürfen.
        </p>
        <div className={s.optionRow}>
          <p className={cN(gS.noMargin, gS.inputDescription)}>Telefonnummer:</p>
          <TextInput placeholder="Telefonnummer" />
          <Button className={s.savePhoneNumberBtn}>Eintragen</Button>
        </div>

        <h4 className={gS.optionSectionHeading}>Kontakt per Messenger</h4>
        <p className={s.newsletterCardDescription}>
          Wenn du möchtest, kannst du auch per Messenger mit uns Kontakt
          aufnehmen:
        </p>
        <MessengerButtonRow iconSize="XL" />
      </section>
    </section>
  );
};
