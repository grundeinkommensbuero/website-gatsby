import React, { useEffect, useState } from 'react';
import querystring from 'query-string';
import { SectionInner } from '../../Layout/Sections';
import * as s from './style.module.less';
import { Speechbubble } from '../Speechbubble';
import { Form, Field } from 'react-final-form';
import { CTAButton } from '../../Layout/CTAButton';
import { TextInputWrapped } from '../../Forms/TextInput';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { useSaveInteraction } from '../../../hooks/Api/Interactions';
import AvatarImage from '../../AvatarImage';

export default ({ userData, updateCustomUserData }) => {
  const [pledgePackageState, uploadPledgePackage] = useSaveInteraction();
  const [, setPledgePackage] = useState();
  // TODO: set campaign code depending on user data
  const [campaignCode, setCampaignCode] = useState('bremen-1');

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    setCampaignCode(urlParams.campaignCode);
  }, []);

  useEffect(() => {
    if (pledgePackageState === 'saved') {
      updateCustomUserData();
    }
  }, [pledgePackageState]);

  if (pledgePackageState === 'error') {
    return (
      <SectionInner>
        <FinallyMessage>
          {pledgePackageState === 'error' && (
            <>Das Absenden hat nicht geklappt. </>
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

  if (pledgePackageState === 'saving') {
    return (
      <SectionInner>
        <FinallyMessage state="progress">Speichere...</FinallyMessage>
      </SectionInner>
    );
  }

  return (
    <>
      {pledgePackageState === 'saved' && (
        <SectionInner>
          <FinallyMessage>Du hast dir ein Paket genommen!</FinallyMessage>
        </SectionInner>
      )}
      <Form
        onSubmit={data => {
          setPledgePackage({
            body: data.body,
          });

          uploadPledgePackage({ ...data, campaignCode, type: 'pledgePackage' });
        }}
        validate={validate}
        render={({ handleSubmit }) => (
          <SectionInner>
            <form onSubmit={handleSubmit}>
              <h2>Sammelpaket nehmen</h2>
              <p>
                Mit dem Sammelpaket versprichst du, 50 Unterschriften
                einzusammeln. Das ist super! <br />
                Optional: Erzähle der Welt, warum du für's Grundeinkommen
                sammelst.
              </p>
              <Speechbubble>
                <Field
                  name="body"
                  label="Warum sammelst du für's Grundeinkommen?"
                  placeholder="Dein Grund (Maximal 70 Zeichen)"
                  type="textarea"
                  maxLength={300}
                  component={TextInputWrapped}
                  inputClassName={s.bodyInput}
                  errorClassName={s.error}
                  hideLabel={true}
                />
              </Speechbubble>
              <div className={s.belowBubble}>
                <AvatarImage
                  user={userData.user}
                  className={s.avatar}
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

  if (values.body?.length > 70) {
    errors.body = 'Der Text darf nicht länger als 70 Zeichen sein.';
  }

  return errors;
};
