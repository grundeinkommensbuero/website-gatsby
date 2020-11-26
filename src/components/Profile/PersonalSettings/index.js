import React from 'react';
import AvatarImage from '../../AvatarImage';
import { TextInput } from '../../Forms/TextInput';
import { formatDate } from '../../utils';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Button } from '../../Forms/Button';
import { MessengerButtonRow } from '../MessengerButtonRow.js';
import ImageUpload from '../../Forms/ImageUpload'

export default ({ userData, userId }) => {
  return (
    <section className={gS.profilePageGrid}>
      <section className={cN(gS.editPageSection, gS.editSettings)}>
        <div className={gS.backToProfile}>
          {/* add a cancel method */}
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>

        <section className={gS.userInfo}>
          <AvatarImage user={userData} className={gS.avatar} />
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
            <p className={s.optionHeading}><b>Email-Adresse</b></p>
            <p className={s.optionDescription}>Die Email-Adresse, die du verwendest um dich einzuloggen und Neuigkeiten von uns zu erhalten.</p>

            <div className={s.editableRow}>
              <span>{userData.email}</span>
              <Button className={s.saveChangesBtnSmall}>Ändern</Button>
            </div>

            <p className={s.optionHeading}><b>Telefonnummer</b></p>
            <p className={s.optionDescription}>Eine Telefonnummer erleichtert es uns, die für die Koordination von Veranstaltungen zu erreichen.</p>

            {userData.phone ?
              <div className={s.editableRow}>
                <span>{userData.phone}</span>
                <Button className={s.saveChangesBtnSmall}>Ändern</Button>
              </div> :
              <div className={s.editableRow}>
                <span>Noch keine Telefonnummer angegeben</span>
                <Button className={s.saveChangesBtnSmall}>Eintragen</Button>
              </div>
            }

            <p className={s.optionHeading}><b>Messenger</b></p>
            <p className={s.optionDescription}>Wir sind auf mehreren Messenger-Diensten unterwegs. Du findest uns hier:</p>

            <MessengerButtonRow iconSize="L" />

            <h4 className={gS.optionSectionHeading}>Deine Stammdaten</h4>

            <p className={s.optionSectionDescription}>Name oder Adresse ändern:</p>

            <p className={s.optionHeading}>Name</p>
            <div className={s.editTextInput}>
              <TextInput placeholder="Name" />
            </div>

            <p className={s.optionHeading}>Postleitzahl</p>
            <div className={s.editTextInput}>
              <TextInput placeholder="Postleitzahl" />
            </div>

            <p className={s.optionHeading}>Ort</p>
            <div className={s.editTextInput}>
              <TextInput placeholder="Ort" />
            </div>

            <Button className={s.saveChangesBtn}>Ändern</Button>

            <h4 className={gS.optionSectionHeading}>Dein Profilbild</h4>

            <ImageUpload userData={userData} userId={userId} showLabel={false} onUploadDone={() => { }} />

            <Link to={`/mensch/${userId}/`} className={gS.bottomRightLink}>Profil löschen</Link>
          </div>
        </section>
      </section>
    </section >
  )
};
