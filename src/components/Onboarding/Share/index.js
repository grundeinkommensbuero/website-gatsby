import React, { useState } from 'react';
import cN from 'classnames';
import s from './style.module.less';
import gS from '../style.module.less';
import { ShareButtonRow } from './ShareButtonRow';
import { SharePreview } from './SharePreview';
import { Button } from '../../Forms/Button';

export const SharingFeature = ({
  compIndex,
  setCurrentElementByIndex,
  municipality,
  userData,
  userId,
  isInOnboarding = true,
  introText,
  previewComponent
}) => {
  const [sharePreviewActive, setSharePreviewActive] = useState(false);
  const [shareChannel, setShareChannel] = useState();

  return (
    <section
      className={cN({
        [gS.pageContainer]: isInOnboarding,
      }, {
        [s.municipalityShareContainer]: !isInOnboarding,
      })}
    >
      {!sharePreviewActive ? (
        <>
          {isInOnboarding ? (
            <>
              <h3 className={gS.moduleTitle}>
                Hol so viele Menschen dazu, wie du kannst
              </h3>
              <p className={gS.descriptionTextLarge}>
                Je mehr Menschen du zur Expedition einlädst, desto besser stehen
                die Chancen, dass{' '}
                {municipality ? `${municipality.name}` : 'deine Gemeinde'} bald
                Grundeinkommen erforscht.{' '}
                {municipality
                  ? `Wir müssen insgesamt ${municipality.goal} Menschen werden!`
                  : ''}
              </p>
            </>
          ) : (
            <br />
          )}

          {introText && previewComponent &&
            <div className={s.previewCalloutContainer}>
              <div className={s.previewElement}>
                <h3>{introText}</h3>
                {previewComponent}
              </div>
              <div className={s.sharePreviewElement}>
                <img
                  className={s.sharingHands}
                  src={'https://images.ctfassets.net/af08tobnb0cl/2I5hO8nJ1RNeGZlawwh1WF/9aa812e0b6c08e4a5304e7dfa70a976d/newsletter_background.png?h=250'}
                  alt={'Teilen Vorschau'}
                />
                <img
                  className={s.previewSharing}
                  src={'https://images.ctfassets.net/af08tobnb0cl/6t0temjcKv4dK7YOlfTVtz/a34774d9958afe1abacdb6cd0579ae84/SharePreviewNico.png?h=500'}
                  alt={'Teilen Vorschau'}
                />
              </div>
            </div>
          }

          <ShareButtonRow
            setShareChannel={setShareChannel}
            setSharePreviewActive={setSharePreviewActive}
            isInOnboarding={isInOnboarding}
          />

          {isInOnboarding && (
            <>
              <p className={gS.descriptionTextLarge}>
                Klicke auf einen der Buttons, um eine Vorschau deiner
                persönlichen Kachel zum Teilen zu sehen!
              </p>
              <div className={gS.fullWidthFlex}>
                <Button
                  className={gS.nextButton}
                  onClick={() => setCurrentElementByIndex(compIndex + 1)}
                >
                  Weiter
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <SharePreview
            shareChannel={shareChannel}
            userData={userData}
            userId={userId}
            municipality={municipality}
            isInOnboarding={isInOnboarding}
          />
          <div className={gS.fullWidthFlex}>
            <span
              className={gS.linkLikeFormatted}
              onClick={() => setSharePreviewActive(false)}
              aria-hidden="true"
            >
              {'< Zurück zur Übersicht'}
            </span>
          </div>
        </>
      )}
    </section>
  );
};
