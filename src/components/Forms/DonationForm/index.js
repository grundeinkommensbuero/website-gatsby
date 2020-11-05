import React, { useContext, useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import AuthContext from '../../../context/Authentication';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';

import s from './style.module.less';

export default () => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const [hasDonated, setHasDonated] = useState(false);
  const { userId } = useContext(AuthContext);
  const [updateUserState, updateUser] = useUpdateUser();

  useEffect(() => {
    if (updateUserState === 'updated') {
      setHasDonated(true);
    }
  }, [updateUserState]);

  return (
    <>
      {!hasDonated ? (
        <Form
          onSubmit={data => {
            const { customAmount, amount, ...inputData } = data;
            const finalAmount = customAmount ? +customAmount : +amount;
            const donation = {
              ...inputData,
              amount: finalAmount,
              recurring: isRecurring,
            };
            const donationUpdate = { userId: userId, donation };
            updateUser(donationUpdate);
          }}
          render={({ handleSubmit }) => {
            return (
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  {isDonating === false && (
                    <div className={s.partialForm}>
                      <h3>Unterstütze uns!</h3>
                      <p>
                        Wir finanzieren uns komplett durch Spenden. Bitte hilf
                        uns, die Expedition am Laufen zu halten!
                      </p>
                      <p>Unterstütze uns mit</p>

                      <FormSection>
                        <label>
                          <Field
                            name="amount"
                            component="input"
                            type="radio"
                            value="1"
                          />{' '}
                          1€
                        </label>
                        <br></br>
                        <label>
                          <Field
                            name="amount"
                            component="input"
                            type="radio"
                            value="5"
                          />{' '}
                          5€
                        </label>
                        <br></br>
                        <label>
                          <Field
                            name="amount"
                            component="input"
                            type="radio"
                            value="10"
                          />{' '}
                          10€
                        </label>
                        <br></br>
                        <Field
                          name="customAmount"
                          label="Eigener Betrag:"
                          placeholder="100"
                          type="number"
                          component={TextInputWrapped}
                        />{' '}
                        €<br></br>
                      </FormSection>

                      <CTAButtonContainer className={s.buttonContainer}>
                        <CTAButton
                          onClick={() => {
                            setIsDonating(true);
                            setIsRecurring(true);
                          }}
                          size="MEDIUM"
                        >
                          Monatlich unterstützen
                        </CTAButton>
                        <CTAButton
                          onClick={() => {
                            setIsDonating(true);
                            setIsRecurring(false);
                          }}
                          size="MEDIUM"
                        >
                          Einmalig spenden
                        </CTAButton>
                      </CTAButtonContainer>
                    </div>
                  )}

                  {isDonating === true && (
                    <div className={s.partialForm}>
                      <h3>Bitte gib deine Zahlungsinformationen ein</h3>

                      <FormSection>
                        <Field
                          name="firstname"
                          label="Vorname"
                          placeholder="Vorname"
                          type="text"
                          component={TextInputWrapped}
                        />
                        <Field
                          name="lastname"
                          label="Nachname"
                          placeholder="Nachname"
                          type="text"
                          component={TextInputWrapped}
                        />
                        <Field
                          name="iban"
                          label="IBAN"
                          placeholder="IBAN"
                          type="text"
                          component={TextInputWrapped}
                        />
                      </FormSection>

                      <CTAButtonContainer className={s.buttonContainer}>
                        <CTAButton type="submit" size="MEDIUM">
                          Jetzt spenden
                        </CTAButton>
                      </CTAButtonContainer>
                    </div>
                  )}
                </form>
              </FormWrapper>
            );
          }}
        ></Form>
      ) : (
        <div>
          <h3>Danke für deine Spende!</h3>
          <p>Lorem ipsum … </p>
          <CTAButtonContainer className={s.buttonContainer}>
            <CTAButton
              onClick={() => {
                setIsDonating(false);
                setIsRecurring(false);
                setHasDonated(false);
              }}
              size="MEDIUM"
            >
              Zurück zum Formular
            </CTAButton>
          </CTAButtonContainer>
        </div>
      )}
    </>
  );
};
