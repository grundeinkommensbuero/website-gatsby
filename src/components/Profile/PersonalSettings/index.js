import React, { useState, useEffect } from 'react';
import { TextInput } from '../../Forms/TextInput';
import { formatDate } from '../../utils';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Button } from '../../Forms/Button';
// import { MessengerButtonRow } from '../MessengerButtonRow.js';
import ImageUpload from '../../Forms/ImageUpload';

import { useUpdateUser } from '../../../hooks/Api/Users/Update';

export const PersonalSettings = ({ userData, userId, updateCustomUserData }) => {
  const [updateUserState, updateUser] = useUpdateUser();
  const [waitingForApi, setWaitingForApi] = useState(false);
  const [editMailAddress, setEditMailAddress] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const [tempMail, setTempMail] = useState();
  const [tempPhone, setTempPhone] = useState();
  const [tempName, setTempName] = useState();
  const [tempZIP, setTempZIP] = useState();
  const [tempCity, setTempCity] = useState();

  // until phonenumber is included in userData
  const fakePhone = '';

  useEffect(() => {
    if (updateUserState === 'loading') {
      setWaitingForApi(true);
    }
    if (updateUserState === 'updated') {
      setTimeout(() => {
        setWaitingForApi(false);
        updateCustomUserData();
      }, 750);
    }
    if (updateUserState === 'error') {
      setWaitingForApi(false);
    }
  }, [updateUserState]);

  useEffect(() => {
    if (userData && tempName === undefined) {
      setTempName(userData.username);
      setTempZIP(userData.zipCode);
      setTempCity(userData.city);
      setTempMail(userData.email);
      setTempPhone('');
    }
  });

  const saveUserDataChanges = () => {
    if (tempName !== userData.username) {
      updateUser({ userId: userId, username: tempName });
    }
    if (tempZIP !== userData.zipCode) {
      updateUser({ userId: userId, zipCode: tempZIP });
    }
    if (tempCity !== userData.city) {
      updateUser({ userId: userId, city: tempCity });
    }
  };

  return (
    <section className={gS.profilePageGrid}>
      <section className={cN(gS.editPageSection, gS.editSettings)}>
        <div className={gS.backToProfile}>
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>

        <section className={gS.userInfo}>
          <ImageUpload
            className={gS.avatar}
            userData={userData}
            userId={userId}
            showUploadLabel={false}
            showEditLabel={true}
            size={'large'}
            onUploadDone={() => { }}
          />
          <div>
            <h1
              className={cN({
                [gS.username]: userData.username,
                [s.email]: !userData.username,
              })}
            >
              {userData.username || userData.email}
            </h1>
            <div className={gS.placeInfo}>{userData.city}</div>
            {/* Show profile edit button if own page */}
            <div className={s.details}>
              Dabei seit dem{' '}
              {userData.createdAt && formatDate(new Date(userData.createdAt))}
            </div>
          </div>
        </section>

        <section className={s.dataEditWrapper}>
          <div className={s.dataEditSection}>
            <h4 className={gS.optionSectionHeading}>Deine Kontaktdaten</h4>
            <p className={s.optionHeading}>
              <b>Email-Adresse</b>
            </p>
            <p className={s.optionDescription}>
              Die Email-Adresse, die du verwendest um dich einzuloggen und
              Neuigkeiten von uns zu erhalten.
            </p>

            {!editMailAddress ? (
              <div className={s.editableRow}>
                <span>{userData.email}</span>
                <Button
                  size="SMALL"
                  onClick={() => setEditMailAddress(true)}
                >
                  Ändern
                </Button>
              </div>
            ) : (
                <div className={s.editableRow}>
                  <TextInput
                    onChange={evt => setTempMail(evt.target.value)}
                    placeholder="E-Mail"
                    value={tempMail || ''}
                    size="small"
                    className={cN(
                      tempMail !== userData.email ? s.inputHighlighted : null
                    )}
                  />
                  {tempMail !== userData.email ? (
                    <Button size="SMALL">Ändern</Button>
                  ) : (
                      <Button
                        size="SMALL"
                        onClick={() => setEditMailAddress(false)}
                      >
                        abbrechen
                      </Button>
                    )}
                </div>
              )}

            <p className={s.optionHeading}>
              <b>Telefonnummer</b>
            </p>
            <p className={s.optionDescription}>
              Eine Telefonnummer erleichtert es uns, die für die Koordination
              von Veranstaltungen zu erreichen.
            </p>

            {!editPhoneNumber ? (
              <div className={s.editableRow}>
                {fakePhone ? (
                  <span>{fakePhone}</span>
                ) : (
                    <span>Noch keine Telefonnummer angegeben</span>
                  )}
                <Button
                  size="SMALL"
                  onClick={() => setEditPhoneNumber(true)}
                >
                  {fakePhone ? (
                    <span>Ändern</span>
                  ) : (
                      <span>Eintragen</span>
                    )}
                </Button>
              </div>
            ) : (
                <div className={s.editableRow}>
                  <TextInput
                    onChange={evt => setTempPhone(evt.target.value)}
                    placeholder="Telefonnummer"
                    value={tempPhone || ''}
                    size="small"
                    className={cN(
                      tempPhone !== fakePhone ? s.inputHighlighted : null
                    )}
                  />
                  {tempPhone !== fakePhone ? (
                    <Button size="SMALL">Ändern</Button>
                  ) : (
                      <Button
                        size="SMALL"
                        onClick={() => setEditPhoneNumber(false)}
                      >
                        abbrechen
                      </Button>
                    )}
                </div>
              )}

            {/* <p className={s.optionHeading}>
              <b>Messenger</b>
            </p>
            <p className={s.optionDescription}>
              Wir sind auf mehreren Messenger-Diensten unterwegs. Du findest uns
              hier:
            </p>

            <MessengerButtonRow iconSize="L" /> */}

            <h4 className={gS.optionSectionHeading}>Deine Stammdaten</h4>

            <p className={s.optionSectionDescription}>
              Name oder Adresse ändern:
            </p>

            <p className={s.optionHeading}>Name</p>
            <div className={s.editTextInput}>
              <TextInput
                onChange={evt => setTempName(evt.target.value)}
                placeholder="Name"
                value={tempName || ''}
                className={
                  tempName !== userData.username ? s.inputHighlighted : null
                }
              />
            </div>

            <p className={s.optionHeading}>Postleitzahl</p>
            <div className={s.editTextInput}>
              <TextInput
                onChange={evt => setTempZIP(evt.target.value)}
                placeholder="Postleitzahl"
                value={tempZIP || ''}
                className={
                  tempZIP !== userData.zipCode ? s.inputHighlighted : null
                }
              />
            </div>

            <p className={s.optionHeading}>Ort</p>
            <div className={s.editTextInput}>
              <TextInput
                onChange={evt => setTempCity(evt.target.value)}
                placeholder="Ort"
                value={tempCity || ''}
                className={
                  tempCity !== userData.city ? s.inputHighlighted : null
                }
              />
            </div>

            {!waitingForApi &&
              (tempName !== userData.username ||
                tempZIP !== userData.zipCode ||
                tempCity !== userData.city) ? (
                <Button
                  className={s.saveChangesBtn}
                  onClick={saveUserDataChanges}
                >
                  Änderungen speichern
                </Button>
              ) : (
                <section>
                  {waitingForApi ? (
                    <span>
                      <span className={gS.loading}></span>
                      <b className={gS.loadingMsg}>Speichern</b>
                    </span>
                  ) : null}
                </section>
              )}

            <Link to={`/mensch/${userId}/`} className={gS.bottomRightLink}>
              Profil löschen
            </Link>
          </div>
        </section>
      </section>
    </section>
  );
};
