import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Checkbox } from '../../Forms/Checkbox';
import { Button } from '../../Forms/Button';

export default ({ newsletter }) => {
  const [mockupNewsletterConsent, updateMockupNewsletterConsent] = useState(newsletter.value);
  const [newsletterRevokeState, setNewsletterRevokeState] = useState(false);

  const toggleNewsletterRevokeProcess = () => {
    setNewsletterRevokeState(!newsletterRevokeState);
  }

  const revokeNewsletterConsent = () => {
    setNewsletterRevokeState(false);
    let updatedNewsletterConstent = {
      ...mockupNewsletterConsent
    }
    updatedNewsletterConstent = !mockupNewsletterConsent;
    updateMockupNewsletterConsent(updatedNewsletterConstent);
  }

  return (
    <div className={s.newsletterCard}>
      {!newsletterRevokeState ?
        <section>
          <p className={s.newsletterCardHeading}>{newsletter.name}</p>
          <p className={s.newsletterCardDescription}>
            Du erhälst die wichtigsten Infos für {newsletter.name}.
          </p>

          <Form
            validate={(values) => console.log(values)}
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
          </Form>

          <p className={cN(gS.alignRight, gS.noMargin)}>
            {mockupNewsletterConsent ?
              <span
                aria-hidden="true"
                className={gS.linkLikeFormated}
                onClick={toggleNewsletterRevokeProcess}
                onKeyDown={toggleNewsletterRevokeProcess}>abbestellen</span>
              : <span
                aria-hidden="true"
                className={gS.linkLikeFormated}
                onClick={revokeNewsletterConsent}
                onKeyDown={revokeNewsletterConsent}>Newsletter erhalten</span>
            }
          </p>
        </section> :
        <section>
          <p className={s.newsletterCardHeading}>Bist du sicher, dass du keine Neuigkeiten mehr aus {newsletter.name} bekommen möchtest?</p>
          <br />
          <p className={s.newsletterCardDescription}>Wir können dich nicht mehr informieren, wenn sich etwas an der Kampagne in {newsletter.name}
          ändert oder neue Sammelevents in deiner Nähe geplant werden.</p>
          <div className={s.revokeButtonRow}>
            <Button className={gS.floatRight} onClick={revokeNewsletterConsent}>Abbestellen</Button>
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
