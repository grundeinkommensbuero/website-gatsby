import React, { useContext, useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import * as ibantools from 'ibantools';
import FormWrapper from '../FormWrapper';
import FormSection from '../FormSection';
import { Button, InlineButton, PrimarySecondaryButtonContainer } from '../Button';
import {RadioButton} from '../RadioButton';
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
  let formData = {}
  let formErrors = {}

  useEffect(() => {
    if (updateUserState === 'updated') {
      setHasDonated(true);
    }
  }, [updateUserState]);

  const onAmountClick = (recurring) => {
    setIsRecurring(recurring);

    if (formErrors.customAmount) {
      return
    }
    setEnteredAmount(true);
    
  }

  const getFormDataAmount = (amount, customAmount) => {
      return amount === 'custom' && customAmount ? +customAmount : +amount;
  }

  const validate = values => {
    formData = JSON.parse(JSON.stringify(values));
    
    const errors = {};

    if (values.amount === 'custom' && !values.customAmount) {
      errors.customAmount = 'Muss ausgefüllt sein';
    }

    if (values.amount === 'custom' && values.customAmount < 0) {
      errors.customAmount = 'Bitte gib eine positive Zahl ein.';
    }

    if (!values.firstname) {
      errors.firstname = 'Muss ausgefüllt sein';
    }

    if (!values.lastname) {
      errors.lastname = 'Muss ausgefüllt sein';
    }


    let extractedIban = ibantools.electronicFormatIBAN(formData.iban)
    if (!ibantools.isValidIBAN(extractedIban)) {
      errors.iban = "Muss eine gültige IBAN sein"
    } else {
      formData.extractedIban = extractedIban
    }

    formErrors = {...errors};
    return errors;
  };



  return (
    <div className={s.donationForm}>
      {!hasDonated && !enteredPaymentInfo && (
        <Form
          onSubmit={data => {
            const { customAmount, amount, ...inputData } = data;
            const finalAmount =
              amount === 'custom' && customAmount ? +customAmount : +amount;

            const donation = {
              ...inputData,
              amount: finalAmount,
              recurring: isRecurring,
              iban: formData.extractedIban
            };
            const donationInfo = { userId: userId, donation };
            setDonationInfo(donationInfo);
            setEnteredPaymentInfo(true);
          }}
          initialValues={{
            amount: "5",
          }}
          validate={values => validate(values)}
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
                      <p>Unterstütze uns mit:</p>

                      <FormSection>
                        <Field
                          name="amount"
                          label="1€"
                          component={RadioButton}
                          type="radio"
                          value="1"
                        />{' '}

                        <Field
                          name="amount"
                          label="5€"
                          component={RadioButton}
                          type="radio"
                          value="5"
                        />{' '}

                        <Field
                          name="amount"
                          label="10€"
                          component={RadioButton}
                          type="radio"
                          value="10"
                        />{' '}

                        <Field
                          name="amount"
                          label="Eigenen Betrag eingeben"
                          component={RadioButton}
                          type="radio"
                          value="custom"
                        />{' '}

                          <Condition when="amount" is="custom">
                            <div className={s.customAmount}>
                              <Field
                                name="customAmount"
                                placeholder="100"
                                type="number"
                                component={TextInputWrapped}
                                min={2}
                                inputMode="numeric"
                                pattern="[0-9]*"
                              />{' '}
                              <span className={s.currency}>€</span>
                            </div>
                          </Condition>
                      </FormSection>

                      <CTAButtonContainer>
                        <CTAButton
                          type="submit"
                          onClick={() => {
                            onAmountClick(false);
                          }}
                          size="MEDIUM"
                        >
                          Einmalig spenden
                        </CTAButton>

                        <CTAButton
                          type="submit"
                          onClick={() => {
                            onAmountClick(true);
                          }}
                          size="MEDIUM"
                          className={s.primaryButton}
                        >
                          Monatlich unterstützen
                        </CTAButton>
                      </CTAButtonContainer>
                    </div>
                  )}

                  {enteredAmount === true && (
                    <div>
                      <h3>Bitte gib deine Zahlungsinformationen ein</h3>
                      <p>
                        Du möchtest{' '}
                        <span className={s.info}>
                          {isRecurring ? 'monatlich' : 'einmalig'}{' '}
                          {getFormDataAmount(
                            formData.amount,
                            formData.customAmount
                          )}{' '}
                          €
                        </span>{' '}
                        an die Expedition spenden.
                      </p>

                      <FormSection className={s.partialForm}>
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

                      <PrimarySecondaryButtonContainer>
                        <InlineButton
                          onClick={() => {
                            setIsRecurring(false);
                            setEnteredAmount(false);
                          }}
                        >
                          Zurück
                        </InlineButton>
                        <Button type="submit" size="MEDIUM">
                          Weiter
                        </Button>
                      </PrimarySecondaryButtonContainer>
                    </div>
                  )}
                </form>
              </FormWrapper>
            );
          }}
        ></Form>
      )}

      {!hasDonated && enteredPaymentInfo && (
        <div>
          <h3>Bitte überprüfe deine Daten</h3>
          <p>
            Name:{' '}
            <span className={s.info}>
              {donationInfo.donation.firstname} {donationInfo.donation.lastname}
            </span>
          </p>
          <p>
            IBAN: <span className={s.info}>{donationInfo.donation.iban}</span>
          </p>
          <p>
            Mit dem Klick auf "Jetzt spenden" bestätigst du, dass du{' '}
            <span className={s.info}>
              {isRecurring ? 'monatlich' : 'einmalig'}{' '}
              {donationInfo.donation.amount} €
            </span>{' '}
            an die Expedition spenden möchtest.
          </p>

          <PrimarySecondaryButtonContainer>
            <InlineButton
              onClick={() => {
                setEnteredPaymentInfo(false);
              }}
            >
              Zurück
            </InlineButton>
            <CTAButton
              onClick={() => {
                updateUser(donationInfo);
                setHasDonated(true);
              }}
              size="MEDIUM"
            >
              Jetzt spenden
            </CTAButton>
          </PrimarySecondaryButtonContainer>
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
    </div>
  );
};

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);


