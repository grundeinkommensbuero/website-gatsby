import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './style.module.less';
import cN from 'classnames';

import { useUploadImage } from '../../../hooks/images';
import AvatarImage from '../../AvatarImage';
import { CTAButton } from '../../Layout/CTAButton';

export default ({ userData, userId, onUploadDone, showLabel }) => {
  const [uploadImageState, uploadImage] = useUploadImage();

  useEffect(() => {
    if (uploadImageState === 'success') {
      onUploadDone();
    }
  }, [uploadImageState, onUploadDone]);

  return (
    <Form
      onSubmit={({ image }) => {
        if (image && image.files && image.files[0]) {
          uploadImage(userId, image.files[0]);
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
              <Field name="image" component={ImageInput} user={userData} showLabel={showLabel} />
            )}
          <CTAButton
            type="submit"
            className={cN(s.submitButton, {
              [s.submitButtonDirty]: dirtyFields.image,
            })}
          >
            Hochladen
          </CTAButton>
        </form>
      )}
    />
  );
};

export const ImageInput = ({ input: { value, onChange, ...input }, user, showLabel }) => {
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
  /* conditionally show 'upload picture label', defaults to true */
  let showUploadLabel = true;
  if (showLabel) {
    showUploadLabel = showLabel;
  }

  return (
    <label className={s.avatarImageContainer} aria-label="Lade ein Bild hoch">
      <AvatarImage
        srcOverwrite={avatarImage}
        className={s.avatarImage}
        user={user}
        sizes="80px"
      />
      {showUploadLabel ? (<div className={s.avatarImageLabel}>Lad’ ein Bild hoch!</div>) : null}
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
