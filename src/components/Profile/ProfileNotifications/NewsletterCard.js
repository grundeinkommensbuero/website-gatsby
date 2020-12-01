import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Checkbox } from '../../Forms/Checkbox';
import { Button } from '../../Forms/Button';

export default ({ newsletter, updateSingleNewsletter, waitingForApi }) => {
  const [newsletterSettings, updateNewsletterSettings] = useState(newsletter);
  const [newsletterRevokeState, setNewsletterRevokeState] = useState(false);

  const toggleNewsletterRevokeProcess = () => {
    setNewsletterRevokeState(!newsletterRevokeState);
  }

  const toggleNewsletterConsent = async () => {
    try {
      const updatedNewsletter = {
        ...newsletterSettings
      }
      updatedNewsletter.value = !updatedNewsletter.value;

      updateSingleNewsletter(updatedNewsletter)
      updateNewsletterSettings(updatedNewsletter);

      setNewsletterRevokeState(false);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleExtraInfoConsent = (value) => {
    if (value.extraInfoConsent !== newsletter.extraInfo) {
      try {
        const updatedNewsletter = {
          ...newsletterSettings
        }
        updatedNewsletter.extraInfo = value.extraInfoConsent;
        updatedNewsletter.timestamp = new Date().toISOString();

        updateSingleNewsletter(updatedNewsletter)
        updateNewsletterSettings(updatedNewsletter);
      } catch (e) {
        console.log(e);
      }
    }
  }

  const isEmptyObj = (obj) => {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={s.newsletterCard}>
      {!newsletterRevokeState ?
        <section>
          <p className={s.newsletterCardHeading}>{newsletter.name}</p>
          <p className={s.newsletterCardDescription}>
            Du erhälst die wichtigsten Infos für {newsletter.name}{
              newsletter.extraInfo ? <span>, sowie zusätzliche Sammelinfos.</span> : <span>.</span>}
          </p>

          {!waitingForApi ? <Form
            onSubmit={() => { }}
            initialValues={{ extraInfoConsent: newsletter.extraInfo }}
            validate={(values) => !isEmptyObj(values) ? toggleExtraInfoConsent(values) : null}
            render={() => {
              return (
                <Field
                  name="extraInfoConsent"
                  label={`Für ${newsletter.name} zusätzliche Sammelinfos erhalten`}
                  type="checkbox"
                  component={Checkbox}
                ></Field>
              )
            }}>
          </Form> : <span>Loading ...</span>}

          <p className={cN(gS.alignRight, gS.noMargin)}>
            <span
              aria-hidden="true"
              className={gS.linkLikeFormated}
              onClick={toggleNewsletterRevokeProcess}
              onKeyDown={toggleNewsletterRevokeProcess}>abbestellen</span>
          </p>
        </section> :
        <section>
          <p className={s.newsletterCardHeading}>
            Bist du sicher, dass du keine Neuigkeiten mehr aus {newsletter.name} bekommen möchtest?
          </p>
          <br />
          <p className={s.newsletterCardDescription}>
            Wir können dich nicht mehr informieren, wenn sich etwas an der Kampagne in {newsletter.name}
            ändert oder neue Sammelevents in deiner Nähe geplant werden.
          </p>
          <div className={s.revokeButtonRow}>
            <Button className={gS.floatRight} onClick={toggleNewsletterConsent}>
              Abbestellen
            </Button>
            <div className={s.cancelRevokeProcess}>
              <span
                aria-hidden="true"
                className={gS.linkLikeFormated}
                onClick={toggleNewsletterRevokeProcess}
                onKeyUp={toggleNewsletterRevokeProcess}>
                Newsletter weiter erhalten
              </span>
            </div>
          </div>
        </section>}
    </div>
  )
};
