import React, { useCallback, useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './style.module.less';
import cN from 'classnames';

import { useUploadImage } from '../../../hooks/images';
import AvatarImage from '../../AvatarImage';
import { CTAButton } from '../../Layout/CTAButton';
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage';
import { SectionInner } from '../../Layout/Sections';
import { FinallyMessage } from '../FinallyMessage';

export default ({ userData, userId, onUploadDone, pickFromFacebook }) => {
  const [uploadImageState, uploadImage] = useUploadImage();
  const [photos, setPhotos] = useState([]);
  const [facebookPhoto, setFacebookPhoto] = useState();

  useEffect(() => {
    if (uploadImageState === 'success') {
      onUploadDone();
    }
  }, [uploadImageState, onUploadDone]);

  useEffect(() => {
    if (pickFromFacebook) {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: '2694140437502374',
          xfbml: true,
          // status: true,
          version: 'v8.0',
        });

        window.FB.login(
          function(response) {
            console.log(response);

            window.FB.api(
              '/me/photos?type=uploaded',
              'GET',
              { fields: 'images' },
              function(response) {
                console.log(response);
                setPhotos(
                  response.data.map(({ images, id }) => {
                    return {
                      src: images[0].source,
                      id,
                      width: images[0].width,
                      height: images[0].height,
                      srcSet: images
                        .map(({ source, width }) => `${source} ${width}w`)
                        .join(', '),
                    };
                  })
                );
                // Insert your code here
              }
            );
          },
          { scope: 'user_photos' }
        );
      };
    }
  }, []);

  const imageRenderer = useCallback(({ index, left, top, key, photo }) => (
    <SelectedImage
      key={key}
      margin={'2px'}
      index={index}
      photo={photo}
      left={left}
      top={top}
      setSelectedPhoto={setFacebookPhoto}
      selectedPhoto={facebookPhoto}
    />
  ));

  const handleFileInputChange = () => {
    setFacebookPhoto(undefined);
  };

  if (uploadImageState === 'error') {
    return (
      <SectionInner>
        <FinallyMessage>
          <>Das Hochladen des Bildes hat nicht geklappt. </>
          <br />
          <br />
          Probiere es bitte ein weiteres Mal oder melde dich bei uns mit dem
          Hinweis zu der genauen Fehlermeldung. Nenne uns bitte außerdem falls
          möglich deinen Browser und die Version:
          <br />
          <br />
          <a href="mailto:support@expedition-grundeinkommen.de">
            support@expedition-grundeinkommen.de
          </a>
        </FinallyMessage>
      </SectionInner>
    );
  }

  if (uploadImageState === 'saving') {
    return (
      <SectionInner>
        <FinallyMessage state="progress">Speichere...</FinallyMessage>
      </SectionInner>
    );
  }

  return (
    <Form
      onSubmit={({ image }) => {
        if (facebookPhoto) {
          uploadImage({ userId, imageUrl: facebookPhoto.src });
        } else if (image && image.files && image.files[0]) {
          uploadImage({ userId, imageFile: image.files[0] });
        }
      }}
      render={({ handleSubmit, dirtyFields }) => (
        <form onSubmit={handleSubmit}>
          {userData.user && userData.user.profilePictures ? (
            <AvatarImage
              user={userData.user}
              className={s.avatarImage}
              sizes="80px"
            />
          ) : (
            <>
              <Field
                name="image"
                component={ImageInput}
                user={userData.user}
                avatarSrcOverwrite={facebookPhoto?.src}
                customOnChange={handleFileInputChange}
              />
              {pickFromFacebook && (
                <div className={s.gallery}>
                  <Gallery photos={photos} renderImage={imageRenderer} />
                </div>
              )}
            </>
          )}
          <CTAButton
            type="submit"
            className={cN(s.submitButton, {
              [s.submitButtonDirty]: dirtyFields.image || facebookPhoto,
            })}
          >
            Hochladen
          </CTAButton>
        </form>
      )}
    />
  );
};

export const ImageInput = ({
  input: { value, onChange, ...input },
  user,
  avatarSrcOverwrite,
  customOnChange,
}) => {
  const [avatarImage, setAvatarImage] = useState(null);
  const handleChange = ({ target }) => {
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = e => {
        setAvatarImage(e.target.result);
        onChange({ files: target.files, srcOverwrite: e.target.result });
      };
    } else {
      onChange({ files: target.files });
    }

    customOnChange();
  };

  return (
    <label className={s.avatarImageContainer} aria-label="Lade ein Bild hoch">
      <AvatarImage
        srcOverwrite={avatarSrcOverwrite || avatarImage}
        className={s.avatarImage}
        user={user}
        sizes="80px"
      />
      <div className={s.avatarImageLabel}>Lad’ ein Bild hoch!</div>
      <input
        type="file"
        onChange={handleChange}
        className={s.avatarUploadButton}
        accept="image/png, image/jpeg"
        {...input}
      />
    </label>
  );
};
