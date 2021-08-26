import React, { useEffect, useState } from 'react';
import querystring from 'query-string';
import { SectionInner } from '../../Layout/Sections';
import * as s from './style.module.less';
import { Speechbubble } from '../Speechbubble';
import { Form, Field } from 'react-final-form';
import { CTAButton } from '../../Layout/CTAButton';
import { TextInputWrapped } from '../../Forms/TextInput';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { useSaveQuestion } from '../../../hooks/Api/Questions';
import AvatarImage from '../../AvatarImage';

export default ({ userData, updateCustomUserData }) => {
  const [questionState, uploadQuestion] = useSaveQuestion();
  const [, setQuestion] = useState();
  const [campaignCode, setCampaignCode] = useState();

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    setCampaignCode(urlParams.campaignCode);
  }, []);

  useEffect(() => {
    if (questionState === 'saved') {
      updateCustomUserData();
    }
  }, [questionState]);

  if (questionState === 'error') {
    return (
      <SectionInner>
        <FinallyMessage>
          {questionState === 'error' && <>Das Absenden hat nicht geklappt. </>}
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
          <FinallyMessage>Du hast dir ein Paket genommen!</FinallyMessage>
        </SectionInner>
      )}
      <Form
        onSubmit={data => {
          setQuestion({
            body: data.question,
          });

          uploadQuestion({ ...data, campaignCode });
        }}
        validate={validate}
        // Initial value not needed for now, because user should be able to create multiple
        // initialValues={{
        //   // Use question from state, if question was just uploaded
        //   question: question?.body || userData?.questions?.[0]?.body,
        // }}
        render={({ handleSubmit }) => (
          <SectionInner>
            <form onSubmit={handleSubmit}>
              <h2>Sammelpaket nehmen</h2>
              <p>
                Mit dem Sammelpaket versprichst du, 50 Unterschriften
                einzusammeln. Das ist super! <br />
                Optional: Erzähle der Welt, warum du fürs Grundeinkommen
                sammelst.
              </p>
              <Speechbubble>
                <Field
                  name="question"
                  label="Deine Frage an das Grundeinkommen"
                  placeholder="Dein Grund (Maximal 70 Zeichen)"
                  type="textarea"
                  maxLength={300}
                  component={TextInputWrapped}
                  inputClassName={s.questionInput}
                  errorClassName={s.error}
                  hideLabel={true}
                />
              </Speechbubble>
              <div className={s.belowBubble}>
                <AvatarImage
                  user={userData.user}
                  className={s.createQuestionProfile}
                  sizes="80px"
                />

                <div className={s.submitButtonContainer}>
                  <CTAButton type="submit" className={s.submitButton}>
                    Paket nehmen
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

  if (values.question?.length > 70) {
    errors.question = 'Der Text darf nicht länger als 70 Zeichen sein.';
  }

  return errors;
};
