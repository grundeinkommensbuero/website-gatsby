import React, { useState, useEffect, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
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
import AuthInfo from '../../AuthInfo';
import { FinallyMessage } from '../FinallyMessage';
import { SearchPlaces } from '../SearchPlaces';


const AuthenticatedDialogDefault = () => {
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
};

const AuthenticatedDialogMunicipality = ({
  customUserData,
  municipality,
  setMunicipality,
  updateUser,
  setHasSubmittedMunicipality,
}) => {
  const isSpecificMunicipality = municipality && municipality.ags;
  const { username } = customUserData;
  return (
    <FinallyMessage preventScrolling={true}>
      <div>
        <p>Du bist angemeldet als {username}.</p>
        {isSpecificMunicipality && (
          <p>Möchtest du die Expedtion in {municipality.name} unterstützen?</p>
        )}
        {!isSpecificMunicipality && (
          <p>
            Möchtest du die Expedtion in deiner Stadt oder Gemeinde
            unterstützen?
          </p>
        )}
        <Form
          onSubmit={e => {
            let ags = municipality.ags;
            if (e.municipality) {
              ags = municipality.ags;
            }
            const { isEngaged } = e;
            const engagement = { ags, isEngaged };
            const user = { ...customUserData, engagement };

            // TODO: Once implemented
            // Update User
            // updateUser(user);
            // if (! userExists) {
            //  Signup(user)
            // }
            // Feedback
            setHasSubmittedMunicipality(true);
          }}
          // initialValues={}
          render={({ handleSubmit }) => {
            return (
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  <FormSection>
                    {' '}
                    {isSpecificMunicipality && (
                      <Field
                        name="isEngaged"
                        label={
                          <>
                            Ja, und ich möchte zusätzliche beim Organizing
                            helfen!
                          </>
                        }
                        type="checkbox"
                        component={Checkbox}
                      ></Field>
                    )}
                    {!isSpecificMunicipality && (
                      <SearchPlaces
                        validateOnBlur={true}
                        onPlaceSelect={municipality => {
                          if (municipality) {
                            setMunicipality(municipality);
                          }
                        }}
                      />
                    )}
                  </FormSection>

                  <CTAButtonContainer>
                    <CTAButton type="submit">Ich bin dabei</CTAButton>
                  </CTAButtonContainer>
                </form>
              </FormWrapper>
            );
          }}
        ></Form>
      </div>
    </FinallyMessage>
  );
};

export default ({
  initialValues,
  fieldsToRender,
  postSignupAction,
  illustration = 'POINT_LEFT',
  forMunicipality,
}) => {
  const [signUpState, userExists, signUp, setSignUpState] = useSignUp();
  const [, updateUser] = useUpdateUser();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { isAuthenticated, userId, customUserData } = useContext(AuthContext);
  const [municipality, setMunicipality] = useState(forMunicipality);
  const [hasSubmittedMunicipality, setHasSubmittedMunicipality] = useState(
    false
  );

  const isForMunicipality = !!forMunicipality;
  let fields = ['email', 'username', 'zipCode', 'city'];
  if (isForMunicipality) {
    fields = ['username', 'email'];
  }
  if (isForMunicipality && !municipality.ags) {
    fields = ['username', 'email', 'municipality'];
  }
  if (fieldsToRender) {
    fields = fieldsToRender;
  }
  // After signup process is successful, do post signup
  useEffect(() => {
    if (hasSubmitted && isAuthenticated && userId) {
      if (postSignupAction) {
        postSignupAction();
      }
    }
  }, [hasSubmitted, isAuthenticated, userId]);

  useEffect(() => {
    // If user signs in from form
    if (isAuthenticated && hasSubmitted) {
      updateUser({
        updatedOnXbge: true,
      });
      setSignUpState('signedIn');
    }
    // If user signs out after signing in
    if (!isAuthenticated && signUpState === 'signedIn') {
      setSignUpState(undefined);
    }
  }, [isAuthenticated, hasSubmitted]);

  // TODO: Once implemented:
  // const userEngagement = customUserData.engagement.find(
  //   e => e.ags === municipality.ags
  // );
  // if (userEngagement) {
  //   return (
  //     <FinallyMessage>
  //       Du bist schon angemeldet für {municipality.name}.{' '}
  //       {userEngagement.isEngaged && (
  //         <span>Danke, dass du uns hier auch als Organizerin unterstützt!</span>
  //       )}
  //     </FinallyMessage>
  //   );
  // }

  if (hasSubmittedMunicipality) {
    return (
      <FinallyMessage>
        Danke, dass du mit uns die Expedition in {municipality.name}{' '}
        voranbringst!
      </FinallyMessage>
    );
  }

  if (signUpState === 'success') {
    return <EnterLoginCode preventSignIn={true} />;
  }

  if (signUpState) {
    return (
      <>
        <SignUpFeedbackMessage
          state={
            signUpState === 'signedIn' && !userExists ? 'success' : signUpState
          }
          trackingId={'sign-up'}
          trackingCategory="SignUp"
        />
        {isForMunicipality && customUserData && (
          <AuthenticatedDialogMunicipality
            customUserData={customUserData}
            municipality={municipality}
            setMunicipality={setMunicipality}
            updateUser={updateUser}
            setHasSubmittedMunicipality={setHasSubmittedMunicipality}
          />
        )}
      </>
    );
  }

  if (isAuthenticated || userId) {
    if (isForMunicipality && customUserData) {
      return (
        <AuthenticatedDialogMunicipality
          customUserData={customUserData}
          municipality={municipality}
          setMunicipality={setMunicipality}
          updateUser={updateUser}
          setHasSubmittedMunicipality={setHasSubmittedMunicipality}
        />
      );
    }
    return <AuthenticatedDialogDefault />;
  }

  const onPlaceSelect = municipality => {
    setMunicipality(municipality);
  };

  const fieldData = {
    email: {
      name: 'email',
      label: 'E-mail',
      description: 'Pflichtfeld',
      placeholder: 'E-Mail',
      type: 'email',
      component: TextInputWrapped,
    },
    username: {
      name: 'username',
      label: 'Vorname',
      placeholder: 'Vorname',
      type: 'text',
      component: TextInputWrapped,
    },
    zipCode: {
      name: 'zipCode',
      label: 'Postleitzahl',
      placeholder: '12345',
      type: 'number',
      component: TextInputWrapped,
    },
    city: {
      name: 'city',
      label: 'Ort',
      placeholder: 'Stadt / Dorf',
      type: 'text',
      component: TextInputWrapped,
    },
    municipality: {
      name: 'municipality',
      label: 'Gemeinde',
      placeholder: 'Stadt / Dorf',
      type: 'text',
      component: () => <SearchPlaces validateOnBlur={true} />,
      onPlaceSelect: onPlaceSelect,
    },
  };

  return (
    <Form
      onSubmit={e => {
        if (e.municipality) {
          e.ags = municipality.ags;
        }
        e.privacyConsent = true;
        e.newsletterConsent = true;
        setHasSubmitted(true);
        if (!isAuthenticated) {
          signUp(e);
        }
      }}
      initialValues={initialValues}
      validate={values => validate(values, isAuthenticated)}
      render={({ handleSubmit }) => {
        return (
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <FormSection>
                {fields.map((field, i) => {
                  return (
                    <Field key={`form-field-${i}`} {...fieldData[field]} />
                  );
                })}
              </FormSection>

              <CTAButtonContainer illustration={illustration}>
                <CTAButton type="submit">Ich bin dabei</CTAButton>
              </CTAButtonContainer>
            </form>
          </FormWrapper>
        );
      }}
    ></Form>
  );
};

const validate = values => {
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

  return errors;
};
