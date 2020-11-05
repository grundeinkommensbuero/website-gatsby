import React, { useContext, useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import FormWrapper from '../FormWrapper';
import FormSection from '../FormSection';
import { InlineButton } from '../Button';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import { TextInputWrapped } from '../TextInput';
import AuthContext from '../../../context/Authentication';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';

import s from './style.module.less';

export default () => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState(false);
  const [enteredPaymentInfo, setEnteredPaymentInfo] = useState(false);
  const [hasDonated, setHasDonated] = useState(false);
  const { userId } = useContext(AuthContext);
  const [updateUserState, updateUser] = useUpdateUser();
  const [donationInfo, setDonationInfo] = useState();

  useEffect(() => {
    if (updateUserState === 'updated') {
      setHasDonated(true);
    }
  }, [updateUserState]);

  const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );

  return (
    <>
      {!hasDonated && !enteredPaymentInfo && (
        <Form
          onSubmit={data => {
            console.log(data);
            const { customAmount, amount, ...inputData } = data;
            const finalAmount =
              amount === 'custom' && customAmount ? +customAmount : +amount;

            const donation = {
              ...inputData,
              amount: finalAmount,
              recurring: isRecurring,
            };
            const donationInfo = { userId: userId, donation };
            setDonationInfo(donationInfo);
            setEnteredPaymentInfo(true);
          }}
          render={({ handleSubmit }) => {
            return (
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  {enteredAmount === false && (
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
                        <label>
                          <Field
                            name="amount"
                            component="input"
                            type="radio"
                            value="custom"
                          />
                          Eigener Betrag{' '}
                        </label>

                        <Condition when="amount" is="custom">
                          <div>
                            <Field
                              name="customAmount"
                              placeholder="100"
                              type="number"
                              component={TextInputWrapped}
                            />{' '}
                            €
                          </div>
                        </Condition>

                        <br></br>
                      </FormSection>

                      <CTAButtonContainer className={s.buttonContainer}>
                        <CTAButton
                          onClick={() => {
                            setEnteredAmount(true);
                            setIsRecurring(true);
                          }}
                          size="MEDIUM"
                        >
                          Monatlich unterstützen
                        </CTAButton>
                        <CTAButton
                          onClick={() => {
                            setEnteredAmount(true);
                            setIsRecurring(false);
                          }}
                          size="MEDIUM"
                        >
                          Einmalig spenden
                        </CTAButton>
                      </CTAButtonContainer>
                    </div>
                  )}

                  {enteredAmount === true && (
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
                          Weiter
                        </CTAButton>
                        <InlineButton
                          onClick={() => {
                            setIsRecurring(false);
                            setEnteredAmount(false);
                          }}
                        >
                          Zurück
                        </InlineButton>
                      </CTAButtonContainer>
                    </div>
                  )}
                </form>
              </FormWrapper>
            );
          }}
        ></Form>
      )}

      {!hasDonated && enteredPaymentInfo && (
        <div className={s.partialForm}>
          <h3>Bitte überprüfe deine Daten</h3>
          <p>
            Name:{' '}
            <span>
              {donationInfo.donation.firstname} {donationInfo.donation.lastname}
            </span>
          </p>
          <p>
            IBAN: <span>{donationInfo.donation.iban}</span>
          </p>
          <p>
            Du spendest{' '}
            <span>
              {isRecurring ? 'monatlich' : 'einmalig'}{' '}
              {donationInfo.donation.amount} €
            </span>{' '}
            an die Expedition.
          </p>

          <CTAButtonContainer className={s.buttonContainer}>
            <CTAButton
              onClick={() => {
                updateUser(donationInfo);
                setHasDonated(true);
              }}
              size="MEDIUM"
            >
              Jetzt spenden
            </CTAButton>
            <InlineButton
              onClick={() => {
                setEnteredPaymentInfo(false);
              }}
            >
              Zurück
            </InlineButton>
          </CTAButtonContainer>
        </div>
      )}

      {hasDonated && (
        <div>
          <h3>Danke für deine Spende!</h3>
          <p>Lorem ipsum … </p>
          <CTAButtonContainer className={s.buttonContainer}>
            <CTAButton
              onClick={() => {
                setIsRecurring(false);
                setEnteredAmount(false);
                setEnteredPaymentInfo(false);
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
