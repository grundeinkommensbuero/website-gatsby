import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import s from './style.module.less';
import EmailListForm from '../EmailListForm';

export default function Sections({ sections }) {
  if (sections && sections.length) {
    return (
      <div>
        {sections.map((section, index) => (
          <section key={index}>
            {section.title && <h1>{section.title}</h1>}
            {documentToReactComponents(section.body.json)}
            {section.emailSignup && <EmailListForm />}
          </section>
        ))}
      </div>
    );
  }
}
