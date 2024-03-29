import React, { useState, useEffect, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail, validatePhoneNumber } from '../../utils';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { Checkbox } from '../Checkbox';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import SignUpFeedbackMessage from '../SignUpFeedbackMessage';
import { useSignUp } from '../../../hooks/Authentication';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';
import AuthContext from '../../../context/Authentication';
import { EnterLoginCode } from '../../Login/EnterLoginCode';
// import AuthInfo from '../../AuthInfo';
// import { FinallyMessage } from '../FinallyMessage';
import { MunicipalityContext } from '../../../context/Municipality';
import { SearchPlaces } from '../SearchPlaces';
import { navigate } from 'gatsby';
import { Modal } from '../../Modal';
import * as s from './style.module.less';

const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

// Not needed at the moment
/* const AuthenticatedDialogDefault = () => {
  return (
    <FinallyMessage preventScrolling={true}>
      <p>
        Klasse, du hast dich bereits angemeldet. Wir informieren dich über alles
        Weitere.
      </p>
      <p>
        <AuthInfo />
      </p>
    </FinallyMessage>
  );
}; */

export default ({
  initialValues,
  postSignupAction,
  illustration = 'POINT_LEFT',
  fieldsToRender,
  // This can be used to overwrite fields which would usually not be mandatory
  overwriteMandatoryFields = [],
  // This can be used to not render a specific field if user already has attribute
  fieldsToHideIfValueExists = [],
  // Data which should be saved during creation o fuser
  additionalData,
  showHeading = true,
  smallFormMargin = false,
  loginCodeInModal = false,
}) => {
  const [signUpState, userExists, signUp, setSignUpState] = useSignUp();
  const [updateUserState, updateUser] = useUpdateUser();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    isAuthenticated,
    userId,
    customUserData: userData,
    updateCustomUserData,
  } = useContext(AuthContext);
  const [formData, setFormData] = useState();

  const { municipality } = useContext(MunicipalityContext);
  const [municipalityInForm, setMunicipalityInForm] = useState(municipality);
  const [showModal, setShowModal] = useState(true);

  let prefilledZip;

  if (municipalityInForm?.zipCodes?.length === 1) {
    prefilledZip = municipalityInForm?.zipCodes[0];
  } else if (userData?.zipCode) {
    prefilledZip = userData.zipCode;
  } else {
    prefilledZip = '';
  }

  // After signup process is successful, do post signup
  useEffect(() => {
    if (hasSubmitted && isAuthenticated && userId) {
      // If user already existed we don't want to execute
      // postSignupAction here, but after user is updated
      if (userExists === false && postSignupAction) {
        postSignupAction();
      }

      if (updateUserState === 'updated') {
        updateCustomUserData();

        if (postSignupAction) {
          postSignupAction();
        }
      }

      // Now set municipality in context
      if (municipalityInForm) {
        navigate(`/orte/${municipalityInForm.slug}`);
      }
    }
  }, [hasSubmitted, isAuthenticated, userId, updateUserState]);

  useEffect(() => {
    // If user signs in from form and already existed
    if (
      isAuthenticated &&
      hasSubmitted &&
      formData &&
      userId &&
      userExists !== false
    ) {
      updateUser({
        // TODO: check if we need to add ags here at all
        ags: municipalityInForm?.ags,
        updatedOnXbge: true,
        ...formData,
      });
      setSignUpState('signedIn');
    }
    // If user signs out after signing in
    if (!isAuthenticated && signUpState === 'signedIn') {
      setSignUpState(undefined);
    }
  }, [isAuthenticated, hasSubmitted, formData, userId]);

  if (signUpState === 'success') {
    if (loginCodeInModal) {
      return (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className={s.modalContent}>
            <EnterLoginCode
              preventSignIn={true}
              color={IS_BERLIN_PROJECT ? 'roseOnWhite' : 'white'}
            />
          </div>
        </Modal>
      );
    }

    return <EnterLoginCode preventSignIn={true} />;
  }

  // It is maybe not ideal to show the loading state even though
  // updateUserState is saved, but otherwise the form would be shown
  // again before unmounting
  if (
    signUpState === 'loading' ||
    signUpState === 'error' ||
    updateUserState === 'loading' ||
    updateUserState === 'updated' ||
    updateUserState === 'error'
  ) {
    return (
      <>
        <SignUpFeedbackMessage
          state={
            signUpState === 'error' || updateUserState === 'error'
              ? 'error'
              : 'loading'
          }
          trackingId={'sign-up'}
          trackingCategory="SignUp"
        />
      </>
    );
  }

  // Not needed for now since we want to just the sign up form
  // even for signed in users
  // if (isAuthenticated || userId) {
  //   if (showSignedInMessage) {
  //     return <AuthenticatedDialogDefault />;
  //   } else {
  //     return null;
  //   }
  // }

  const handlePlaceSelect = newMunicipality => {
    setMunicipalityInForm(newMunicipality);
  };

  let fields = [
    'email',
    'username',
    'municipality',
    'zipCode',
    'nudgeBox',
    'newsletterConsent',
  ];
  if (fieldsToRender) {
    fields = fieldsToRender;
  }
  const fieldData = {
    email: {
      name: 'email',
      label: 'E-mail',
      description: 'Pflichtfeld',
      placeholder: 'E-Mail',
      type: 'email',
      disabled: isAuthenticated,
      component: TextInputWrapped,
      hide: fieldsToHideIfValueExists.includes('email') && userData?.email,
    },
    username: {
      name: 'username',
      label: 'Name',
      description:
        overwriteMandatoryFields.includes('username') && 'Pflichtfeld',
      placeholder: 'Wie wirst du genannt?',
      type: 'text',
      component: TextInputWrapped,
      hide:
        fieldsToHideIfValueExists.includes('username') && userData?.username,
    },
    municipality: {
      name: 'municipality',
      label: 'Ort',
      placeholder: 'Stadt / Gemeinde',
      type: 'text',
      component: SearchPlaces,
      onPlaceSelect: handlePlaceSelect,
      initialPlace: municipality || {},
      isInsideForm: true,
      hide:
        fieldsToHideIfValueExists.includes('municipality') &&
        userData?.municipalities,
    },
    zipCode: {
      name: 'zipCode',
      label: 'Postleitzahl',
      description:
        overwriteMandatoryFields.includes('zipCode') && 'Pflichtfeld',
      placeholder: '12345',
      type: 'number',
      component: TextInputWrapped,
      hide: fieldsToHideIfValueExists.includes('zipCode') && userData?.zipCode,
    },
    phoneNumber: {
      name: 'phoneNumber',
      label: 'Telefonnummer',
      description:
        overwriteMandatoryFields.includes('phoneNumber') && 'Pflichtfeld',
      placeholder: 'Telefonnummer',
      type: 'text',
      component: TextInputWrapped,
      hide:
        fieldsToHideIfValueExists.includes('phoneNumber') &&
        userData?.phoneNumber,
    },
    question: {
      name: 'question',
      label: 'Hast du Fragen oder Kommentare?',
      description:
        overwriteMandatoryFields.includes('question') && 'Pflichtfeld',
      placeholder: 'Hier ist Platz für deine Fragen, Anregungen, Ideen',
      type: 'textarea',
      component: TextInputWrapped,
    },
    nudgeBox: {
      name: 'nudgeBox',
      label: getNudgeBoxLabel(municipalityInForm),
      type: 'checkbox',
      component: Checkbox,
    },
    newsletterConsent: {
      name: 'newsletterConsent',
      label: 'Haltet mich über die nächsten Schritte auf dem Laufenden.',
      type: 'checkbox',
      component: Checkbox,
      // In comparison to the other fields this one should only be hidden if newsletter consent is true
      hide:
        fieldsToHideIfValueExists.includes('newsletterConsent') &&
        userData?.newsletterConsent?.value,
    },
  };

  return (
    <>
      {showHeading && (
        <>
          <h3 aria-label="Anmeldeformular">Willkommen bei der Expedition!</h3>
          <br />
        </>
      )}
      <Form
        onSubmit={e => {
          e.ags = municipalityInForm?.ags;
          if (!e.newsletterConsent && fields.includes('newsletterConsent')) {
            e.newsletterConsent = false;
          }

          // We don't want to send empty strings
          if (e.username === '') {
            delete e.username;
          }

          if (e.zipCode === '') {
            delete e.zipCode;
          }

          if (e.phoneNumber === '') {
            delete e.phoneNumber;
          }

          if (e.question === '') {
            delete e.question;
          }

          if (additionalData) {
            // Add question to wantsToCollect object if it was passed via prop
            if (additionalData.wantsToCollect && e.question) {
              additionalData.wantsToCollect.question = e.question;
            }

            e = { ...e, ...additionalData };
          }

          setHasSubmitted(true);
          setFormData(e);

          if (!isAuthenticated) {
            signUp(e);
          }
        }}
        initialValues={{
          ...initialValues,
          email: (isAuthenticated && userData?.email) || '',
          zipCode: fields.includes('zipCode') ? prefilledZip : '',
          username: fields.includes('username') ? userData?.username : '',
          phoneNumber: fields.includes('phoneNumber')
            ? userData?.phoneNumber
            : '',
        }}
        validate={values =>
          validate(values, municipalityInForm, fields, overwriteMandatoryFields)
        }
        keepDirtyOnReinitialize={true}
        render={({ handleSubmit }) => {
          return (
            <FormWrapper>
              <form onSubmit={handleSubmit}>
                <FormSection smallMargin={smallFormMargin}>
                  {fields.map((field, i) => {
                    return (
                      <Field key={`form-field-${i}`} {...fieldData[field]} />
                    );
                  })}
                </FormSection>

                <CTAButtonContainer>
                  <CTAButton type="submit" aria-label="Jetzt anmelden">
                    Ich bin dabei
                  </CTAButton>
                </CTAButtonContainer>
              </form>
            </FormWrapper>
          );
        }}
      ></Form>
    </>
  );
};

