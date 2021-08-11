import React, { useEffect, useState } from 'react';
import { SectionInner } from '../../Layout/Sections';
import * as s from './style.module.less';
import cN from 'classnames';
import { Speechbubble } from '../Speechbubble';
import { Form, Field } from 'react-final-form';
import { CTAButton } from '../../Layout/CTAButton';
import { TextInputWrapped } from '../../Forms/TextInput';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { useSaveQuestion } from '../../../hooks/Api/Questions';
import AvatarImage from '../../AvatarImage';

export default ({ userData, updateCustomUserData }) => {
  const [questionState, uploadQuestion] = useSaveQuestion();
  const [question, setQuestion] = useState();

  useEffect(() => {
    if (questionState === 'saved') {
      updateCustomUserData();
    }
  }, [questionState]);

  if (questionState === 'error') {
    return (
      <SectionInner>
        <FinallyMessage>
          {questionState === 'error' && (
            <>Das Absenden der Frage hat nicht geklappt. </>
          )}
          <br />
          <br />
          Probiere es bitte ein weiteres Mal oder melde dich bei uns mit dem
          Hinweis zu der genauen Fehlermeldung. Nenne uns bitte außerdem falls
          möglich deinen Browser und die Version:
          <br />
          <br />
          <a href="mailto:support@expedition-grundeinkommen.de">
            support@expedition-grundeinkommen.de
          </a>
        </FinallyMessage>
      </SectionInner>
    );
  }

  if (questionState === 'saving') {
    return (
      <SectionInner>
        <FinallyMessage state="progress">Speichere...</FinallyMessage>
      </SectionInner>
    );
  }

  return (
    <>
      {questionState === 'saved' && (
        <SectionInner>
          <FinallyMessage>Deine Frage ist gespeichert.</FinallyMessage>
        </SectionInner>
      )}
      <Form
        onSubmit={({ image, ...data }) => {
          setQuestion({
            body: data.question,
          });

          uploadQuestion(data);
        }}
        validate={validate}
        initialValues={{
          // Use question from state, if question was just uploaded
          question: question?.body || userData?.questions?.[0]?.body,
        }}
        render={({ handleSubmit, dirtyFields }) => (
          <SectionInner>
            <form onSubmit={handleSubmit}>
              <Speechbubble>
                <Field
                  name="question"
                  label="Deine Frage an das Grundeinkommen"
                  placeholder="Deine Frage"
                  type="textarea"
                  maxLength={300}
                  component={TextInputWrapped}
                  inputClassName={s.questionInput}
                  hideLabel={true}
                />
              </Speechbubble>
              <div className={s.belowBubble}>
                <AvatarImage user={userData.user} className={s.createQuestionProfile} sizes="80px" />

                <div className={s.submitButtonContainer}>
                  <CTAButton
                    type="submit"
                    className={cN(s.submitButton, {
                      [s.submitButtonDirty]: dirtyFields.question,
                    })}
                  >
                    Abschicken
                  </CTAButton>
                </div>
              </div>
            </form>
          </SectionInner>
        )}
      ></Form>
    </>
  );
};

const validate = values => {
  const errors = {};

  if (!values.question) {
    errors.username = 'Bitte gib eine Frage ein';
  }

  return errors;
};
