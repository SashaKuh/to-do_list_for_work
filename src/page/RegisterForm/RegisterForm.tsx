// import React, { act } from 'react';
import { Formik, Form, Field } from 'formik';

const initialValues = {
        email: "",
        password1: "",
        password2: ""
}

const RegisterForm = ({onSubmit}) => {

        const handleSubmit = (value, action) => {
                console.log(value);
                onSubmit()
                action.resetForm()
        }

        return (
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form>
                                <Field name="email" type="email"/>
                                <Field name="password1" type="password"/>
                                <Field name="password2" type="password" />
                                <button type='submit'>SignUp</button>
                        </Form>
                </Formik>
        );
}

export default RegisterForm;
