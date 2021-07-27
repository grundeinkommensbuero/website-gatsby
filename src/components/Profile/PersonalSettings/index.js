import React, { useState, useEffect } from 'react';
import { TextInput } from '../../Forms/TextInput';
import { formatDate } from '../../utils';
import * as s from './style.module.less';
import * as gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Button } from '../../Forms/Button';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import ImageUpload from '../../Forms/ImageUpload';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';
import { ChangeEmail } from './ChangeEmail';

export const PersonalSettings = ({
  userData,
  userId,
  updateCustomUserData,
}) => {
  const [updateUserState, updateUser] = useUpdateUser();

  const [waitingForApi, setWaitingForApi] = useState(false);
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [tempName, setTempName] = useState();
  const [tempZIP, setTempZIP] = useState();
  const [tempCity, setTempCity] = useState();

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
    if (userData) {
      if (tempName === undefined) {
        setTempName(userData.username);
      }

      if (tempZIP === undefined) {
        setTempZIP(userData.zipCode);
      }

      if (tempCity === undefined) {
        setTempCity(userData.city);
      }
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

        <section className={s.userInfo}>
          <div className={gS.avatarContainer}>
            <ImageUpload
              className={gS.avatar}
              userData={userData}
              userId={userId}
              buttonOnAquaBackground={true}
              size={'large'}
              onUploadDone={() => {}}
            />
          </div>
          <div className={s.marginBottomOnMobile}>
            <h2
              className={cN({
                [gS.username]: userData.username,
              })}
            >
              {userData.username || userData.email}
            </h2>
            <div className={gS.placeInfo}>{userData.city}</div>
            <div>
              Dabei seit dem{' '}
              {userData.createdAt && formatDate(new Date(userData.createdAt))}
            </div>
          </div>
        </section>

        <section className={s.dataEditWrapper}>
          <div className={s.dataEditSection}>
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
                className={cN({
                  [s.inputHighlighted]: tempName !== userData.username,
                })}
              />
            </div>
            <p className={s.optionHeading}>Postleitzahl</p>
            <div className={s.editTextInput}>
              <TextInput
                onChange={evt => setTempZIP(evt.target.value)}
                placeholder="Postleitzahl"
                value={tempZIP || ''}
                className={cN({
                  [s.inputHighlighted]: tempZIP !== userData.zipCode,
                })}
              />
            </div>
            <p className={s.optionHeading}>Ort</p>
            <div className={s.editTextInput}>
              <TextInput
                onChange={evt => setTempCity(evt.target.value)}
                placeholder="Ort"
                value={tempCity || ''}
                className={cN({
                  [s.inputHighlighted]: tempCity !== userData.city,
                })}
              />
            </div>

            {!waitingForApi &&
            (tempName !== userData.username ||
              tempZIP !== userData.zipCode ||
              tempCity !== userData.city) ? (
              <>
                <Button
                  size="SMALL"
                  className={s.mobileBtn}
                  onClick={() => {
                    setTempName(userData.username);
                    setTempZIP(userData.zipCode);
                    setTempCity(userData.city);
                  }}
                >
                  abbrechen
                </Button>
                <Button
                  size="SMALL"
                  className={s.mobileBtn}
                  onClick={saveUserDataChanges}
                >
                  speichern
                </Button>
              </>
            ) : (
              <section>
                {waitingForApi && (
                  <span>
                    <span className={gS.loading}></span>
                    <b className={gS.loadingMsg}>Speichern</b>
                  </span>
                )}
              </section>
            )}

            <ChangeEmail
              updateCustomUserData={updateCustomUserData}
              userData={userData}
            />

            {!showDeleteAccountDialog ? (
              <button
                className={cN(gS.linkLikeFormattedButton, gS.bottomRightLink)}
                onClick={() => setShowDeleteAccountDialog(true)}
              >
                Profil löschen
              </button>
            ) : (
              <div>
                <br></br>
                <DeleteAccountDialog
                  userId={userId}
                  setShowDeleteAccountDialog={setShowDeleteAccountDialog}
                />
              </div>
            )}
          </div>
        </section>
      </section>
    </section>
  );
};
