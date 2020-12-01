import React, { useState, useEffect } from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import NewsletterCard from './NewsletterCard';
import { SearchPlaces } from '../../Forms/SearchPlaces';
import { TextInput } from '../../Forms/TextInput';
import { Button } from '../../Forms/Button';
import { MessengerButtonRow } from '../MessengerButtonRow.js';

import { useUpdateUser } from '../../../hooks/Api/Users/Update';

export default ({ userData, userId }) => {
  const [waitingForApi, setWaitingForApi] = useState(false);
  const [updateUserState, updateUser] = useUpdateUser();
  const [mainNewsletterConsent, updateMainNewsletterConsent] = useState();
  const [customNewsletterSettings, updateCustomNewsletterSettings] = useState([]);
  const [municipality, setMunicipality] = useState();

  useEffect(() => {
    if (updateUserState === 'loading') {
      setWaitingForApi(true);
    }
    if (updateUserState === 'updated') {
      setTimeout(() => {
        setWaitingForApi(false);
      }, 750);
    }
    if (updateUserState === 'error') {
      setWaitingForApi(false);
    }
  }, [updateUserState]);

  if (userData &&
    userData.newsletterConsent &&
    mainNewsletterConsent === undefined) {
    updateMainNewsletterConsent(userData.newsletterConsent);
  }

  if (userData &&
    userData.customNewsletters &&
    userData.customNewsletters.length > customNewsletterSettings.length) {
    updateCustomNewsletterSettings(userData.customNewsletters);
  }

  const revokeMainNewsletterConsent = () => {
    let updatedMainNewsletterConsent = {
      ...mainNewsletterConsent,
    };
    updatedMainNewsletterConsent.value = !mainNewsletterConsent.value;
    updateMainNewsletterConsent(updatedMainNewsletterConsent);
  };

  const handlePlaceSelect = municipality => {
    setMunicipality(municipality);
  };

  const handleNewsletterAddRequest = () => {
    const newsletterToAdd = constructNewsletter(municipality);
    let newsletterExists = false;
    for (let i = 0; i < customNewsletterSettings.length; i++) {
      if (customNewsletterSettings[i].ags === newsletterToAdd.ags) {
        newsletterExists = true;
        if (customNewsletterSettings[i].value) {
          /* Notify user, that newsletter already exists? */
        } else {
          reactivateNewsletter(newsletterToAdd);
        }
      }
    }
    /* If newsletter does not exist, create a new entry */
    if (!newsletterExists) {
      addNewsletter(newsletterToAdd);
    }
  }

  const constructNewsletter = (municipality) => {
    const newNewsletter = {
      name: municipality.name,
      value: true,
      extraInfo: false,
      timestamp: new Date().toISOString(),
      ags: municipality.ags
    }
    return newNewsletter;
  };

  const reactivateNewsletter = (newsletter) => {
    try {
      const updatedNewsletters = [...customNewsletterSettings];
      for (let i = 0; i < updatedNewsletters.length; i++) {
        if (updatedNewsletters[i].ags === newsletter.ags) {
          newsletter.value = true;
          updatedNewsletters[i] = newsletter;
        }
      }
      updateUser({ userId: userId, customNewsletters: updatedNewsletters });
      updateCustomNewsletterSettings(updatedNewsletters);
    } catch (e) {
      console.log(e);
    }
  };

  const addNewsletter = async (newsletter) => {
    try {
      const updatedNewsletters = [...customNewsletterSettings];
      updatedNewsletters.push(newsletter);
      updateUser({ userId: userId, customNewsletters: updatedNewsletters });
      updateCustomNewsletterSettings(updatedNewsletters);
    } catch (e) {
      console.log(e);
    }
  };

  const updateSingleNewsletter = async (newsletter) => {
    try {
      const updatedNewsletters = [...customNewsletterSettings];
      for (let i = 0; i < updatedNewsletters.length; i++) {
        if (updatedNewsletters[i].ags === newsletter.ags) {
          updatedNewsletters[i] = newsletter;
        }
      }
      updateUser({ userId: userId, customNewsletters: updatedNewsletters });
      updateCustomNewsletterSettings(updatedNewsletters);
    } catch (e) {
      console.log(e);
    }
  }

  // const updateUserPhone = () => {
  //   try {
  //     updateUser({ userId: userId, phone: userPhone })
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const activeNewsletterCards = customNewsletterSettings.map(newsletter => {
    if (newsletter.value) {
      return <NewsletterCard
        newsletter={newsletter}
        key={`${newsletter.name}${newsletter.ags}`}
        updateSingleNewsletter={updateSingleNewsletter}
        waitingForApi={waitingForApi} />;
    } else {
      return null;
    }
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
          showButton={municipality !== undefined && !waitingForApi}
          onPlaceSelect={handlePlaceSelect}
          buttonLabel={`${municipality ? municipality.name : ''} hinzufügen`}
          handleButtonClick={() => handleNewsletterAddRequest()}
        />

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
