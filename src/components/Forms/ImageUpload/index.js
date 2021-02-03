import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import s from './style.module.less';
import cN from 'classnames';

import { useUploadImage } from '../../../hooks/images';
import AvatarImage from '../../AvatarImage';
import { CTAButton } from '../../Layout/CTAButton';
import { Spinner } from '../../Spinner';

export default ({ userData, userId, onUploadDone, showUploadLabel, showEditLabel, size = 'default', buttonOnRedBackground = false }) => {
  const [uploadImageState, uploadImage] = useUploadImage();

  const [showUploadButton, setShowUploadButton] = useState(false);
  const [imageUploadIsProcessing, setImageUploadIsProcessing] = useState(false);
  const [showUploadSuccessMessage, setShowUploadSuccessMessage] = useState(false);

  useEffect(() => {
    if (uploadImageState === 'success') {
      onUploadDone();
      setImageUploadIsProcessing(false);
      setShowUploadSuccessMessage(true);
      setTimeout(() => {
        setShowUploadSuccessMessage(false);
      }, 1500);
    }
  }, [uploadImageState]);

  return (
    <Form
      onSubmit={({ image }) => {
        if (image && image.files && image.files[0]) {
          uploadImage(userId, image.files[0]);
          setShowUploadButton(false);
          setImageUploadIsProcessing(true);
        }
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {userData.user && userData.user.profilePictures ? (
            <AvatarImage
              user={userData.user}
              className={cN(s.avatarImage,
                { [s.default]: size === 'default' },
                { [s.large]: size === 'large' }
              )}
              sizes="80px"
            />
          ) : (
              <>
                <Field
                  name="image"
                  component={ImageInput}
                  user={userData}
                  showUploadLabel={showUploadLabel}
                  showEditLabel={showEditLabel}
                  size={size}
                  onChange={(val, prevVal) => console.log(val, prevVal)}
                />
                <OnChange name="image">
                  {() => setShowUploadButton(true)}
                </OnChange>

                <CTAButton
                  type="submit"
                  className={cN(
                    { [s.submitButton]: !showEditLabel },
                    { [s.submitButtonEditing]: showEditLabel },
                    { [s.submitButtonDirty]: showUploadButton },
                    { [s.buttonOnRedBackground]: buttonOnRedBackground }
                  )}
                >
                  Hochladen
                </CTAButton>

                <div className={s.uploadMessageContainer}>
                  {imageUploadIsProcessing ?
                    <span className={s.uploadStateMessage}>
                      <Spinner />
                      <b className={s.loadingMsg}>Bild hochladen...</b>
                    </span>
                    : <>
                      {showUploadSuccessMessage ?
                        <span className={s.uploadStateMessage}>
                          Upload erfolgreich!
                      </span> : null
                      }
                    </>
                  }
                </div>
              </>
            )}


        </form>
      )}
    />
  );
};

export const ImageInput = ({ input: { value, onChange, ...input }, user, showUploadLabel = true, showEditLabel = false, size }) => {
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
  };

  return (
    <label className={s.avatarImageContainer} aria-label="Lade ein Bild hoch">
      <AvatarImage
        srcOverwrite={avatarImage}
        className={cN(s.avatarImage,
          { [s.default]: size === 'default' },
          { [s.large]: size === 'large' }
        )}
        user={user}
        sizes="80px"
      />
      {showUploadLabel ? (<div className={cN(s.avatarImageLabel, { [s.default]: !showEditLabel })}>Lad’ ein Bild hoch!</div>) : null}
      {showEditLabel ? (<div className={cN(s.avatarImageLabel, { [s.editing]: showEditLabel })}>Bild ändern</div>) : null}
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
