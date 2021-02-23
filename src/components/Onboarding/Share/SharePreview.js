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

  const downloadImage = (image) => {
    fetch(image.url, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", image.filename); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const InstagramHowTo = () => {
    return (
      <div>
        <h3 className={gS.moduleTitle}>So teilst du über Instagram:</h3>
        <p>
          Teile die Expedition über deine Insta-Story und zeige all deinen Freundinnen,{' '}
          dass du dabei bist. Einfach Datei runterladen und in deine Insta-Story laden und die{' '}
          @expedition.grundeinkommen verlinken.
        </p>

        <div className={s.instaImageContainer}>
          <div>
            <img
              aria-hidden="true"
              className={s.sharePicInstagram}
              src="https://images.ctfassets.net/af08tobnb0cl/15Vjd0mpP0FpMwmgvP5RHw/1ceaf02a8a52c1bd0d779e9281a552a9/Launch_Story_Ich_bin_dabei.jpg?h=1000"
              onClick={() => downloadImage({
                url: 'https://images.ctfassets.net/af08tobnb0cl/15Vjd0mpP0FpMwmgvP5RHw/1ceaf02a8a52c1bd0d779e9281a552a9/Launch_Story_Ich_bin_dabei.jpg?h=1000',
                filename: 'Launch_Story_Ich_bin_dabei.jpg'
              })}
              alt="sharepic"
            />
          </div>
          <div>
            <img
              aria-hidden="true"
              className={s.sharePicInstagram}
              src="https://images.ctfassets.net/af08tobnb0cl/4f7aQbZP37iUc0H0od4BAQ/c76cc9f24ef9970fffcd552ef6c45c5e/Launch_Story_Ich_bin_dabei_Nominierung.jpg?h=1000"
              onClick={() => downloadImage({
                url: 'https://images.ctfassets.net/af08tobnb0cl/4f7aQbZP37iUc0H0od4BAQ/c76cc9f24ef9970fffcd552ef6c45c5e/Launch_Story_Ich_bin_dabei_Nominierung.jpg?h=1000',
                filename: 'Launch_Story_Ich_bin_dabei_Nominierung.jpg'
              })}
              alt="sharepic"
            />
          </div>
        </div>

        <p>
          Du willst noch mehr? Dann nominiere direkt 3 Freundinnen und fordere Sie zur Teilnahme an{' '}
          unserer Aktion auf. Verlinke dazu die Accountnamen deiner Bekannten und{' '}
          @expedition.grundeinkommen auf der Story Vorlage und veröffentliche diese auf Instagram.
        </p>
      </div>
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
    let baseUrl = 'https://expedition-grundeinkommen.de/';
    if (process.env.NODE_ENV === 'development' || process.env.GATSBY_USE_DEV_BACKEND === 'override') {
      baseUrl = 'https://campaign-launch--expedition-grundeinkommen.netlify.app/';
    };
    return `${baseUrl}gemeinde-teilen/${userId}?ags=${municipality.ags}&version=1${addProfileImage()}`;
  };

  const ShareButton = () => {
    let CaseButton = Components[ShareButtons.find(el => el.channelIdentifier === shareChannel?.channelIdentifier)?.name];
    const title = `Bring das Grundeinkommen mit mir an den Staat! Melde dich dafür bei der Expedition Grundeinkommen an. Ich bin schon in ${municipality.name} dabei :)`;
    const hashtags = ["ModellversuchJetzt", "Grundeinkommen", "ExpeditionGrundeinkommen"];
    const subject = `Gemeinsam bringen wir das Grundeinkommen nach ${municipality.name}`;
    const body = `Hallo,

    stell dir vor, in deinem Wohnort startet in Kürze der erste staatliche Modellversuch zum Bedingungslosen Grundeinkommen. Jeder tausendste Mensch in deinem Wohnort erhält für drei Jahre Grundeinkommen. Wäre das nicht großartig?
    
    Heute hast du die Chance, das möglich zu machen. Ich hab’s schon getan. 
    
    Die Expedition Grundeinkommen startet heute den Qualifizierungsprozess für das Grundeinkommen an deinem Ort. Überall, wo 1% der Bevölkerung sich für den Modellversuch registrieren, startet ein Bürgerbegehren. Mit dem Ziel: Grundeinkommen in ganz Deutschland zu testen.
    
    Bist du dabei?
    
    Dann hole jetzt das Grundeinkommen nach ${municipality.name}:\t\n\t\n`
    const quote = `Bring das Grundeinkommen mit mir an den Staat! Melde dich dafür bei der Expedition Grundeinkommen an. Ich bin schon in ${municipality.name} dabei :)`;
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
      {shareChannel?.channelIdentifier !== 'instagram' ?
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
        </> : <InstagramHowTo />}
    </>
  )
}