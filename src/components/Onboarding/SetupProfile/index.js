import React, { useEffect, useRef } from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import ImageUpload from '../../Forms/ImageUpload';
import { Button } from '../../Forms/Button';

export const SetupProfile = ({
  userData,
  userId,
  compIndex,
  setCurrentElementByIndex,
}) => {
  const uploadRef = useRef(null);

  // On mount focus the upload image cta
  useEffect(() => {
    if (uploadRef.current) {
      console.log('focus ref', uploadRef);
      uploadRef.current.focus();
    }
  }, []);

  return (
    <>
      <section className={gS.pageContainer}>
        <h3 className={gS.moduleTitle}>Zeig Gesicht fürs Grundeinkommen</h3>
        <p className={gS.descriptionTextLarge}>
          Lade dein Profilfoto hoch, und zeige der Welt, dass du Grundeinkommen{' '}
          ausprobieren willst.
        </p>

        <div className={s.imageUploadContainer}>
          <ImageUpload
            userData={userData}
            userId={userId}
            showUploadLabel={false}
            showEditLabel={true}
            size={'large'}
            onUploadDone={() => {}}
            customRef={uploadRef}
          />
        </div>

        <div className={gS.fullWidthFlex}>
          <Button
            className={gS.nextButton}
            onClick={() => setCurrentElementByIndex(compIndex + 1)}
          >
            Weiter
          </Button>
        </div>
        <div className={gS.fullWidthFlex}>
          <span
            aria-hidden="true"
            className={gS.linkLikeFormatted}
            onClick={() => setCurrentElementByIndex(compIndex + 1)}
          >
            Jetzt nicht
          </span>
        </div>
      </section>
    </>
  );
};
