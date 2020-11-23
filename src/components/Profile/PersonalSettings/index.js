import React from 'react';
import AvatarImage from '../../AvatarImage';
import { TextInput } from '../../Forms/TextInput';
import { formatDate } from '../../utils';
import s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Button } from '../../Forms/Button';
import SocialMediaButton from '../../SocialMedia/Button';

export default ({ userData, userId }) => {
  return (
    <section className={s.profilePageGrid}>
      <section className={cN(s.profilePageSection, s.editSettings)}>
        <div className={s.backToProfile}>
          {/* add a cancel method */}
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>

        <section className={cN(s.profilePageSection, s.userInfo)}>
          <AvatarImage user={userData} className={s.avatar} />
          <div>
            <h1
              className={cN({
                [s.username]: userData.username,
                [s.email]: !userData.username,
              })}
            >
              {userData.username || userData.email}
            </h1>
            <div className={s.details}>
              Dabei seit dem{' '}
              {userData.createdAt && formatDate(new Date(userData.createdAt))}
            </div>
          </div>
        </section>

        <section className={s.dataEditWrapper}>
          <div className={s.dataEditSection}>
            <h4 className={s.optionSectionHeading}>Deine Kontaktdaten</h4>
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

            <div className={s.socialButtonRow}>
              <SocialMediaButton
                icon="Facebook"
                link=""
                iconSize="S"
                label="Teile auf Facebook"
                className={s.shareButton}
              />
            </div>

            <h4 className={s.optionSectionHeading}>Deine Stammdaten</h4>

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

            <h4 className={s.optionSectionHeading}>Deine Profilbild</h4>

            <a href="" className={s.bottomRightLink}>Profil löschen</a>
          </div>
        </section>
      </section>
    </section >
  )
};
