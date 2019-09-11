import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import s from './style.module.less';
import EmailListForm from '../EmailListForm';
import { stringToId } from '../utils';

export default function Sections({ sections }) {
  if (sections && sections.length) {
    return (
      <div className={s.sections}>
        {sections.map((section, index) => {
          const { title, titleShort, body, emailSignup } = section;
          const id = stringToId(titleShort);
          return (
            <section key={index} id={id} className={s.section}>
              <div className={s.sectionBody}>
                {title && <h1 className={s.title}>{title}</h1>}
                {documentToReactComponents(body.json)}
                {emailSignup && <EmailListForm />}
              </div>
            </section>
          );
        })}
      </div>
    );
  }
  return null;
}
