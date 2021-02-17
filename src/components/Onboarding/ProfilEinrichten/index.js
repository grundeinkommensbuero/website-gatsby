import React from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import ImageUpload from '../../Forms/ImageUpload';
import { Button } from '../../Forms/Button';

export const ProfilEinrichten = ({ userData, userId, compIndex, setCurrentElementByIndex }) => {
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
            onUploadDone={() => { }}
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
            onClick={() => setCurrentElementByIndex(compIndex + 1)}>
            Jetzt nicht
        </span>
        </div>
      </section>
    </>
  );
};