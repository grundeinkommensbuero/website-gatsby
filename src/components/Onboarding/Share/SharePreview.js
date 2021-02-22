import React, { useEffect, useState } from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import AvatarImage from '../../AvatarImage';
import ImageUpload from '../../Forms/ImageUpload';
import ShareButtons from './ShareButtons.json';

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

export const SharePreview = ({ shareChannel, userData, userId, municipality }) => {
  const [showProfileImageUpload, setShowProfileImageUpload] = useState(false);
  const [useProfilePicture, setUseProfilePicture] = useState(userData?.profilePictures?.original);

  const InstagramHowTo = () => {
    return (
      <>
        <h3 className={gS.moduleTitle}>So teilst du über Instagram:</h3>
        <p>Füge folgenden Link ein: {constructShareURL()}</p>
      </>
    )
  }

  const Components = {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    InstagramHowTo
  };



  const constructShareURL = () => {
    const addProfileImage = () => useProfilePicture ? '&addProfilePicture=true' : '';
    return `https://expedition-grundeinkommen.de/gemeinde-teilen/${userId}?ags=${municipality.ags}&version=1${addProfileImage()}`;
  };

  const ShareButton = () => {
    let CaseButton = Components[ShareButtons.find(el => el.channelIdentifier === shareChannel?.channelIdentifier)?.name];
    const title = `Bring das Grundeinkommen nach ${municipality.name}`;
    const hashtags = ["Grundeinkommen", "ExpeditionGrundeinkommen"];
    const subject = `Gemeinsam bringen wir das Grundeinkommen nach ${municipality.name}`;
    const body = `Hey! \t\n Lass uns in ${municipality.name} das Grundeinkommen an den Start bringen! Alle Infos unter diesem Link: \t\n \t\n`
    const quote = `Gemeinsam bringen wir das Grundeinkommen nach ${municipality.name}`;
    return (
      <>
        {CaseButton ?
          <CaseButton
            title={title}
            hashtags={hashtags}
            subject={subject}
            body={body}
            quote={quote}
            url={constructShareURL()}
            className={gS.buttonRowSingle}
          >
            <div
              aria-hidden="true"
              className={gS.selectableOption}>
              Über {shareChannel?.label.replace(/\\/g, "")} teilen
        </div>
          </CaseButton> : null}
      </>
    )
  }

  useEffect(() => {
    setUseProfilePicture(userData?.profilePictures?.original);
  }, [userData]);

  return (
    <>
      <h3 className={gS.moduleTitle}>Über {shareChannel?.label.replace(/\\/g, "")} teilen</h3>
      <div className={s.sharePreviewContainer}>
        {useProfilePicture ?
          <>
            <img
              src={'https://images.ctfassets.net/af08tobnb0cl/4LVqlgSyy9xfpnZvsABNlF/65e368bfbe1d3f7c650bf640927cb59d/Teilen-Leer.png?h=500'}
              alt={'sharing background'}
              className={s.sharePreview} />
            <AvatarImage user={userData} className={s.avatarImage} />
          </> :
          <img
            src={'https://images.ctfassets.net/af08tobnb0cl/2JpoX7gHOGy49opxwetJXG/f5fa878ae57259ee0dcfbe7af45ddaf8/Teilen-Fallback-Leer.png?h=500'}
            alt={'sharing background'}
            className={s.sharePreview} />
        }
        <h3 className={s.mainCaption}>{userData.username} bringt das #Grundeinkommen nach {municipality.name}</h3>
        <h4 className={s.subCaption}>Hol es auch in deinen Ort!</h4>
      </div>

      <ShareButton />

      <div className={gS.optionSelectionContainer}>
        {useProfilePicture ?
          <span
            aria-hidden="true"
            onClick={() => setUseProfilePicture(!useProfilePicture)}
            className={gS.linkLikeFormatted}>
            Lieber kein Profilbild nutzen
        </span> :
          <>
            {userData?.profilePictures?.original ?
              <span
                aria-hidden="true"
                onClick={() => setUseProfilePicture(!useProfilePicture)}
                className={gS.linkLikeFormatted}>
                Lieber mit Profilbild teilen
            </span> :
              <span
                aria-hidden="true"
                onClick={() => setShowProfileImageUpload(true)}
                className={gS.linkLikeFormatted}>
                Profilbild hochladen
            </span>
            }
          </>
        }
      </div>

      {showProfileImageUpload &&
        <div className={s.imageUploadContainer}>
          <ImageUpload
            userData={userData}
            userId={userId}
            showUploadLabel={false}
            showEditLabel={true}
            size={'large'}
            onUploadDone={() => { }}
          />
        </div>
      }
    </>
  )
}