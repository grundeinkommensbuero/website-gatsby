import React, {useState, useContext} from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';
import AuthContext from '../../../context/Authentication';
import { useUpdateUser } from '../../../hooks/Api/Users/Update';

import s from './style.module.less';

export default() => {

    const [isRecurring, setIsRecurring] = useState(false);
    const [isDonating, setIsDonating] = useState(false);
    const { userId } = useContext(AuthContext);
    const [updateUserState, updateUser] = useUpdateUser();

    // const [donationInfo, setDonationInfo] = useState({ amount: 0, recurring: false, firstname: "", lastname: "", iban: ""})
   
    return(
        <Form
        onSubmit={data => {
            console.log("formData", data);
          const donationUpdate = { userId: userId, donation: {} };
          donationUpdate.donation.amount = data.customAmount ? data.customAmount : data.amount
          donationUpdate.donation.amount = parseInt (donationUpdate.donation.amount)
          donationUpdate.donation.recurring = isRecurring
          donationUpdate.donation.firstname = data.firstname
          donationUpdate.donation.lastname = data.lastname
          donationUpdate.donation.iban = data.iban
        
          
          console.log("Data for API", donationUpdate);
          console.log(updateUser(donationUpdate))
          

          }}
        render={({ handleSubmit }) => {
            return (
                <FormWrapper>
                    <form onSubmit={handleSubmit}>
                        {isDonating === false && (<div className={s.partialForm}>
                            <h3>Unterstütze uns!</h3>
                            <p>Wir finanzieren uns komplett durch Spenden. Bitte hilf uns, die Expedition am Laufen zu halten!</p>
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
                                    </label><br></br>
                                <label>
                                    <Field
                                    name="amount"
                                    component="input"
                                    type="radio"
                                    value="5"
                                    />{' '}
                                                5€
                                    </label><br></br>
                                <label>
                                    <Field
                                    name="amount"
                                    component="input"
                                    type="radio"
                                    value="10"
                                    />{' '}
                                                10€
                                    </label><br></br>

                                <Field
                                    name="customAmount"
                                    label="Eigener Betrag:"
                                    placeholder="100"
                                    type="number"
                                    component={TextInputWrapped}
                                /> €
                            </FormSection>

                            <CTAButtonContainer className={s.buttonContainer}>
                                <CTAButton onClick={() => {
                                    setIsDonating(true);
                                    setIsRecurring(true)
                                    }} size="MEDIUM">
                                    Monatlich unterstützen
                                </CTAButton>
                                <CTAButton onClick={() => {
                                    setIsDonating(true);
                                    setIsRecurring(false)
                                    }} size="MEDIUM">
                                    Einmalig spenden
                                </CTAButton>
                            </CTAButtonContainer>
                        </div>)}


                        {isDonating === true && (<div className={s.partialForm}>
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
                        </div>)}
                        
                    </form>
                </FormWrapper>
            )
        }} 
        ></Form>
    );
};