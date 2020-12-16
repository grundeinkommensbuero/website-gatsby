import React from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import ImageUpload from '../../Forms/ImageUpload';

export const ProfilEinrichten = ({ userData, userId }) => {
  return (
    <>
      <section className={gS.pageContainer}>
        <h1>Du hast es geschafft!</h1>
        <p className={gS.descriptionTextLarge}>Schön, dass du an Board bist!</p>
        <p className={gS.descriptionTextLarge}>
          Lade jetzt ein Profilbild hoch, um dich mit anderen Expeditionsmitgliedern{' '}
          zu verknüpfen.
        </p>

        <div className={s.imageUploadContainer}>
          <ImageUpload
            className={gS.avatar}
            userData={userData}
            userId={userId}
            showUploadLabel={false}
            showEditLabel={true}
            size={'large'}
            onUploadDone={() => { }}
          />
        </div>
      </section>
    </>
  );
};