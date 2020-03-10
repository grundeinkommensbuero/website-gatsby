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
import { SectionInner, Section } from '../../Layout/Sections';
import querystring from 'query-string';
import { useStaticQuery, graphql } from 'gatsby';
import CampaignVisualisations from '../../CampaignVisualisations';
import VisualCounter from '../../VisualCounter';

export default ({ successMessage, campaignCode }) => {
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
    const urlParams = querystring.parse(window.location.search);
    // Will be null, if param does not exist
    setListId(urlParams.listId);
    setUserId(urlParams.userId);
  }, []);

  useEffect(() => {
    if (listId || userId || eMail) {
      getSignatureCountOfUser({ listId: listId, userId: userId, email: eMail });
    }
  }, [listId, userId, eMail]);

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

  const addedSelfScanned = state === 'saved' ? count : 0;

  const campaignVisualisationsMapped = campaignVisualisations
    .map(({ node }) => node)
    .filter(({ campainCode: campaignCodeVisualisation }) => {
      return campaignCodeVisualisation === campaignCode;
    });

  if (signatureCountOfUser && signatureCountOfUser.scannedByUser) {
    campaignVisualisationsMapped[0].addSelfScanned = addedSelfScanned;
  }

  return (
    <>
      {signatureCountOfUser && (
        <Section>
          <div className={s.statisticsOverall}>
            <div className={s.statisticsOverall}>
              <div className={s.statisticsOverallCountItem}>
                <div className={s.statisticsOverallCount}>
                  <VisualCounter
                    end={signatureCountOfUser.scannedByUser + addedSelfScanned}
                  />
                </div>
                <div className={s.statisticsOverallLabel}>
                  Unterschriften
                  <br />
                  von dir gemeldet
                </div>
              </div>{' '}
              <div className={s.statisticsOverallCountItem}>
                <div className={s.statisticsOverallCount}>
                  <VisualCounter count={signatureCountOfUser.received} />
                </div>
                <div className={s.statisticsOverallLabel}>
                  Unterschriften
                  <br />
                  von dir bei uns
                  <br />
                  angekommen
                </div>
              </div>
            </div>
          </div>
          <div className={s.visualisation}>
            <h2 className={s.headingSelfScan}>
              Unterschriften selber eintragen
            </h2>
            <CountSignaturesForm
              state={state}
              updateSignatureList={updateSignatureList}
              listId={listId}
              userId={userId}
              setEMail={setEMail}
              successMessage={successMessage}
              setCount={setCount}
              campaignCode={campaignCode}
            />
            {campaignVisualisationsMapped.length && (
              <div className={s.campaignVisualisations}>
                <CampaignVisualisations
                  visualisations={campaignVisualisationsMapped}
                />
              </div>
            )}
          </div>
        </Section>
      )}
      {!signatureCountOfUser && (
        <Section title="Unterschriften zählen">
          <SectionInner hugeText={true}>
            <p>
              Du hast Unterschriften gesammelt? Bitte sag uns, wie viele
              Unterschriften hinzu gekommen sind:
            </p>

            <CountSignaturesForm
              state={state}
              updateSignatureList={updateSignatureList}
              listId={listId}
              userId={userId}
              setEMail={setEMail}
              successMessage={successMessage}
              setCount={setCount}
              campaignCode={campaignCode}
            />
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
  campaignCode,
}) => {
  const needsEMail = !listId && !userId;

  if (state === 'saving') {
    return <FinallyMessage state="progress">Speichere...</FinallyMessage>;
  }

  if (state === 'saved') {
    return <FinallyMessage>{successMessage}</FinallyMessage>;
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
        data.campaignCode = campaignCode;

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
            <FormWrapper>
              <form onSubmit={handleSubmit}>
                {needsEMail && (
                  <FormSection className={s.formSection}>
                    <Field
                      name="email"
                      label="Bitte gib deine E-Mail-Adresse ein."
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
                  <CTAButton type="submit">Eintragen</CTAButton>
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

  if (values.count && values.count < 0) {
    errors.count = 'Nix, es gibt keine negative Anzahl an Unterschriften!';
  }

  if (needsEMail && !validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  return errors;
};
