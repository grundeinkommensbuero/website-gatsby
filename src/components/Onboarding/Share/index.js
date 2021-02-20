import React, { useState } from 'react';
import gS from '../style.module.less';
import { ShareButtonRow } from './ShareButtonRow';
import { SharePreview } from './SharePreview';
import { Button } from '../../Forms/Button';

export const Share = ({ compIndex, setCurrentElementByIndex, municipality, userData, userId, isInOnboarding = true }) => {
  const [sharePreviewActive, setSharePreviewActive] = useState(false);
  const [shareChannel, setShareChannel] = useState();

  return (
    <section className={gS.pageContainer}>
      {!sharePreviewActive ?
        <>
          {isInOnboarding && <>
            <h3 className={gS.moduleTitle}>Hol so viele Menschen dazu, wie du kannst</h3>
            <p className={gS.descriptionTextLarge}>
              Je mehr Menschen du zur Expedition einlädst, desto besser stehen die Chancen, dass{' '}
              {municipality.name} bald Grundeinkommen erforscht. Wir müssen insgesamt {municipality.goal}{' '}
              Menschen werden!
            </p>
          </>}

          <ShareButtonRow
            setShareChannel={setShareChannel}
            setSharePreviewActive={setSharePreviewActive}
            isInOnboarding={isInOnboarding}
          />



          {isInOnboarding &&
            <>
              <p className={gS.descriptionTextLarge}>
                Klicke auf einen der Buttons, um eine Vorschau deiner persönlichen Kachel zum Teilen{' '}
                zu sehen!
              </p>
              <div className={gS.fullWidthFlex}>
                <Button
                  className={gS.nextButton}
                  onClick={() => setCurrentElementByIndex(compIndex + 1)}
                >
                  Weiter
                </Button>
              </div>
            </>}
        </> :
        <>
          <SharePreview
            shareChannel={shareChannel}
            userData={userData}
            userId={userId}
            municipality={municipality}
          />
          <div className={gS.fullWidthFlex}>
            <span
              className={gS.linkLikeFormatted}
              onClick={() => setSharePreviewActive(false)}
              aria-hidden="true">
              {'< Zurück zur Übersicht'}
            </span>
          </div>
        </>}

    </section>
  );
};