import React, { useState, useEffect } from 'react';
import { SectionInner } from '../../Layout/Sections';
import s from './style.module.less';
import cN from 'classnames';
import { Speechbubble } from '../Speechbubble';
import { Form, Field } from 'react-final-form';
import { CTAButton } from '../../Layout/CTAButton';
import { TextInputWrapped } from '../../Forms/TextInput';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { useUploadImage } from '../../../hooks/images';
import { useSaveQuestion } from '../../../hooks/Api/Questions';
import AvatarImage from '../../AvatarImage';

export default ({ setQuestionJustSent, userId, userData }) => {
  const [uploadImageState, uploadImage] = useUploadImage();
  const [questionState, uploadQuestion] = useSaveQuestion();
  const [question, saveQuestion] = useState(null);

  useEffect(() => {
    if (questionState === 'saved') {
      setQuestionJustSent(question);
    }
  }, [questionState]);

  if (
    questionState === 'error' ||
    uploadImageState === 'error' ||
    userId === undefined ||
    userData.state === 'error' ||
    userData.state === 'notFound' ||
    userId === undefined
  ) {
    return (
      <SectionInner>
        <FinallyMessage>
          {userId === undefined && <>Da ist was mit dem Link verkehrt. </>}
          {questionState === 'error' && (
            <>Das Absenden der Frage hat nicht geklappt. </>
          )}
          {uploadImageState === 'error' && (
            <>Das Hochladen des Bildes hat nicht geklappt. </>
          )}
          {userData.state === 'error' && (
            <>Abrufen des Benutzers hat nicht geklappt. </>
          )}
          {userData.state === 'notFound' && (
            <>Den Benutzer konnten wir nicht finden. </>
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

  if (questionState === 'saved') {
    return (
      <SectionInner>
        <FinallyMessage>Deine Frage ist gespeichert.</FinallyMessage>
      </SectionInner>
    );
  }

  if (questionState === 'saving' || uploadImageState === 'saving') {
    return (
      <SectionInner>
        <FinallyMessage state="progress">Speichere...</FinallyMessage>
      </SectionInner>
    );
  }

  return (
    <Form
      onSubmit={({ image, ...data }) => {
        saveQuestion({
          user: {
            username: data.username,
            profilePictures: userData.user && userData.user.profilePictures,
            srcOverwrite: image && image.srcOverwrite,
          },
          body: data.question,
        });
        if (image && image.files && image.files[0]) {
          uploadImage(userId, image.files[0]);
        }
        uploadQuestion(userId, data);
      }}
      validate={validate}
      initialValues={{
        username: userData.user && userData.user.username,
        question:
          userData.user &&
          userData.user.questions &&
          userData.user.questions[0] &&
          userData.user.questions[0].body,
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
              {userData.user && userData.user.profilePictures ? (
                <AvatarImage
                  user={userData.user}
                  className={s.avatarImage}
                  sizes="80px"
                />
              ) : (
                <Field
                  name="image"
                  component={ImageInput}
                  user={userData.user}
                />
              )}
              {userData.user && userData.user.username ? (
                <div className={cN(s.usernameDisplay, s.textInput)}>
                  {userData.user.username}
                </div>
              ) : (
                <Field
                  render={TextInputWrapped}
                  name="username"
                  label="Name"
                  placeholder="Dein Name"
                  inputClassName={s.nameInput}
                  className={s.textInput}
                />
              )}
              {userData.user && !userData.user.hasZipCode && (
                <Field
                  render={TextInputWrapped}
                  name="zipCode"
                  label="Postleitzahl"
                  placeholder="Deine Postleitzahl"
                  inputClassName={s.nameInput}
                  explanation="Wenn du deine Postleitzahl angibst, bekommst du in Zukunft passendere Infos. Die Angabe ist optional."
                  className={s.textInput}
                />
              )}
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
  );
};

const ImageInput = ({ input: { value, onChange, ...input }, user }) => {
  const [avatarImage, setAvatarImage] = useState(null);
  const handleChange = ({ target }) => {
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = e => {
        setAvatarImage(e.target.result);
        onChange({ files: target.files, srcOverwrite: e.target.result });
      };
    } else {
      onChange({ files: target.files });
    }
  };
  return (
    <label className={s.avatarImageContainer} aria-label="Lade ein Bild hoch">
      <AvatarImage
        srcOverwrite={avatarImage}
        className={s.avatarImage}
        user={user}
        sizes="80px"
      />
      <div className={s.avatarImageLabel}>Lad’ ein Bild hoch!</div>
      <input
        type="file"
        onChange={handleChange}
        className={s.avatarUploadButton}
        accept="image/png, image/jpeg"
        {...input}
      />
    </label>
  );
};

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Bitte gib einen Namen an';
  }

  return errors;
};
