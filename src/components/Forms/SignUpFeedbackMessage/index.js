import React from 'react';
import { FinallyMessage } from '../FinallyMessage';
import { trackEvent, addActionTrackingId } from '../../utils';
import { LinkButton } from '../Button';

export default ({ className, state, trackingId, trackingCategory }) => {
  let finallyState;
  if (state === 'saved' || state === 'updated') {
    finallyState = 'success';
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('sentSuccess', trackingId),
    });
  }
  if (state === 'error' || state === 'userExists') {
    finallyState = 'error';
    trackEvent({
      category: trackingCategory,
      action: addActionTrackingId('sentError', trackingId),
      name: state,
    });
  }
  if (state === 'saving') {
    finallyState = 'progress';
  }
  return (
    <div className={className}>
      <FinallyMessage state={finallyState}>
        {state === 'saving' && 'Wird abgeschickt...'}
        {state === 'saved' && (
          <>
            Yay, danke! Bitte geh in dein E-Mail-Postfach und bestätige, dass
            wir deine Daten speichern dürfen. Falls du unsere E-Mail nicht
            findest, sieh bitte auch in deinem Spam-Ordner nach!
          </>
        )}
        {state === 'updated' && (
          <>
            Yay, danke! Deine Informationen wurden ergänzt.
            <br />
            <br />
            Wir sind gemeinnützig und auf Spenden angewiesen. Bitte unterstütze
            uns auch finanziell!
            <br />
            <br />
            <LinkButton href="/#Spenden">Jetzt spenden</LinkButton>
          </>
        )}
        {state === 'userExists' && (
          <>
            Danke! Diese E-Mail-Adresse kennen wir schon - Hast du unsere
            Antwort-Mail bekommen? Dann fehlt nur noch der letzte Klick zum
            Bestätigen. <br />
            <br />
            Nichts gefunden? Dann schau doch bitte noch einmal in deinen
            Spam-Ordner, oder schreibe uns an{' '}
            <a href="mailto:support@expedition-grundeinkommen.de">
              support@expedition-grundeinkommen.de
            </a>
            .
          </>
        )}
        {state === 'error' && (
          <>
            Da ist was schief gegangen. Melde dich bitte bei uns{' '}
            <a href="mailto:support@expedition-grundeinkommen.de">
              support@expedition-grundeinkommen.de
            </a>
            .
          </>
        )}
      </FinallyMessage>
    </div>
  );
};
