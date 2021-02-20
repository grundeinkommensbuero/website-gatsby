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
import { CTAButtonContainer, CTAButton, CTALink } from '../../Layout/CTAButton';

import { TextInputWrapped } from '../TextInput';
import AuthContext from '../../../context/Authentication';
import { useSignUp } from '../../../hooks/Authentication';

import { EnterLoginCode } from '../../Login/EnterLoginCode';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';
import { Overlay } from '../../Overlay';

import s from './style.module.less';
import cN from 'classnames';
import { FinallyMessage } from '../FinallyMessage';
import Confetti from '../../Confetti';
import { validateEmail } from '../../utils';

export default theme => {
  // var themeClass = theme[Object.keys(theme)[0]];

  const {
    isAuthenticated,
    tempEmail,
    setTempEmail,
    userId,
    customUserData: userData,
  } = useContext(AuthContext);
  const [, , signUp] = useSignUp();
  const [isRecurring, setIsRecurring] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState(false);
  const [enteredPaymentInfo, setEnteredPaymentInfo] = useState(false);
  const [needsToLogin, setNeedsToLogin] = useState(false);
  const [waitingForApi, setWaitingForApi] = useState(false);
  const [hasDonated, setHasDonated] = useState(false);
  const [donationError, setDonationError] = useState(false);
  const [updateUserState, updateUser] = useUpdateUser();
  const [, updateUserStore] = useUpdateUser();
  const [donationInfo, setDonationInfo] = useState({});
  const [initialValues, setInitialValues] = useState({ customAmount: '15' });
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [donationInterval, setDonationInverval] = useState();
  const [paymentType, setPaymentType] = useState('Lastschrift');

  let formData = {};
  let formErrors = {};

  useEffect(() => {
    if (updateUserState === 'loading') {
      setWaitingForApi(true);
    }
    if (updateUserState === 'updated') {
      setTimeout(() => {
        setHasDonated(true);
        setWaitingForApi(false);
      }, 750);
    }
    if (updateUserState === 'error') {
      setDonationError(true);
      setWaitingForApi(false);
    }
  }, [updateUserState]);

  useEffect(() => {
    if (donationInterval === 'einmalig') {
      setInitialValues({ customAmount: '100' });
    } else if (donationInterval === 'monatlich') {
      setInitialValues({ customAmount: '15' });
    } else if (donationInterval === 'jährlich') {
      setInitialValues({ customAmount: '120' });
    }
  }, [donationInterval]);

  const onAmountClick = () => {
    if (formErrors.amount) {
      return;
    }
    if (formErrors.customAmount) {
      return;
    }
    setEnteredAmount(true);
  };

  const saveDonationPledge = () => {
    console.log('Saving: ', +initialValues.customAmount, paymentType);
    updateUserStore({
      userId: userId,
      store: {
        donationPledge: {
          amount: +initialValues.customAmount,
          type: paymentType,
        },
      },
    });
  };

  const onAnswerChallengeSuccess = () => {
    updateUser(donationInfo);
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

  const getFormDataAmount = amount => {
    console.log('amount: ' + amount);
    //console.log('customAmount' + customAmount);
    //return amount === 'custom' && customAmount ? +customAmount : +amount;
    return +amount;
  };

  const validate = (values, emailRequired) => {
    formData = { ...values };
    const errors = {};

    if (emailRequired && values.email && values.email.includes('+')) {
      errors.email = 'Zurzeit unterstützen wir kein + in E-Mails';
    }

    if (emailRequired && !validateEmail(values.email)) {
      errors.email = 'Wir benötigen eine valide E-Mail Adresse';
    }

    if (!values.customAmount) {
      errors.customAmount = 'Bitte wähle einen Betrag aus.';
    }

    if (values.customAmount) {
      const decimalPlacesRegex = /(,|\.)(.*$)/;
      const decimalPlaces = values.customAmount.match(decimalPlacesRegex);
      if (decimalPlaces && decimalPlaces[2].length > 2) {
        errors.customAmount = 'Bitte nur zwei Nachkommastellen.';
      }
    }

    if (values.amount === 'custom' && !values.customAmount) {
      errors.customAmount = 'Muss eine Zahl sein';
    }

    if (values.amount === 'custom' && values.customAmount < 2) {
      errors.customAmount = 'Bitte gib einen Betrag von mindestens 2€ ein.';
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
      {/* Spendenturnus */}
      {!hasDonated && !donationError && (
        <div className={s.donationIntervalSelection}>
          <p className={s.hint}>
            Hinweis: Du bekommst eine Spendenbescheinigung über den gesamten
            Jahresbetrag. Du kannst deine Spende jederzeit wieder beenden.
          </p>
          <h3>Wie möchtest du spenden?</h3>
          <div className={s.selectionContainer}>
            <div
              aria-hidden="true"
              className={cN(s.selectionElement, {
                [s.selectionElementActive]: donationInterval === 'jährlich',
              })}
              onClick={() => {
                setDonationInverval('jährlich');
              }}
            >
              Jährlich
            </div>
            <div
              aria-hidden="true"
              className={cN(s.selectionElement, {
                [s.selectionElementActive]: donationInterval === 'monatlich',
              })}
              onClick={() => {
                setDonationInverval('monatlich');
              }}
            >
              Monatlich
            </div>
            <div
              aria-hidden="true"
              className={cN(s.selectionElement, {
                [s.selectionElementActive]: donationInterval === 'einmalig',
              })}
              onClick={() => {
                setDonationInverval('einmalig');
              }}
            >
              Einmalig
            </div>
          </div>
        </div>
      )}

      {!hasDonated &&
        !enteredPaymentInfo &&
        !donationError &&
        donationInterval && (
          <>
            <Form
              onSubmit={data => {
                const {
                  customAmount,
                  amount,
                  privacy,
                  sepa,
                  ...inputData
                } = data;

                const donation = {
                  ...inputData,
                  amount: +customAmount,
                  recurring: donationInterval !== 'einmalig',
                  yearly: donationInterval === 'jährlich',
                  iban: formData.extractedIban,
                };
                const donationInfo = { donation };
                setTempEmail(data.email);
                setInitialValues(data);
                setDonationInfo(donationInfo);
                setEnteredPaymentInfo(true);
              }}
              initialValues={initialValues}
              validate={values => validate(values, !isAuthenticated)}
              render={({ handleSubmit }) => {
                return (
                  <FormWrapper>
                    <form onSubmit={handleSubmit}>
                      {enteredAmount === false && (
                        <div className={s.partialForm}>
                          <h3>Betrag eingeben</h3>
                          <FormSection>
                            <div className={s.customAmount}>
                              <Field
                                name="customAmount"
                                placeholder="100"
                                type="number"
                                component={TextInputWrapped}
                                min={2}
                                inputMode="numeric"
                                step="1"
                                pattern="[0-9]*"
                                theme="christmas"
                              />{' '}
                              <span className={s.currency}>€</span>
                            </div>
                          </FormSection>

                          {/* Zahlungsart auswählen */}
                          <div className={s.donationIntervalSelection}>
                            <h3>Zahlungsart wählen</h3>
                            <div className={s.selectionContainer}>
                              <div
                                aria-hidden="true"
                                className={cN(s.selectionElement, {
                                  [s.selectionElementActive]:
                                    paymentType === 'Lastschrift',
                                })}
                                onClick={() => {
                                  setPaymentType('Lastschrift');
                                  saveDonationPledge();
                                }}
                              >
                                Lastschrift
                              </div>
                              <div
                                aria-hidden="true"
                                className={cN(s.selectionElement, {
                                  [s.selectionElementActive]:
                                    paymentType === 'Überweisung',
                                })}
                                onClick={() => {
                                  setPaymentType('Überweisung');
                                  saveDonationPledge();
                                }}
                              >
                                Überweisung
                              </div>
                              <div
                                aria-hidden="true"
                                className={cN(s.selectionElement, {
                                  [s.selectionElementActive]:
                                    paymentType === 'PayPal',
                                })}
                                onClick={() => {
                                  setPaymentType('PayPal');
                                  saveDonationPledge();
                                }}
                              >
                                PayPal
                              </div>
                              <div
                                aria-hidden="true"
                                className={cN(s.selectionElement, {
                                  [s.selectionElementActive]:
                                    paymentType === 'Kreditkarte',
                                })}
                                onClick={() => {
                                  setPaymentType('Kreditkarte');
                                  saveDonationPledge();
                                }}
                              >
                                Kreditkarte
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Lastschrift */}
                      {paymentType === 'Lastschrift' && (
                        <div>
                          <h3>
                            Bitte gib deine &#8203;Zahlungs&shy;informationen
                            ein
                          </h3>
                          <p>
                            Du möchtest{' '}
                            <span className={s.info}>
                              {donationInterval}{' '}
                              {getFormDataAmount(formData.customAmount)} €
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
                              theme="christmas"
                            />
                            <Field
                              name="lastName"
                              label="Nachname"
                              placeholder="Nachname"
                              type="text"
                              component={TextInputWrapped}
                              theme="christmas"
                            />
                            {!isAuthenticated && (
                              <Field
                                name="email"
                                label="E-Mail"
                                placeholder="E-Mail-Adresse"
                                type="text"
                                component={TextInputWrapped}
                                theme="christmas"
                              />
                            )}
                            {isAuthenticated && (
                              <p>E-Mail Adresse: {userData.email}</p>
                            )}
                            <p className={s.hint}>
                              Hinweis: Wir schicken deine Spendenbestätigung an
                              diese Adresse.
                            </p>
                            <Field
                              name="iban"
                              label="IBAN"
                              placeholder="IBAN"
                              type="text"
                              component={TextInputWrapped}
                              theme="christmas"
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
                              theme="christmas"
                            ></Field>
                            <Overlay
                              isOpen={isOverlayOpen}
                              toggleOverlay={toggleOverlay}
                              title="SEPA-Mandat"
                              theme="christmas"
                            >
                              <p>
                                Ich ermächtige Vertrauensgesellschaft e.V.
                                (Gläubiger-Identifikationsnummer:
                                DE80ZZZ00002240199), Zahlungen von meinem Konto
                                mittels Lastschrift einzuziehen. Zugleich weise
                                ich mein Kreditinstitut an, die von
                                Vertrauensgesellschaft e.V. auf mein Konto
                                gezogenen Lastschriften einzulösen.
                              </p>
                              <p>
                                Widerrufsrecht: Ich kann innerhalb von acht
                                Wochen, beginnend mit dem Belastungsdatum, die
                                Erstattung des belasteten Betrages verlangen. Es
                                gelten dabei die mit meinem Kreditinstitut
                                vereinbarten Bedingungen.
                              </p>
                              <p>
                                Vertrauensgesellschaft e.V., Isarstrasse 11,
                                12053 Berlin <br />
                                Gläubiger-Identifikationsnummer:
                                DE80ZZZ00002240199
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
                              theme="christmas"
                            ></Field>

                            <div className={s.donationButtons}>
                              <CTAButton
                                type="submit"
                                onClick={() => {
                                  onAmountClick(true);
                                }}
                                size="MEDIUM"
                                className={s.primaryButton}
                              >
                                Spenden
                              </CTAButton>
                            </div>
                          </FormSection>
                        </div>
                      )}

                      {/* Überweisung */}
                      {paymentType === 'Überweisung' && (
                        <div>
                          <h3>Per Überweisung spenden</h3>
                          <p>
                            Bitte überweise deine Spende direkt auf folgendes
                            Konto:
                          </p>

                          <p className={s.emphasis}>
                            Vertrauensgesellschaft e.V. <br></br>
                            IBAN: DE74 4306 0967 1218 1056 01
                          </p>

                          <p>Danke für deine Spende!</p>
                          <h3>Charity-SMS</h3>
                          <p>
                            Du kannst unsere Arbeit auch mit 5€ oder 10€ per SMS
                            unterstützen.
                          </p>
                          <p>
                            Sende dazu das Kennwort{' '}
                            <span className={s.emphasis}>expedition5</span> oder{' '}
                            <span className={s.emphasis}>expedition10</span> an
                            die <span className={s.emphasis}>81190</span>.
                          </p>
                          <p>
                            Expedition Grundeinkommen erhält davon 4,83 € bzw.
                            9,83 €.
                          </p>
                        </div>
                      )}
                    </form>
                  </FormWrapper>
                );
              }}
            ></Form>

            {/* Paypal & Kreditkarte */}
            {(paymentType === 'PayPal' || paymentType === 'Kreditkarte') && (
              <div>
                <p>
                  Info: Deine Zahlung wird über PayPal abgewickelt. Bitte gib
                  den Betrag dort erneut an.
                </p>
                <p>Für uns fällt dabei eine kleine Gebühr an.</p>
                <form
                  action="https://www.paypal.com/donate"
                  method="post"
                  target="_blank"
                >
                  <input
                    type="hidden"
                    aria-hidden="true"
                    aria-label="button-ID"
                    name="hosted_button_id"
                    value="M9PSVU6E4RUJ8"
                  />
                  <input
                    type="hidden"
                    aria-hidden="true"
                    aria-label="amount"
                    name="amount"
                    value={+initialValues.customAmount}
                  />
                  <Button name="submit">Weiter zu Papyal</Button>
                </form>
              </div>
            )}
          </>
        )}

      {!hasDonated &&
        enteredPaymentInfo &&
        !waitingForApi &&
        !donationError &&
        !needsToLogin && (
          <div>
            <h3>Bitte überprüfe deine Daten</h3>

            <p>
              Name:{' '}
              <span className={s.info}>
                {donationInfo.donation.firstName}{' '}
                {donationInfo.donation.lastName}
              </span>
            </p>
            <p>
              E-Mail:{' '}
              <span className={s.info}>{donationInfo.donation.email}</span>
              {isAuthenticated && <span>{userData.email}</span>}
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
                  if (isAuthenticated) {
                    updateUser(donationInfo);
                  } else {
                    setNeedsToLogin(true);
                    signUp({ email: tempEmail });
                  }
                }}
                size="MEDIUM"
              >
                Jetzt spenden
              </CTAButton>
            </PrimarySecondaryButtonContainer>
          </div>
        )}

      {!hasDonated &&
        enteredPaymentInfo &&
        !waitingForApi &&
        !donationError &&
        needsToLogin && (
          <div>
            <div className={s.adjustFinallyMessage}>
              <EnterLoginCode
                buttonText={'Spende bestätigen'}
                preventSignIn={true}
                onAnswerChallengeSuccess={onAnswerChallengeSuccess}
              />
            </div>
            <p>
              Mit dem Klick auf "Spende bestätigen" bestätigst du, dass du{' '}
              <span className={s.info}>
                {isRecurring ? 'monatlich' : 'einmalig'}{' '}
                {donationInfo.donation.customAmount} €
              </span>{' '}
              an die Expedition spenden möchtest.
            </p>
          </div>
        )}

      {waitingForApi && (
        <FinallyMessage
          className={s.adjustFinallyMessage}
          preventScrolling="true"
          state="progress"
        >
          Sichere Datenübertragung, bitte einen Moment Geduld...
        </FinallyMessage>
      )}

      {hasDonated && !donationError && (
        <div>
          <h2>Vielen Dank!</h2>
          <p>
            Wir haben deine Daten erhalten und werden die Spende in Kürze von
            deinem Konto einziehen.
          </p>
          <p>Vielen Dank, dass du die Expedition unterstützt! </p>
          <CTAButtonContainer className={s.buttonContainer}>
            <CTALink to="/">Zur Startseite</CTALink>
          </CTAButtonContainer>

          <Confetti></Confetti>
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

// const Condition = ({ when, is, children }) => (
//   <Field name={when} subscription={{ value: true }}>
//     {({ input: { value } }) => (value === is ? children : null)}
//   </Field>
// );
