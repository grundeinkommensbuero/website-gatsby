import React, { useState, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Form, Field } from 'react-final-form';
import cN from 'classnames';
import querystring from 'query-string';

import { useUpdateSignatureListByUser } from '../../../hooks/Api/Signatures/Update';
import { useSignatureCountOfUser } from '../../../hooks/Api/Signatures/Get';
import AuthContext from '../../../context/Authentication';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import { validateEmail } from '../../utils';
import { SectionInner, Section } from '../../Layout/Sections';
import CampaignVisualisations from '../../CampaignVisualisations';
import SignatureStats from '../../SignatureStats';
import AuthInfo from '../../AuthInfo';
import SignUp from '../SignUp';
import FormWrapper from '../FormWrapper';
import FormSection from '../FormSection';
import { FinallyMessage } from '../FinallyMessage';
import { TextInputWrapped } from '../TextInput';
import s from './style.module.less';

export default ({ successMessage, campaignCode }) => {
  const [
    state,
    updateSignatureList,
    resetSignatureListState,
  ] = useUpdateSignatureListByUser();
  const [
    signatureCountOfUser,
    getSignatureCountOfUser,
    resetSignatureCount,
  ] = useSignatureCountOfUser();

  // Updating a list should be possible via list id or user id
  const [listId, setListId] = useState(null);
  const [eMail, setEMail] = useState(null);

  const { userId } = useContext(AuthContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    // Will be null, if param does not exist
    setListId(urlParams.listId);
  }, []);

  useEffect(() => {
    if (userId || eMail) {
      getSignatureCountOfUser({ userId: userId, email: eMail });
    }
  }, [userId, eMail, state]);

  useEffect(() => {
    if (!userId) {
      resetSignatureCount();
    }
  }, [userId]);

  const {
    allContentfulKampagnenvisualisierung: { edges: campaignVisualisations },
  } = useStaticQuery(graphql`
    query campaignVisualisations {
      allContentfulKampagnenvisualisierung {
        edges {
          node {
            hint {
              hint
            }
            goal
            goalInbetween
            goalUnbuffered
            minimum
            startDate
            title
            addToSignatureCount
            campainCode
          }
        }
      }
    }
  `);

  const campaignVisualisationsMapped = campaignVisualisations
    .map(({ node }) => node)
    .filter(({ campainCode: campaignCodeVisualisation }) => {
      return campaignCodeVisualisation === campaignCode;
    });

  const countSignaturesFormProps = {
    state,
    updateSignatureList,
    listId,
    userId,
    eMail,
    setEMail,
    successMessage,
    count,
    setCount,
    campaignCode,
    setListId,
    resetSignatureListState,
  };

  return (
    <>
      {signatureCountOfUser && state !== 'userNotFound' && state !== 'error' ? (
        <Section>
          <SignatureStats
            signatureCount={signatureCountOfUser}
            className={s.statisticsOverall}
          />
          <div className={s.visualisation}>
            <CountSignaturesForm {...countSignaturesFormProps} />
            {campaignVisualisationsMapped.length && (
              <div className={s.campaignVisualisations}>
                <CampaignVisualisations
                  visualisations={campaignVisualisationsMapped}
                />
              </div>
            )}
          </div>
        </Section>
      ) : (
        <Section title="Unterschriften zählen">
          <SectionInner hugeText={true}>
            {!(
              state === 'error' ||
              state === 'userNotFound' ||
              state === 'listNotFound' ||
              state === 'listAndUserNotFound'
            ) && (
              <p>
                Toll, dass du Unterschriften sammelst! Bitte sag uns, wie viele
                Unterschriften du neu gesammelt hast:
              </p>
            )}
            <CountSignaturesForm {...countSignaturesFormProps} />
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
  eMail,
  successMessage,
  count,
  setCount,
  campaignCode,
  setListId,
  resetSignatureListState,
}) => {
  const needsEMail = !userId && !eMail;

  if (state === 'saving') {
    return <FinallyMessage state="progress">Speichere...</FinallyMessage>;
  }

  if (state === 'saved') {
    return (
      <FinallyMessage>
        {successMessage}
        <CTAButtonContainer className={s.buttonContainer}>
          <CTAButton
            size="MEDIUM"
            onClick={() => {
              setListId(null);
              resetSignatureListState();
            }}
          >
            Mehr eintragen
          </CTAButton>
        </CTAButtonContainer>
      </FinallyMessage>
    );
  }

  if (
    state === 'error' ||
    state === 'userNotFound' ||
    state === 'listNotFound' ||
    state === 'listAndUserNotFound'
  ) {
    return (
      <FinallyMessage state="error">
        {state === 'userNotFound' && (
          <>
            <h2>Hoppla!</h2>
            <p>
              Wir haben deine E-Mail-Adresse leider nicht gefunden. Hast du dich
              vertippt? Dann versuche es erneut:
            </p>

            <CTAButtonContainer
              className={cN(s.buttonContainer, s.buttonContainerMessage)}
            >
              <CTAButton
                size="MEDIUM"
                onClick={() => {
                  setEMail(null);
                  resetSignatureListState();
                }}
              >
                Neuer Versuch
              </CTAButton>
            </CTAButtonContainer>
            <p>
              Oder registriere dich neu bei uns, um die Unterschriften
              einzutragen:
            </p>
            <SignUp
              initialValues={{
                email: eMail,
              }}
              postSignupAction={async () => {
                const data = {
                  userId,
                  listId,
                  count,
                  campaignCode,
                };
                setCount(parseInt(data.count));
                await updateSignatureList(data);
              }}
              illustration={false}
            />
            <p>
              Funktioniert auch das nicht? Dann schreib uns an{' '}
              <a href="mailto:support@expedition-grundeinkommen.de">
                support@expedition-grundeinkommen.de
              </a>
              .
            </p>
          </>
        )}
        {state === 'error' && (
          <>
            Da ist was schief gegangen. Melde dich bitte bei{' '}
            <a href="mailto:support@expedition-grundeinkommen.de">
              support@expedition-grundeinkommen.de
            </a>{' '}
            und sende uns folgenden Text: listId={listId}.
          </>
        )}
        {state === 'listNotFound' && (
          <>
            Die Liste mit dem Barcode {listId} konnten wir leider nicht finden.
            Bitte probiere es noch ein Mal.
            <CTAButtonContainer className={s.buttonContainer}>
              <CTAButton
                size="MEDIUM"
                onClick={() => {
                  setListId(null);
                  resetSignatureListState();
                }}
              >
                Neuer Versuch
              </CTAButton>
            </CTAButtonContainer>
          </>
        )}
        {state === 'listAndUserNotFound' && (
          <>
            Die Liste mit dem Barcode {listId} und den Benutzer {eMail} konnten
            wir leider nicht finden. Bitte probiere es noch ein Mal.
            <CTAButtonContainer className={s.buttonContainer}>
              <CTAButton
                size="MEDIUM"
                onClick={() => {
                  setListId(null);
                  setEMail(null);
                  resetSignatureListState();
                }}
              >
                Neuer Versuch
              </CTAButton>
            </CTAButtonContainer>
          </>
        )}
      </FinallyMessage>
    );
  }

  return (
    <>
      {userId && (
        <p>
          <AuthInfo />
        </p>
      )}
      <Form
        onSubmit={data => {
          data.campaignCode = campaignCode;

          // We can set both the list id and user id here,
          // because if the param is not set it will just be null
          data.userId = userId;

          if (data.listId) {
            setListId(data.listId);
          } else {
            data.listId = listId;
          }

          // If user clicks on 'Mehr eintragen', the email cannot be read from the form.
          // Therefore, we have to add it to the data object manually.
          if (data.email) {
            setEMail(data.email);
          } else if (eMail) {
            data.email = eMail;
          }

          setCount(parseInt(data.count));
          updateSignatureList(data);
        }}
        validate={values => validate(values, needsEMail, !listId)}
        render={({ handleSubmit }) => {
          return (
            <FinallyMessage>
              <h2 className={s.headingSelfScan}>
                Unterschriften selber eintragen
              </h2>
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  {needsEMail && (
                    <FormSection className={s.formSection}>
                      <Field
                        name="email"
                        label="Bitte gib deine E-Mail-Adresse ein."
                        placeholder="E-Mail"
                        component={TextInputWrapped}
                        type="email"
                        className={s.label}
                      ></Field>
                    </FormSection>
                  )}
                  <FormSection
                    className={s.formSection}
                    fieldContainerClassName={s.formSectionCombined}
                  >
                    <Field
                      name="count"
                      label="Anzahl Unterschriften"
                      placeholder="1"
                      component={TextInputWrapped}
                      type="number"
                      min={1}
                      className={s.label}
                      inputClassName={s.countField}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    ></Field>
                    {!listId && (
                      <Field
                        name="listId"
                        label="Barcode auf der Unterschriftenliste"
                        placeholder=""
                        component={TextInputWrapped}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min={1}
                        className={s.label}
                        inputClassName={s.listIdField}
                      ></Field>
                    )}
                  </FormSection>

                  <CTAButtonContainer className={s.buttonContainer}>
                    <CTAButton type="submit" size="MEDIUM">
                      Eintragen
                    </CTAButton>
                  </CTAButtonContainer>
                </form>
              </FormWrapper>
            </FinallyMessage>
          );
        }}
      />
    </>
  );
};

const validate = (values, needsEMail, needsListId) => {
  const errors = {};

  if (!values.count) {
    errors.count = 'Muss ausgefüllt sein';
  }

  if (needsListId && !values.listId) {
    errors.listId = 'Muss ausgefüllt sein';
  }

  if (values.count && values.count < 0) {
    errors.count = 'Nix, es gibt keine negative Anzahl an Unterschriften!';
  }

  if (needsEMail && !validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};
