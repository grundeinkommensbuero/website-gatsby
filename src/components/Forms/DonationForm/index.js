import React, {useState} from 'react';
import { Form, Field } from 'react-final-form';
import { validateEmail } from '../../utils';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import { CTAButtonContainer, CTAButton } from '../../Layout/CTAButton';
import FormWrapper from '../FormWrapper';

export default() => {

    return(
        <Form
        onSubmit={e => {}}
        render={({ handleSubmit }) => {
            return (
                <FormWrapper>
                    <form onSubmit={handleSubmit}>
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
                            type="text"
                            component={TextInputWrapped}
                            /> €

                            {/* <Field
                            name="city"
                            label="Ort"
                            placeholder="Stadt / Dorf"
                            type="text"
                            component={TextInputWrapped}
                            /> */}
                        </FormSection>
                    </form>
                </FormWrapper>
            )
        }} 
        ></Form>
    );
};