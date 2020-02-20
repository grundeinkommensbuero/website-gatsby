import React from 'react';
import { SectionInner } from '../Layout/Sections';
import s from './style.module.less';
import cN from 'classnames';
import { Speechbubble } from './Speechbubble';
import { Form, Field } from 'react-final-form';
import { CTAButton } from '../Layout/CTAButton';
import Avatar1 from './avatar1.svg';
import { TextInputInline, TextInputWrapped } from '../Forms/TextInput';

export default ({ mode }) => {
  return (
    <Form
      onSubmit={data => {
        console.log('submitting', data);
      }}
      validate={validate}
      render={({ handleSubmit }) => (
        <SectionInner>
          <form onSubmit={handleSubmit}>
            <Speechbubble>hellooo</Speechbubble>
            <div className={s.belowBubble}>
              <div>
                <img src={Avatar1} className={s.avatarImage} />
              </div>
              <Field
                render={TextInputWrapped}
                name="name"
                label="Name"
                placeholder="Dein Name"
              />
              <div className={s.sendButton}>
                <CTAButton type="submit">Abschicken</CTAButton>
              </div>
            </div>
          </form>
        </SectionInner>
      )}
    ></Form>
  );
};

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Bitte gib einen Namen an';
  }

  return errors;
};
