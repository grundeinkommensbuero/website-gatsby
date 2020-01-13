import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import FormWrapper from '../FormWrapper';
import FormSection from '../FormSection';
import { FinallyMessage } from '../FinallyMessage';
import { TextInputWrapped } from '../TextInput';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import s from './style.module.less';
import { useUpdateSignatureListByUser } from '../../../hooks/Api/Signatures/Update';
import { useSignatureCountOfUser } from '../../../hooks/Api/Signatures/Get';
import { validateEmail } from '../../utils';
import { SectionInner, Section, SectionHeader } from '../../Layout/Sections';

export default ({ successMessage }) => {
  const [state, updateSignatureList] = useUpdateSignatureListByUser();
  const [
    signatureCountOfUser,
    getSignatureCountOfUser,
  ] = useSignatureCountOfUser();

  // Updating a list should be possible via list id or user id
  const [listId, setListId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [eMail, setEMail] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // Will be null, if param does not exist
    setListId(urlParams.get('listId'));
    setUserId(urlParams.get('userId'));
  }, []);

  useEffect(() => {
    if (listId || userId || eMail) {
      getSignatureCountOfUser({ listId: listId, userId: userId, email: eMail });
    }
  }, [listId, userId, eMail]);

  return (
    <>
      <Section title="Unterschriften zählen">
        <SectionInner hugeText={true}>
          <CountSignaturesForm
            state={state}
            updateSignatureList={updateSignatureList}
            listId={listId}
            userId={userId}
            setEMail={setEMail}
            successMessage={successMessage}
            setCount={setCount}
          />
        </SectionInner>
      </Section>

      {signatureCountOfUser && (
        <Section title="Deine Statistik">
          <SectionInner>
            <p>Unterschriften von dir:</p>
            <ul>
              <li>
                {signatureCountOfUser.scannedByUser + count} an uns Mitgeteilt
              </li>
              <li>
                {signatureCountOfUser.received} sind schon bei uns angekommen
              </li>
            </ul>
          </SectionInner>
        </Section>
      )}
    </>
  );
};

const CountSignaturesForm = ({
  state,
  updateSignatureList,
  listId,
  userId,
  setEMail,
  successMessage,
  setCount,
}) => {
  const needsEMail = !listId && !userId;

  if (state === 'saving') {
    return <FinallyMessage state="progress">Speichere...</FinallyMessage>;
  }

  if (state === 'saved') {
    return <FinallyMessage state="success">{successMessage}</FinallyMessage>;
  }

  if (state === 'notFound' && needsEMail) {
    return (
      <FinallyMessage state="error">
        Wir haben deine E-Mail-Adresse nicht gespeichert. War sie richtig
        geschrieben? Probiere es bitte noch ein Mal. Falls es dann noch immer
        nicht funktioniert, melde dich bitte an oder schreib uns an{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>
        .
      </FinallyMessage>
    );
  } else if (state === 'error' || state === 'notFound') {
    return (
      <FinallyMessage state="error">
        Da ist was schief gegangen. Melde dich bitte bei{' '}
        <a href="mailto:support@expedition-grundeinkommen.de">
          support@expedition-grundeinkommen.de
        </a>{' '}
        und sende uns folgenden Text: listId={listId}.
      </FinallyMessage>
    );
  }

  return (
    <Form
      onSubmit={data => {
        // We can set both the list id and user id here,
        // because if the param is not set it will just be null
        data.listId = listId;
        data.userId = userId;

        if (data.email) {
          setEMail(data.email);
        }
        setCount(parseInt(data.count));
        updateSignatureList(data);
      }}
      validate={values => validate(values, needsEMail)}
      render={({ handleSubmit }) => {
        return (
          <>
            <p>
              Du hast Unterschriften gesammelt? Bitte sag uns, Unterschriften
              hinzu gekommen sind:
            </p>
            <FormWrapper>
              <form onSubmit={handleSubmit}>
                {needsEMail && (
                  <FormSection className={s.formSection}>
                    <Field
                      name="email"
                      label="Bitte gib deiner E-Mail-Adresse ein."
                      placeholder="E-Mail"
                      component={TextInputWrapped}
                      type="text"
                    ></Field>
                  </FormSection>
                )}

                <FormSection className={s.formSection}>
                  <Field
                    name="count"
                    label="Anzahl Unterschriften. Du kannst auch die Unterschriften mehrerer Bögen auf einmal eingeben."
                    placeholder="1"
                    component={TextInputWrapped}
                    type="number"
                    min={1}
                    inputClassName={s.countField}
                  ></Field>
                </FormSection>

                <CTAButtonContainer>
                  <CTAButton type="submit">Speichern</CTAButton>
                </CTAButtonContainer>
              </form>
            </FormWrapper>
          </>
        );
      }}
    />
  );
};

const validate = (values, needsEMail) => {
  const errors = {};

  if (!values.count) {
    errors.count = 'Muss ausgefüllt sein';
  }

  if (needsEMail && !validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};
