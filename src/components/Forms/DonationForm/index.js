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
import { CTAButtonContainer, CTAButton, CTALink } from '../../Layout/CTAButton';

import { TextInputWrapped } from '../TextInput';
import AuthContext from '../../../context/Authentication';
import { useSignUp } from '../../../hooks/Authentication';

import { EnterLoginCode } from '../../Login/EnterLoginCode';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';
import { Overlay } from '../../Overlay';
import Link from 'gatsby-link';

import s from './style.module.less';
import cN from 'classnames';
import { FinallyMessage } from '../FinallyMessage';
import Confetti from '../../Confetti';
import { validateEmail } from '../../utils';

export default theme => {
  var themeClass = theme[Object.keys(theme)[0]];
  const isChristmas = themeClass === 'christmas';

  const {
    isAuthenticated,
    tempEmail,
    setTempEmail,
    customUserData: userData,
  } = useContext(AuthContext);
  const [signUp] = useSignUp();
  const [isRecurring, setIsRecurring] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState(false);
  const [enteredPaymentInfo, setEnteredPaymentInfo] = useState(false);
  const [needsToLogin, setNeedsToLogin] = useState(false);
  const [waitingForApi, setWaitingForApi] = useState(false);
  const [hasDonated, setHasDonated] = useState(false);
  const [donationError, setDonationError] = useState(false);
  const [updateUserState, updateUser] = useUpdateUser();
  const [donationInfo, setDonationInfo] = useState({});
  const [initialValues, setInitialValues] = useState(
    !isChristmas ? { amount: '6' } : { amount: '50' }
  );
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
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

  const onAmountClick = recurring => {
    setIsRecurring(recurring);

    if (formErrors.amount) {
      return;
    }
    if (formErrors.customAmount) {
      return;
    }
    if (isChristmas && formErrors.certificateReceiver) {
      return;
    }
    if (isChristmas && formErrors.certificateGiver) {
      return;
    }
    setEnteredAmount(true);
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

  const getFormDataAmount = (amount, customAmount) => {
    return amount === 'custom' && customAmount ? +customAmount : +amount;
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

    if (!values.amount) {
      errors.customAmount = 'Bitte wähle einen Betrag aus.';
    }

    if (values.customAmount) {
      const decimalPlacesRegex = /(?<=,|\.).*$/;
      const decimalPlaces = values.customAmount.match(decimalPlacesRegex);
      if (decimalPlaces && decimalPlaces[0].length > 2) {
        errors.customAmount = 'Bitte nur zwei Nachkommastellen.';
      }
    }

    if (values.amount === 'custom' && !values.customAmount) {
      errors.customAmount = 'Muss ausgefüllt sein';
    }

    if (!isChristmas && values.amount === 'custom' && values.customAmount < 2) {
      errors.customAmount = 'Bitte gib einen Betrag von mindestens 2€ ein.';
    }

    if (isChristmas && values.amount === 'custom' && values.customAmount < 10) {
      errors.customAmount = 'Bitte gib einen Betrag von mindestens 10€ ein.';
    }

    if (!values.firstName) {
      errors.firstName = 'Muss ausgefüllt sein';
    }

    if (!values.lastName) {
      errors.lastName = 'Muss ausgefüllt sein';
    }

    if (isChristmas && !values.certificateReceiver) {
      errors.certificateReceiver =
        'Bitte such einen Namen aus, der auf der Urkunde stehen soll.';
    }

    if (isChristmas && !values.certificateGiver) {
      errors.certificateGiver =
        'Bitte such einen Namen aus, der auf der Urkunde stehen soll.';
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
    <div
      className={cN(s.donationForm, {
        [s.christmasTheme]: themeClass === 'christmas',
      })}
    >
      {!hasDonated && !enteredPaymentInfo && !donationError && (
        <Form
          onSubmit={data => {
            const { customAmount, amount, privacy, sepa, ...inputData } = data;
            const finalAmount =
              amount === 'custom' && customAmount ? +customAmount : +amount;

            const donation = {
              ...inputData,
              amount: finalAmount,
              recurring: isRecurring,
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
                      <FormSection>
                        {!isChristmas && (
                          <>
                            <Field
                              name="amount"
                              label="3€"
                              component={RadioButton}
                              type="radio"
                              value="3"
                            />{' '}
                            <Field
                              name="amount"
                              label="6€"
                              component={RadioButton}
                              type="radio"
                              value="6"
                            />{' '}
                            <Field
                              name="amount"
                              label="12€"
                              component={RadioButton}
                              type="radio"
                              value="12"
                            />{' '}
                          </>
                        )}
                        {isChristmas && (
                          <>
                            <Field
                              name="amount"
                              label="20€"
                              component={RadioButton}
                              type="radio"
                              value="20"
                            />{' '}
                            <Field
                              name="amount"
                              label="50€"
                              component={RadioButton}
                              type="radio"
                              value="50"
                            />{' '}
                            <Field
                              name="amount"
                              label="100€"
                              component={RadioButton}
                              type="radio"
                              value="100"
                            />{' '}
                          </>
                        )}
                        <Field
                          name="amount"
                          label="Eigenen Betrag eingeben"
                          component={RadioButton}
                          type="radio"
                          value="custom"
                          theme="christmas"
                        />{' '}
                        <Condition when="amount" is="custom">
                          <div className={s.customAmount}>
                            <Field
                              name="customAmount"
                              placeholder="100"
                              type="number"
                              component={TextInputWrapped}
                              min={isChristmas ? 10 : 2}
                              inputMode="numeric"
                              step="1"
                              pattern="[0-9]*"
                              theme="christmas"
                            />{' '}
                            <span className={s.currency}>€</span>
                          </div>
                        </Condition>
                        {isChristmas && (
                          <section className={s.certificateInfo}>
                            <Field
                              name="certificateReceiver"
                              label="Wie heißt die Person, die du beschenken möchtest?"
                              placeholder="Name"
                              type="text"
                              component={TextInputWrapped}
                              theme="christmas"
                            />
                            <p className={s.hint}>
                              Hinweis: Du erhältst eine personalisierte
                              Weihnachtskarte mit dem Namen der beschenkten
                              Person von uns.
                            </p>
                            <Field
                              name="certificateGiver"
                              label="Mit welchem Namen soll die Weihnachtskarte unterschrieben sein?"
                              placeholder="Name"
                              type="text"
                              component={TextInputWrapped}
                              theme="christmas"
                            />
                          </section>
                        )}
                      </FormSection>

                      {!isChristmas && (
                        <div className={s.donationButtons}>
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

                          <Link
                            to="/spenden"
                            className={cN(s.link, s.secondaryLink)}
                          >
                            Lieber einmalig spenden
                          </Link>

                          <p className={s.hint}>
                            Hinweis: Du kannst deine monatliche Spende jederzeit
                            wieder beenden.
                          </p>
                        </div>
                      )}

                      {isChristmas && (
                        <div className={s.donationButtons}>
                          <CTAButton
                            type="submit"
                            onClick={() => {
                              onAmountClick(false);
                            }}
                            size="MEDIUM"
                            className={s.primaryButton}
                          >
                            Spende verschenken
                          </CTAButton>
                        </div>
                      )}
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
                            mittels Lastschrift einzuziehen. Zugleich weise ich
                            mein Kreditinstitut an, die von
                            Vertrauensgesellschaft e.V. auf mein Konto gezogenen
                            Lastschriften einzulösen.
                          </p>
                          <p>
                            Widerrufsrecht: Ich kann innerhalb von acht Wochen,
                            beginnend mit dem Belastungsdatum, die Erstattung
                            des belasteten Betrages verlangen. Es gelten dabei
                            die mit meinem Kreditinstitut vereinbarten
                            Bedingungen.
                          </p>
                          <p>
                            Vertrauensgesellschaft e.V., Isarstrasse 11, 12053
                            Berlin <br />
                            Gläubiger-Identifikationsnummer: DE80ZZZ00002240199
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
            {/* {isAuthenticated && (
              <>
                <h3>Vielen Dank!</h3>
                <p>Du hast dich eingeloggt. Super!</p>
              </>
            )} */}
            <p>
              Mit dem Klick auf "Spende bestätigen" bestätigst du, dass du{' '}
              <span className={s.info}>
                {isRecurring ? 'monatlich' : 'einmalig'}{' '}
                {donationInfo.donation.amount} €
              </span>{' '}
              an die Expedition spenden möchtest.
            </p>
            {/* <CTAButtonContainer className={s.buttonContainer}>
              <CTAButton
                onClick={() => {
                  setIsRecurring(false);
                  setEnteredAmount(false);
                  setEnteredPaymentInfo(false);
                  setHasDonated(false);
                  setNeedsToLogin(false)
                }}
                size="MEDIUM"
              >
                Zurück zum Formular
              </CTAButton>
            </CTAButtonContainer> */}
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
          <h3>Vielen Dank!</h3>
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

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);
