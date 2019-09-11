import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import s from './style.module.less';
import EmailListForm from '../EmailListForm';
import { stringToId } from '../utils';

export default function Sections({ sections }) {
  if (sections && sections.length) {
    return (
      <>
        {sections.map((section, index) => {
          const { title, titleShort, body, emailSignup } = section;
          const id = stringToId(titleShort);
          return (
            <section key={index} id={id}>
              {title && <h1>{title}</h1>}
              {documentToReactComponents(body.json)}
              {emailSignup && <EmailListForm />}
            </section>
          );
        })}
      </>
    );
  }
  return null;
}
