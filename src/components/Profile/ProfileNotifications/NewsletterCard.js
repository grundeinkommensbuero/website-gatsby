import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Checkbox } from '../../Forms/Checkbox';

export default ({ newsletter }) => {
  const [mockupNewsletterConsent, updateMockupNewsletterConsent] = useState(newsletter.value);

  const revokeNewsletterConsent = () => {
    let updatedNewsletterConstent = {
      ...mockupNewsletterConsent
    }
    updatedNewsletterConstent = !mockupNewsletterConsent;
    updateMockupNewsletterConsent(updatedNewsletterConstent);
  }

  return (
    <div className={s.newsletterCard}>
      <p className={s.newsletterCardHeading}>{newsletter.city}</p>
      <p className={s.newsletterCardDescription}>Du erhälst die wichtigsten Infos über die Expedition.</p>

      <Form onSubmit={() => console.log('Checked')} render={() => {
        return (
          <Field
            name="extraInfoConsent"
            label="Zusätzliche Sammelinfos erhalten"
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
            onClick={revokeNewsletterConsent}
            onKeyDown={revokeNewsletterConsent}>abbestellen</span>
          : <span
            aria-hidden="true"
            className={gS.linkLikeFormated}
            onClick={revokeNewsletterConsent}
            onKeyDown={revokeNewsletterConsent}>Newsletter erhalten</span>
        }
      </p>
    </div>
  )
};