const validate = (
  values,
  municipalityInForm,
  fields,
  overwriteMandatoryFields
) => {
  const errors = {};

  if (values.email && values.email.includes('+')) {
    errors.email = 'Zurzeit unterstützen wir kein + in E-Mails';
  }

  if (values.email && !validateEmail(values.email)) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  if (!values.email) {
    errors.email = 'Wir benötigen eine valide E-Mail Adresse';
  }

  if (values.phoneNumber && !validatePhoneNumber(values.phoneNumber)) {
    errors.phoneNumber = 'Wir benötigen eine valide Telefonnummer.';
  }

  // If fields do not include  consent, we don't need to validate
  if (
    fields.includes('newsletterConsent') &&
    !values.nudgeBox &&
    !values.newsletterConsent
  ) {
    errors.newsletterConsent = 'Bitte bestätige, dass du dabei sein willst';
  }

  // If fields do not include municipality, we don't need to validate
  if (fields.includes('municipality') && !municipalityInForm) {
    errors.newsletterConsent = 'Bitte wähle einen Ort aus.';
  }

  if (
    fields.includes('username') &&
    overwriteMandatoryFields.includes('username') &&
    !values.username
  ) {
    errors.username = 'Wir benötigen einen Namen.';
  }

  if (
    fields.includes('zipCode') &&
    overwriteMandatoryFields.includes('zipCode') &&
    !values.zipCode
  ) {
    errors.zipCode = 'Wir benötigen eine Postleitzahl.';
  }

  if (
    fields.includes('phoneNumber') &&
    overwriteMandatoryFields.includes('phoneNumber') &&
    !values.phoneNumber
  ) {
    errors.phoneNumber = 'Wir benötigen eine Telefonnummer.';
  }

  if (
    fields.includes('question') &&
    overwriteMandatoryFields.includes('question') &&
    !values.question
  ) {
    errors.question = 'Bitte fülle das Feld aus.';
  }

  return errors;
};

// For the existing campaigns we want different labels
const getNudgeBoxLabel = municipality => {
  // Berlin
  if (municipality?.ags === '11000000') {
    return 'Ja, ich will, dass Berlin an dem Modellversuch teilnimmt.';
  }

  // Hamburg
  if (municipality?.ags === '02000000') {
    return 'Ja, ich will, dass Hamburg an dem Modellversuch teilnimmt.';
  }

  // Bremen
  if (municipality?.ags === '04011000') {
    return 'Ja, ich will, dass Bremen an dem Modellversuch teilnimmt.';
  }

  return 'Ja, ich will, dass das Bürgerbegehren startet.';
};
