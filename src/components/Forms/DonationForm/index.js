import React, { useContext, useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import * as ibantools from 'ibantools';
import FormWrapper from '../FormWrapper';
import FormSection from '../FormSection';
import {
  Button,
  InlineButton,
  PrimarySecondaryButtonContainer,
} from '../Button';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';

import { TextInputWrapped } from '../TextInput';
import AuthContext from '../../../context/Authentication';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';
import { Overlay } from '../../Overlay';

import s from './style.module.less';

export default () => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState(false);
  const [enteredPaymentInfo, setEnteredPaymentInfo] = useState(false);
  const [hasDonated, setHasDonated] = useState(false);
  const [donationError, setDonationError] = useState(false);
  const { userId } = useContext(AuthContext);
  const [updateUserState, updateUser] = useUpdateUser();
  const [donationInfo, setDonationInfo] = useState();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  let formData = {};
  let formErrors = {};

  useEffect(() => {
    if (updateUserState === 'updated') {
      setHasDonated(true);
    }
    if (updateUserState === 'error') {
      setDonationError(true);
    }
  }, [updateUserState]);

  const onAmountClick = recurring => {
    setIsRecurring(recurring);

    if (formErrors.customAmount) {
      return;
    }
    setEnteredAmount(true);
  };

  const toggleOverlay = () => {
    setIsOverlayOpen(prev => !prev);
  };
  const toggleSepaOverlay = e => {
    if (e.key !== 'Enter' && e.keyCode !== 13) {
      e.preventDefault();
    }
    toggleOverlay();
  };

  const getFormDataAmount = (amount, customAmount) => {
    return amount === 'custom' && customAmount ? +customAmount : +amount;
  };

  const validate = values => {
    formData = JSON.parse(JSON.stringify(values));

    const errors = {};

    if (values.amount === 'custom' && !values.customAmount) {
      errors.customAmount = 'Muss ausgefüllt sein';
    }

    if (values.amount === 'custom' && values.customAmount < 0) {
      errors.customAmount = 'Bitte gib eine positive Zahl ein.';
    }

    if (!values.firstName) {
      errors.firstName = 'Muss ausgefüllt sein';
    }

    if (!values.lastName) {
      errors.lastName = 'Muss ausgefüllt sein';
    }

    if (!values.sepa) {
      errors.sepa = 'Bitte stimme zu, um fortzufahren.';
    }

    if (!values.privacy) {
      errors.privacy = 'Bitte stimme zu, um fortzufahren.';
    }

    let extractedIban = ibantools.electronicFormatIBAN(formData.iban);
    if (!ibantools.isValidIBAN(extractedIban)) {
      errors.iban = 'Muss eine gültige IBAN sein';
    } else {
      formData.extractedIban = extractedIban;
    }

    formErrors = { ...errors };
    return errors;
  };

  return (
    <div className={s.donationForm}>
      {!hasDonated && !enteredPaymentInfo && !donationError && (
        <Form
          onSubmit={data => {
            const { customAmount, amount, ...inputData } = data;
            const finalAmount =
              amount === 'custom' && customAmount ? +customAmount : +amount;

            const donation = {
              ...inputData,
              amount: finalAmount,
              recurring: isRecurring,
              iban: formData.extractedIban,
            };
            const donationInfo = { userId: userId, donation };
            setDonationInfo(donationInfo);
            setEnteredPaymentInfo(true);
          }}
          initialValues={{
            amount: '5',
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
                      <h3>
                        Bitte gib deine &#8203;Zahlungs&shy;informationen ein
                      </h3>
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
                          name="firstName"
                          label="Vorname"
                          placeholder="Vorname"
                          type="text"
                          component={TextInputWrapped}
                        />
                        <Field
                          name="lastName"
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

                        <Field
                          name="sepa"
                          label={
                            <>
                              Es gilt meine Ermächtigung gemäß{' '}
                              <InlineButton onClick={toggleSepaOverlay}>
                                SEPA-Mandat
                              </InlineButton>
                              .
                            </>
                          }
                          type="checkbox"
                          component={Checkbox}
                        ></Field>
                        <Overlay
                          isOpen={isOverlayOpen}
                          toggleOverlay={toggleOverlay}
                          title="SEPA-Mandat"
                        >
                          <p>
                            Ich ermächtige Vertrauensgesellschaft e.V.,
                            Zahlungen von meinem Konto mittels Lastschrift
                            einzuziehen. Zugleich weise ich mein Kreditinstitut
                            an, die von Vertrauensgesellschaft e.V. auf mein
                            Konto gezogenen Lastschriften einzulösen.
                          </p>
                          <p>
                            Hinweis: Ich kann innerhalb von acht Wochen,
                            beginnend mit dem Belastungsdatum, die Erstattung
                            des belasteten Betrages verlangen. Es gelten dabei
                            die mit meinem Kreditinstitut vereinbarten
                            Bedingungen. Die Frist für die Vorabinformation der
                            SEPA-Lastschrift wird auf drei Tage verkürzt.
                          </p>
                          <p>
                            Vertrauensgesellschaft e.V., Isarstrasse 11, 12053
                            Berlin <br />
                            Gläubiger-Identifikationsnummer:
                            DE74ZZZZ09671218105601
                          </p>
                        </Overlay>
                        <Field
                          name="privacy"
                          label={
                            <>
                              Ich habe die{' '}
                              <a
                                href="/datenschutz/"
                                target="_blank"
                                className={s.link}
                              >
                                Datenschutzbedingungen
                              </a>{' '}
                              zur Kenntnis genommen.
                            </>
                          }
                          type="checkbox"
                          component={Checkbox}
                        ></Field>
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

      {!hasDonated && enteredPaymentInfo && !donationError && (
        <div>
          <h3>Bitte überprüfe deine Daten</h3>

          <p>
            Name:{' '}
            <span className={s.info}>
              {donationInfo.donation.firstName} {donationInfo.donation.lastName}
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
              }}
              size="MEDIUM"
            >
              Jetzt spenden
            </CTAButton>
          </PrimarySecondaryButtonContainer>
        </div>
      )}

      {hasDonated && !donationError && (
        <div>
          <h3>Vielen Dank!</h3>
          <p>
            Wir haben deine Daten erhalten und werden die Spende in Kürze von
            deinem Konto einziehen.
          </p>
          <p>Vielen Dank, dass du die Expedition unterstützt! </p>
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

      {donationError && (
        <div>
          <h3>Hoppla!</h3>
          <p>
            Bei der Verarbeitung deiner Daten ist ein Fehler aufgetreten! :(
          </p>
          <p>
            Bitte versuche es erneut, oder überweise den Betrag direkt auf unser
            Konto: 
          </p>
          <p className={s.info}>
            Vertrauensgesellschaft e.V.<br></br>IBAN: DE74 4306 0967 1218 1056
            01
          </p>
          <p>Vielen Dank für deine Unterstützung!</p>
          <CTAButtonContainer className={s.buttonContainer}>
            <CTAButton
              onClick={() => {
                setIsRecurring(false);
                setEnteredAmount(false);
                setEnteredPaymentInfo(false);
                setDonationError(false);
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
